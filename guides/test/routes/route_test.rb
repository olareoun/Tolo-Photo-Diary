require_relative '../../app'
require_relative '../../../shared/lib/message'
require_relative '../../../shared/lib/mail_service'

require 'rack/test'
require 'rspec'

describe "Guides API" do
  include Rack::Test::Methods

  before do
    @guides_instance ||= GuidesService.new!
    @domain = double("domain")
    @auth_domain = double("auth_domain")
    @guides_instance.domain = @domain
    @guides_instance.auth_domain = @auth_domain
  end

  def app
    @guides_instance
  end

  describe "/" do
    it "returns a response" do
      get '/'
      last_response.body.should include('Guides API')
    end
  end

  describe "/profile" do

    before :each do
      @a_guide = Guides::Guide.new({"email"=>"valid@email.es"})
    end

    it "returns a structured message" do
      post '/profile'

      message = JSON.parse(last_response.body)
      message['header'].should_not be_nil
      message['query'].should_not be_nil
      message['answer'].should_not be_nil
    end

    it "is authorized" do
      post '/profile'

      message = JSON.parse(last_response.body)

      message['answer']['error'].should eql 'zizerones.notauthorized'
    end

    it "should call the guides domain" do
      GuidesService.any_instance.stub(:authorize!)

      @domain.should_receive(:profile).with({'param' => 'value'}).and_return(@a_guide)

      query_sent = '{"param":"value"}'
      message_sent = '{"header":{"username": "s", "session_token": "s"},"query": ' + query_sent + ',"answer":{}}'

      post '/profile', message_sent

      message = JSON.parse(last_response.body)
      expected_answer = '{"email":"valid@email.es"}'
      message['answer'].to_json.should eql expected_answer
    end

  end

  describe "/update" do

    before :each do
      @a_guide = Guides::Guide.new({"email"=>"valid@email.es"})
    end

    it "returns a structured message" do
      @domain.stub(:update).and_return(@a_guide)
      post '/update'

      message = JSON.parse(last_response.body)
      message['header'].should_not be_nil
      message['query'].should_not be_nil
      message['answer'].should_not be_nil
    end

    it "is authorized" do
      @domain.stub(:update).and_return(@a_guide)
      post '/update'

      message = JSON.parse(last_response.body)

      message['answer']['error'].should eql 'zizerones.notauthorized'
    end

    it "should call the guides domain" do
      GuidesService.any_instance.stub(:authorize!)
      @a_guide.identity = 'anID'
      @auth_domain.should_receive(:update).with('anID')
      @domain.should_receive(:update).with({'param' => 'value'}).and_return(@a_guide)

      query_sent = '{"param":"value"}'
      message_sent = '{"header":{},"query": ' + query_sent + ',"answer":{}}'

      post '/update', message_sent

      message = JSON.parse(last_response.body)
      expected_answer = '{"email":"valid@email.es","identity":"anID"}'
      message['answer'].to_json.should eql expected_answer
    end

  end

  describe "/add" do

    before :each do
      @a_guide = Guides::Guide.new({"email"=>"valid@email.es"})
      @a_guide.identity = 'anID'
      @void_message = '{"header":{},"query": {},"answer":{}}'
      @auth_domain.stub(:add)
      @domain.stub(:add).and_return(@a_guide)
    end

    it "returns a structured message" do
      post '/add'

      message = JSON.parse(last_response.body)
      message['header'].should_not be_nil
      message['query'].should_not be_nil
      message['answer'].should_not be_nil
    end

    it "returns the request into the message" do
      query_sent = '{"param":"value"}'
      message_sent = '{"header":{},"query":' + query_sent + ',"answer":{}}'

      post '/add', message_sent

      message = JSON.parse(last_response.body)
      message['query'].to_json.should eql query_sent
    end

    it "should call the guides domain" do
      @domain.should_receive(:add).with({'param' => 'value'}).and_return(@a_guide)

      query_sent = '{"param":"value"}'
      message_sent = '{"header":{},"query": ' + query_sent + ',"answer":{}}'

      post '/add', message_sent
    end

    it "should save the password" do
      @auth_domain.should_receive(:add).with({'username' => 'value', 'password' => 'a_password', "identity"=>"anID"})

      query_sent = '{"email":"value", "password":"a_password"}'
      message_sent = '{"header":{},"query": ' + query_sent + ',"answer":{}}'

      post '/add', message_sent
    end

    it "response is the domain operation result" do
      Shared::MailService.stub(:registration_confirmation)

      post '/add', @void_message

      message = JSON.parse(last_response.body)
      expected_answer = '{"email":"valid@email.es","identity":"anID"}'
      message['answer'].to_json.should eql expected_answer
    end

    it "returns error message when response has error" do
      message_error = 'an_error'
      @domain.stub(:add).and_raise(message_error)
      message_sent = '{"header":{},"query": {},"answer":{}}'
      post '/add', message_sent

      message = JSON.parse(last_response.body)
      expected_answer = '{"error":"an_error"}'
      message['answer'].to_json.should eql expected_answer
    end

    it "sends a confirmation mail" do
      Shared::MailService.should_receive(:registration_confirmation).with(@a_guide.to_hash)

      post '/add', @void_message
    end
  end

end

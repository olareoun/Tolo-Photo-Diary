require_relative '../../web/app'

require 'rack/test'
require 'rspec'

describe "Notes2Reveal Routes" do
  include Rack::Test::Methods

  before do
  	@app ||= Web.new!
  end

  def app
  	@app
  end

  describe "/arrange" do

    it "goes to / when no public url" do
      post "/arrange", "publicUrl" => ""
      last_response.should be_redirect
      follow_redirect!
      last_request.path_info.should == '/'
      last_request.query_string.should == 'alert_signal=empty.url'
    end

    it "goes to / when bad formed public url" do
      post "/arrange", "publicUrl" => "wwww.notevernotedomain.com/pub/xaviuzz/tal"
      last_response.should be_redirect
      follow_redirect!
      last_request.path_info.should == '/'
      last_request.query_string.should == 'alert_signal=no.evernote.url'
    end

    it "goes to / when non existing notebook" do
      post "/arrange", "publicUrl" => "https://sandbox.evernote.com/pub/olareoun/non-existing"
      last_response.should be_redirect
      follow_redirect!
      last_request.path_info.should == '/'
      last_request.query_string.should == 'alert_signal=non.existing.notebook'
    end


  end

  describe "/generate" do

    it "goes to / when no public url" do
      post "/generate", "publicUrl" => ""
      last_response.should be_redirect
      follow_redirect!
      last_request.path_info.should == '/'
      last_request.query_string.should == 'alert_signal=empty.url'
    end

    it "goes to / when bad formed public url" do
      post "/generate", "publicUrl" => "wwww.notevernotedomain.com/pub/xaviuzz/tal"
      last_response.should be_redirect
      follow_redirect!
      last_request.path_info.should == '/'
      last_request.query_string.should == 'alert_signal=no.evernote.url'
    end

  end

end
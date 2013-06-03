require_relative '../../app'
require 'rack/test'
require 'rspec'

describe "Images" do
  include Rack::Test::Methods

  before do
    @app_instance ||= ImagesService.new!
  end

  def app
    @app_instance
  end

  it "uploads a user photo" do
    ImagesService.any_instance.stub(:authorize_rest!)
    Images::Uploader.should_receive(:upload_user_photo).and_return({'id' => "a_id", 'url' => 'a_Url'})

    post '/upload/user'

    response = JSON.parse(last_response.body)

    response['id'].should_not be_nil
    response['url'].should_not be_nil
    response['success'].should eql 'true'
  end

  it "is authorized" do
    post '/upload/user'

    message = JSON.parse(last_response.body)

    message['error'].should eql 'zizerones.notauthorized'
  end

  it "uploads a group photo" do
    ImagesService.any_instance.stub(:authorize_rest!)
    Images::Uploader.should_receive(:upload_group_photo).and_return({'id' => "a_id", 'url' => 'a_Url'})

    post '/upload/group'

    response = JSON.parse(last_response.body)

    response['id'].should_not be_nil
    response['url'].should_not be_nil
    response['success'].should eql 'true'
  end

end

require_relative '../../lib/uploader'

require 'cloudinary'

describe "Uploader" do

    it 'uploads the user photo' do
        Cloudinary::Api.stub(:delete_resources_by_tag)
        Cloudinary::Uploader.should_receive(:upload).with("data:image/png;base64,aW1hZ2Vfc3RyZWFt\n", :tags => ['the_username']).and_return({'public_id' => 'image_id', 'url'=>'image_url' })

        result = Images::Uploader.upload_user_photo(StringIO.new('image_stream'), 'file.png', 'the_username')


        result['id'].should eql 'image_id'
        result['url'].should eql 'image_url'
    end


    it 'remove the previous picture from the user' do
        Cloudinary::Api.stub(:delete_resources_by_tag)
        Cloudinary::Uploader.stub(:upload).and_return({})

        Images::Uploader.upload_user_photo(StringIO.new('image_stream'),'image_stream', 'the_username')
    end

    it 'uploads the group photo' do
        Cloudinary::Uploader.should_receive(:upload).and_return({'public_id' => 'image_id', 'url'=>'image_url' })

        result = Images::Uploader.upload_group_photo(StringIO.new('image_stream'), 'file.png')


        result['id'].should eql 'image_id'
        result['url'].should eql 'image_url'
    end


end
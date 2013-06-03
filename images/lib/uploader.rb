require 'cloudinary'
require "base64"

module Images
  class Uploader

    def self.upload_user_photo(image, filename, username)
      delete_photo_by_tag(username)

      return upload_photo_with_tag(image, filename, username)
    end

    def self.upload_group_photo(image, filename)
      return upload_photo(image, filename)
    end

    private

    def self.get_public_id(url_image)
      url_image.split('/').last.split('.').first
    end

    def self.delete_photo_by_tag(tag)
       Cloudinary::Api.delete_resources_by_tag(tag)
    end

    def self.delete_photo(url)
       public_id = get_public_id(url)
      Cloudinary::Uploader.destroy(public_id)
    end

    def self.upload_photo_with_tag(image, filename, username)
      extension =  filename.split('.').last
      enc_image = "data:image/" + extension + ";base64," + Base64.encode64(image.read)

      tags = [username]
      confirmation = Cloudinary::Uploader.upload(enc_image, :tags => tags)

      {'id' => confirmation['public_id'],
       'url' => confirmation['url']}
    end

    def self.upload_photo(image, filename)
      extension =  filename.split('.').last
      enc_image = "data:image/" + extension + ";base64," + Base64.encode64(image.read)

      confirmation = Cloudinary::Uploader.upload(enc_image, :transformation => 'image_group')
      {'id' => confirmation['public_id'],
       'url' => confirmation['url']}
    end

  end
end

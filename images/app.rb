$LOAD_PATH << 'shared/lib'
$LOAD_PATH << 'images/lib'
require 'sinatra/base'
require 'json'

require 'session_auth'
require 'uploader'

class ImagesService < Sinatra::Base
  register Sinatra::SessionAuth

  configure :development do
    Images::Uploader.instance_eval do
      def upload_user_photo(a,b,c)
        {'id' => 'fakephoto',
         'url' => 'http://placeskull.com/500/700'}
      end

      def upload_group_photo(a,b)
        {'id' => 'fakephoto',
         'url' => 'http://placeskull.com/500/700'}
      end
    end
  end

  post '/upload/user' do
    authorize_rest!(params[:session_token], params[:username])

    username = params[:username]
    filename = params[:qqfile]
    result = Images::Uploader.upload_user_photo(request.body, filename, username)
    result['success'] = 'true'

    return result.to_json
  end


  post '/upload/group' do
    authorize_rest!(params[:session_token], params[:username])

    filename = params[:qqfile]
    result = Images::Uploader.upload_group_photo(request.body, filename)
    result['success'] = 'true'

    return result.to_json
  end

end

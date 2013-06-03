$LOAD_PATH << 'guides/lib'
$LOAD_PATH << 'auth/lib'
$LOAD_PATH << 'shared/lib'
require 'mongo'

require 'guide'
require 'guide_repo'
require 'guide_domain'
require 'controller_base'
require 'password_storage'
require 'mail_service'

class GuidesService < Shared::ControllerBase
  set :root, File.dirname(__FILE__)

  config_file 'config.yml'
  include Auth
  include Guides
  include Shared

  configure do
    DB = Mongo::Connection.new
    GuideRepository.db = DB[settings.dbname]
    PasswordStorage.db = DB[settings.dbname]
  end

  get '/' do
    {:say => "Guides API"}.to_json
  end

  post '/add' do
     begin
      result = domain.add(message_query)
      auth_domain.add({'username' => message_query['email'],
            'password' => message_query['password'], 'identity' => result.identity})
      MailService.registration_confirmation(result.to_hash)
      @response_message.put_map_on_answer(result.data)
     rescue StandardError => error
      set_error(error)
     end
    return @response_message.to_json
  end

  post '/update' do
    authorize!
    guide = domain.update(message_query)
    @response_message.put_map_on_answer(guide.data)
    auth_domain.update(guide.identity)
    return @response_message.to_json
  end

  post '/profile' do
    authorize!

    guide = domain.profile(message_query)
    @response_message.put_map_on_answer(guide.data)
    return @response_message.to_json
  end

  def auth_domain=(custom_object)
    @auth_domain = custom_object
  end

  private

  def auth_domain
    @auth_domain ||= Auth::PasswordStorage.new
  end

  def domain
    @domain ||= GuideDomain.new
  end

end

require 'sinatra/base'
require 'json'

require_relative '../slides/lib/slide'
require_relative '../slides/lib/slides_domain'

class Web < Sinatra::Base
  set :public_folder, './web/public'
  set :static, true

  get '/index.html' do
    erb :index , :layout => :home_layout
  end

  get '/' do
    erb :index , :layout => :home_layout
  end

  post '/generate' do
    @slides = Slides::SlidesDomain.create(JSON.parse(params['json_field']))
    erb :presentation , :layout => :reveal_js
  end

end

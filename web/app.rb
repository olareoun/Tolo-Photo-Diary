require 'sinatra/base'
require 'json'

class Web < Sinatra::Base
  set :public_folder, './web/public'
  set :static, true

  get '/index.html' do
    erb :index , :layout => :home_layout
  end

  get '/' do
    erb :index , :layout => :home_layout
  end

  get '/registration.html' do
    erb :registration , :layout => :home_layout
  end
  
  get '/profile.html' do
    erb :profile , :layout => :home_layout
  end
  
  get '/addgroup.html' do
    erb :addgroup , :layout => :home_layout
  end

  get '/terms.html' do
    erb :terms , :layout => :static_page_layout
  end

  get '/whatisthis.html' do
    erb :whatisthis , :layout => :static_page_layout
  end

  get '/areyouaguide.html' do
    erb :areyouaguide , :layout => :static_page_layout
  end

  get '/howdoesitwork.html' do
    erb :howdoesitwork , :layout => :static_page_layout
  end

  get '/aboutus.html' do
    erb :aboutus , :layout => :static_page_layout
  end


end

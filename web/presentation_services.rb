require 'sinatra/base'
require 'json'

require_relative '../mobile_slides/lib/slides_domain'
require_relative '../presentations/lib/presentations_domain'

class PresentationServices < Sinatra::Base

  set :public_folder, './web/public'
  set :static, true

  domain = Presentations::Domain.new

  before do
     headers 'Access-Control-Allow-Origin' => '*', 
              'Access-Control-Allow-Methods' => ['OPTIONS', 'GET', 'POST']  
  end

  set :protection, false

  options '/generate' do
      200
  end

  post '/generate', :provides => :json do
    json_notes = JSON.parse params["notes"]
    @slides = MobileSlides::SlidesDomain.create(json_notes)
    id = domain.save @slides
    {:id => id}.to_json
  end

  get '/get' do
    @slides = domain.get params["id"]
    erb :presentation , :layout => :mobile_reveal_js
  end

end

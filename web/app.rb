require 'sinatra/base'

require_relative 'notebook_2_reveal_domain'
require_relative 'lib/notifier'
require_relative '../notebooks/lib/bad_argument_exception'
require_relative '../notebooks/lib/bad_public_notebook_url_exception'

class Web < Sinatra::Base
  set :public_folder, './web/public'
  set :static, true

  domain = Notebook2RevealDomain.new

  get '/index.html' do
    erb :index , :layout => :home_layout
  end

  get '/' do
    @message = Notifier.message_for params['alert_signal']
    erb :index , :layout => :home_layout
  end

  post '/arrange' do
    begin
      @publicUrl = params['publicUrl']
      @notes = domain.getNotes(@publicUrl)
      erb :arrange , :layout => :home_layout
    rescue BadArgumentException => e
      redirect '/?alert_signal=' + e.exception_key
    rescue BadPublicNotebookUrlException => e
      redirect '/?alert_signal=' + 'no.evernote.url'
    end
  end

  post '/generate' do
    begin
      sortedIds = getSortedIds(params['sortedIdsStr'])
      @slides = domain.createSlides(params['publicUrl'], sortedIds)
      erb :presentation , :layout => :reveal_js
    rescue BadArgumentException => e
      redirect '/?alert_signal=' + e.exception_key
    rescue BadPublicNotebookUrlException => e
      redirect '/?alert_signal=' + 'no.evernote.url'
    end
  end

  def getSortedIds(sortedIdsStr)
    return sortedIdsStr.split(',') unless sortedIdsStr.nil?
    []
  end

end

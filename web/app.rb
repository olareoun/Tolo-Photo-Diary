require 'sinatra/base'

require_relative 'notebook_2_reveal_domain'
require_relative 'lib/notifier'
require_relative '../evernote/lib/bad_argument_exception'
require_relative '../evernote/lib/bad_public_notebook_url_exception'

class Web < Sinatra::Base
  set :public_folder, './web/public'
  set :static, true

  domain = Notebook2RevealDomain.new

  not_found do
    erb :'404', :layout => :home_layout
  end

  error do
    @error = request.env['sinatra_error'].name
    erb :'500', :layout => home_layout
  end

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
      showError e.exception_key
    rescue BadPublicNotebookUrlException => e
      showError 'no.evernote.url'
    rescue NotebookNotFoundException => e
      showError 'non.existing.notebook'
    end
  end

  post '/generate' do
    begin
      sortedIds = getSortedIds(params['sortedIdsStr'])
      @slides = domain.createSlides(params['publicUrl'], sortedIds)
      erb :presentation , :layout => :reveal_js
    rescue BadArgumentException => e
      showError e.exception_key
    rescue BadPublicNotebookUrlException => e
      showError 'no.evernote.url'
    rescue NotebookNotFoundException => e
      showError 'non.existing.notebook'
    end
  end

  def showError(messageKey)
      @message = Notifier.message_for messageKey
      erb :index , :layout => :home_layout
  end

  def getSortedIds(sortedIdsStr)
    return [] if sortedIdsStr.nil?
    sortedIdsStr.split(',')
  end

end

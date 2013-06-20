require 'sinatra/base'
require 'evernote_oauth'

require_relative '../slides/lib/slide'
require_relative '../slides/lib/slides'
require_relative '../slides/lib/slides_domain'
require_relative '../notebooks/lib/notebooks_domain'
require_relative 'lib/notifier'
require_relative 'lib/bad_argument_exception'

class Web < Sinatra::Base
  set :public_folder, './web/public'
  set :static, true

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
      @notes = getNotes(params['publicUrl'])
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
      notes = getNotes(params['publicUrl'], sortedIds)
      @slides = Slides::SlidesDomain.create(notes)
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

  def getNotes(url, sortedIds = nil)
      if url.nil? || url.empty?
        raise BadArgumentException, 'empty.url'
      else
        notes = Notebooks::NotebooksDomain.get(url, sortedIds).getNotes
      end
      notes
  end

end

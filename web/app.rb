require 'sinatra/base'
require 'json'
require 'evernote_oauth'

require_relative '../slides/lib/slide'
require_relative '../slides/lib/slides'
require_relative '../slides/lib/slides_domain'
require_relative '../notebooks/lib/notebooks_domain'
require_relative 'lib/notifier'
require_relative 'lib/marshaller'
require_relative 'lib/extractor'

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

  post '/generate' do
    begin
      notes = getNotes(params)
      @slides = Slides::SlidesDomain.create(notes)
      erb :presentation , :layout => :reveal_js
    rescue BadArgumentException => e
      redirect '/?alert_signal=' + e.exception_key
    end
  end

  def getNotes(params)
      if params['publicUrl'].empty?
        notes = getJsonNotes(params['json_field'])
      else
        notes = getPublicNotebookNotes(params['publicUrl'])
      end
      notes
  end

  def getJsonNotes(json)
        Marshaller.check(json)
        Marshaller.unmarshall(json);
  end

  def getPublicNotebookNotes(publicUrl)
        username = Extractor.extractUsername(params['publicUrl'])
        notebookname = Extractor.extractNotebookName(params['publicUrl'])
        Notebooks::NotebooksDomain.get(username, notebookname).getNotes
  end

end

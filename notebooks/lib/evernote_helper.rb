require_relative "./evernote_config"
require_relative "./note"

class EvernoteHelper

	def self.getNotebook(url, sortedIds = nil)
	    user_info = getUserInfo(url.user_name, url.host)
	    note_store = getNotestore(user_info, url.host)
	    if sortedIds.nil?
		    getNotebookNotes(user_info, note_store, url.notebook_name)
		else
		    getNotes(note_store, sortedIds)
		end
	end

	private

	  def self.getNotebookNotes(user_info, note_store, notebook_name)
		notes_metadata = getNotesMetadata(user_info, note_store, notebook_name)
		ids = notes_metadata.notes.map(&:guid)
		getNotes(note_store, ids)
	  end

	  def self.getNotes(note_store, ids)
		notes = ids.map do |noteId|
		 Notebooks::Note.new note_store.getNote('', noteId, true, true, false, false)
		end
		notes
	  end

	  def self.getUserInfo(user_name, host)
	    userStoreUrl = host + "/edam/user"
	    userStoreTransport = Thrift::HTTPClientTransport.new(userStoreUrl)
	    userStoreProtocol = Thrift::BinaryProtocol.new(userStoreTransport)
	    userStore = Evernote::EDAM::UserStore::UserStore::Client.new(userStoreProtocol)
	    userStore.getPublicUserInfo(user_name)
	  end

	  def self.getNotestore(user_info, host)
	  	sharedId = user_info.shardId
	    noteStoreTransport = Thrift::HTTPClientTransport.new(host + "/shard/" + sharedId + "/notestore")
	    noteStoreProtocol = Thrift::BinaryProtocol.new(noteStoreTransport)
	    noteStore = Evernote::EDAM::NoteStore::NoteStore::Client.new(noteStoreProtocol)
	    noteStore
	  end

	  def self.getNotesMetadata(user_info, note_store, notebook_name)
	    public_notebook = note_store.getPublicNotebook(user_info.userId, notebook_name)
	    filter = Evernote::EDAM::NoteStore::NoteFilter.new
	    filter.notebookGuid = public_notebook.guid
	    resultSpec = Evernote::EDAM::NoteStore::NotesMetadataResultSpec.new
	    note_store.findNotesMetadata('', filter, 0, 25, resultSpec)
	  end
end

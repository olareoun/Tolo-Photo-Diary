require_relative "./evernote_config"

class EvernoteHelper

	def self.getNotebook(user_name, notebook_name)
	    user_info = getUserInfo(user_name)
	    note_store = getNotestore(user_info)
	    getNotes(user_info, note_store, notebook_name)
	end

	private

	  def self.getNotes(user_info, note_store, notebook_name)
		notes_metadata = getNotesMetadata(user_info, note_store, notebook_name)
		notes = notes_metadata.notes.map do |note|
		 note_store.getNote('', note.guid, true, true, false, false)
		end
		notes
	  end

	  def self.getUserInfo(user_name)
	    userStoreUrl = EVERNOTE_HOST + "/edam/user"
	    userStoreTransport = Thrift::HTTPClientTransport.new(userStoreUrl)
	    userStoreProtocol = Thrift::BinaryProtocol.new(userStoreTransport)
	    userStore = Evernote::EDAM::UserStore::UserStore::Client.new(userStoreProtocol)
	    userStore.getPublicUserInfo(user_name)
	  end

	  def self.getNotestore(user_info)
	  	sharedId = user_info.shardId
	    noteStoreTransport = Thrift::HTTPClientTransport.new(EVERNOTE_HOST + "/shard/" + sharedId + "/notestore")
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

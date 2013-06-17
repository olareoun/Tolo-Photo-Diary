require_relative "./evernote_config"

class EvernoteHelper

	def self.getNotebook(user_name, notebook_name)
	    user_info = user_store.getPublicUserInfo(user_name)
	    note_store = notestore_for_shard_id(user_info.shardId)
	    public_notebook = note_store.getPublicNotebook(user_info.userId, notebook_name)
		notes_metadata = notebook_notes(public_notebook.guid, note_store)
		notes_metadata.notes.collect { |note| note_store.getNote('', note.guid, true, true, false, false) }
	end

	private

	  def self.user_store
	    userStoreUrl = EVERNOTE_HOST + "/edam/user"
	    userStoreTransport = Thrift::HTTPClientTransport.new(userStoreUrl)
	    userStoreProtocol = Thrift::BinaryProtocol.new(userStoreTransport)
	    userStore = Evernote::EDAM::UserStore::UserStore::Client.new(userStoreProtocol)
	    userStore
	  end

	  def self.notestore_for_shard_id(shardId)
	    noteStoreTransport = Thrift::HTTPClientTransport.new(EVERNOTE_HOST + "/shard/" + shardId + "/notestore")
	    noteStoreProtocol = Thrift::BinaryProtocol.new(noteStoreTransport)
	    noteStore = Evernote::EDAM::NoteStore::NoteStore::Client.new(noteStoreProtocol)
	    noteStore
	  end

	  def self.notebook_notes(id, note_store)
	    filter = Evernote::EDAM::NoteStore::NoteFilter.new
	    filter.notebookGuid = id
	    resultSpec = Evernote::EDAM::NoteStore::NotesMetadataResultSpec.new
	    note_store.findNotesMetadata('', filter, 0, 25, resultSpec)
	  end
end

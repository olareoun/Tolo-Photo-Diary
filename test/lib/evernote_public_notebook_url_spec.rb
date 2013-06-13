require 'rspec'
require_relative '../../web/lib/evernote_public_notebook_url'

describe 'Evernote Public Notebook Url' do

	EVERNOTE_PUBLIC_NOTEBOOK_URL = "https://www.evernote.com/pub/xaviuzz/notes2reveal"
	SANDBOX_PUBLIC_NOTEBOOK_URL = "https://sandbox.evernote.com/pub/olareoun/mipublicnotebook"

	it 'extracts user and notebook name from evernote url' do
		EvernotePublicNotebookUrl.match(EVERNOTE_PUBLIC_NOTEBOOK_URL)['username'].should == 'xaviuzz'
		EvernotePublicNotebookUrl.match(EVERNOTE_PUBLIC_NOTEBOOK_URL)['notebookName'].should == 'notes2reveal'
	end

	it 'extracts user and notebook name from sandbox evernote url' do
		EvernotePublicNotebookUrl.match(SANDBOX_PUBLIC_NOTEBOOK_URL)['username'].should == 'olareoun'
		EvernotePublicNotebookUrl.match(SANDBOX_PUBLIC_NOTEBOOK_URL)['notebookName'].should == 'mipublicnotebook'
	end

	it 'does not extract user and notebook name from not valid public notebook url' do
		expect{EvernotePublicNotebookUrl.match("https://sandbox.evernote.com/pub/olareoun/mipublicnotebook/whatever")}.to raise_error(EvernoteUrlException)
	end

	it 'does not extract user and notebook name from not evernote url' do
		expect{EvernotePublicNotebookUrl.match("https://gmail.com/pub/olareoun/mipublicnotebook")}.to raise_error(EvernoteUrlException)
	end
end
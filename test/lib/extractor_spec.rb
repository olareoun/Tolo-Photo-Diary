require 'rspec'
require_relative '../../web/lib/extractor'

describe 'Evernote Public Notebook Url' do

	EVERNOTE_PUBLIC_NOTEBOOK_URL = "https://www.evernote.com/pub/xaviuzz/notes2reveal"
	SANDBOX_PUBLIC_NOTEBOOK_URL = "https://sandbox.evernote.com/pub/olareoun/mipublicnotebook"

	it 'extracts user and notebook name from evernote url' do
		Extractor.extractUsername(EVERNOTE_PUBLIC_NOTEBOOK_URL).should == 'xaviuzz'
		Extractor.extractNotebookName(EVERNOTE_PUBLIC_NOTEBOOK_URL).should == 'notes2reveal'
	end

	it 'extracts user and notebook name from sandbox evernote url' do
		Extractor.extractUsername(SANDBOX_PUBLIC_NOTEBOOK_URL).should == 'olareoun'
		Extractor.extractNotebookName(SANDBOX_PUBLIC_NOTEBOOK_URL).should == 'mipublicnotebook'
	end

	it 'does not extract user and notebook name from not valid public notebook url' do
		expect{Extractor.extractUsername("https://sandbox.evernote.com/pub/olareoun/mipublicnotebook/whatever")}.to raise_error(BadPublicNotebookUrlException)
	end

	it 'does not extract user and notebook name from not evernote url' do
		expect{Extractor.extractUsername("https://gmail.com/pub/olareoun/mipublicnotebook")}.to raise_error(BadPublicNotebookUrlException)
	end
end
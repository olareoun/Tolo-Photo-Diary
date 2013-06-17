require 'rspec'
require 'evernote_oauth'

require_relative '../../lib/notebook'
require_relative '../../lib/notebooks_domain'

describe 'Notebooks Domain' do
	it 'obtains an existent public notebook' do
		notebook = Notebooks::NotebooksDomain.get('olareoun', 'mipublicnotebook')
		notebook.nil?.should be_false
		notebook.name.should == 'mipublicnotebook'
		notebook.notes.length.should == 2
	end
end
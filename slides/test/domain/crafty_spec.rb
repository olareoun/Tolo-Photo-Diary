require 'rspec'
require 'crafty'

include Crafty::HTML::All

describe 'Crafty' do
	it 'creates empty section' do
		section.should =='<section></section>'
	end	
	it 'creates sections' do
		html = section do
			(1..3).each do
				section
			end
		end
		html.should == '<section><section></section><section></section><section></section></section>'
	end

	it 'creates audio' do
		html = section do
			renderAudio
		end
		html.should == '<section><section><audio></audio></section><section><audio></audio></section><section><audio></audio></section></section>'
	end

end

def renderAudio
	(1..3).each do
		section do 
			audio
		end
	end
end

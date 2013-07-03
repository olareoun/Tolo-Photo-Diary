require 'rspec'
require 'crafty'
require 'htmlentities'

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

	it 'escapes chars' do
		decoder = HTMLEntities.new
		text = '<div><a href="www.google.es">www.google.es</a>'
		html = div do
			text
		end
		decoder.decode(html).should == '<div><div><a href="www.google.es">www.google.es</a></div>'
	end

end

def renderAudio
	(1..3).each do
		section do 
			audio
		end
	end
end

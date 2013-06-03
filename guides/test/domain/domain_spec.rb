require 'rspec'

require_relative '../../lib/guide_domain'
require_relative '../../lib/guide'

describe 'Guides Domain' do
  before(:each) do
    @domain = Guides::GuideDomain.new
    @repository = double("repository", :insert => 'a_identity', :is_guide_registered? => false)
    @domain.repository = @repository
  end

  describe 'add' do
    it "returns KO when mandatories are not present" do
      arguments = {'email'=>'anEmail@domain.es'}
      @domain.add(arguments).should_not be_nil
      arguments = {'email'=>''}
      lambda{@domain.add(arguments)}.should raise_error('zizerones.guides.notMandatoriesPresent')
    end

    it "returns KO when email is not valid" do
      arguments = {'email'=>'aNotValidEmail'}
      lambda {@domain.add(arguments)}.should raise_error('emailNotValidFormat')
      arguments = {'email'=>'aNotValidEmail@domain'}
      lambda {@domain.add(arguments)}.should raise_error('emailNotValidFormat')
      arguments = {'email'=>'@domain.es'}
      lambda {@domain.add(arguments)}.should raise_error('emailNotValidFormat')
    end

    it "returns a guide when it has no errors" do
      arguments = {'email' => 'valid@email.es', 'name' =>'anyFullName'}
      result = @domain.add(arguments)
      identity = result.identity

      result.should_not be_nil
      result.should be_an_instance_of Guides::Guide
      identity.should_not be_nil
      identity[:name].should eq 'anyFullName'
      result.email.should eq 'valid@email.es'
      result.name.should eq 'anyFullName'
    end

    it "calls the repository" do
      group = {'email' => 'valid@email.es'}
      repository = double("repo")
      repository.should_receive(:is_guide_registered?).ordered
      repository.should_receive(:insert).with(kind_of(Guides::Guide)).ordered
      @domain.repository = repository

      result = @domain.add(group)
    end

    it "raise exception when email is duplicated" do
      group = {'email' => 'valid@email.es'}
      repository = double("repo")
      repository.should_receive(:is_guide_registered?).with('valid@email.es').and_return true
      @domain.repository = repository
      lambda{@domain.add(group)}.should raise_error('zizerones.guides.emailInUse')

    end

  end

  describe 'update' do

    it 'returns the guide' do
      data = {'identity' => '123',
               'email' => 'valid@email.es',
               'name' => 'John Smith',
               'license_number' => 'abc123',
               'residence' => 'Madrid',
               'work_area' => 'Segovia',
               'experience' => '3',
               'phone' => '123442-22',
               'invalid_field' => 'should_not_appear',
               'languages' => ['spanish','english'],
               'introductions' => {'english' => 'My name is Jorge'}
               }
      guide = Guides::Guide.new(data)
      @repository.should_receive(:update).and_return(guide)
      data['identity'] = {'id'=>'123', 'name'=>'John Smith'}
      result = @domain.update(data)

      result.should_not be_nil
      result.should be_an_instance_of Guides::Guide

      data = result.data
      data[:identity][:id].should eq '123'
      data[:identity][:name].should eq 'John Smith'
      data[:license_number].should eq 'abc123'
      data[:residence].should eq 'Madrid'
      data[:work_area].should eq 'Segovia'
      data[:experience].should eq '3'
      data[:phone].should eq '123442-22'
      data[:invalid_field].should be_nil
      data[:introductions]['english'].should eq 'My name is Jorge'
      data[:introductions]['spanish'].should eq ''
      data[:languages][0].should eq 'spanish'
      data[:languages][1].should eq 'english'
    end

     it 'returns the guide without introductions for language deleted' do

      guide = {'identity' => '123',
               'email' => 'valid@email.es',
               'name' => 'John Smith',
               'license_number' => 'abc123',
               'residence' => 'Madrid',
               'work_area' => 'Segovia',
               'experience' => '3',
               'phone' => '123442-22',
               'invalid_field' => 'should_not_appear',
               'languages' => ['spanish'],
               'introductions' => {'english' => 'My name is Jorge'}
               }
      @repository.should_receive(:update).and_return(Guides::Guide.new(guide))
      guide['identity'] = {'id'=>'123', 'name'=>'John Smith'}
      result = @domain.update(guide)
      result.should_not be_nil
      result.should be_an_instance_of Guides::Guide

      data = result.data
      data[:license_number].should eq 'abc123'
      data[:residence].should eq 'Madrid'
      data[:work_area].should eq 'Segovia'
      data[:experience].should eq '3'
      data[:phone].should eq '123442-22'
      data[:invalid_field].should be_nil
      data[:introductions]['english'].should be_nil
      data[:introductions]['spanish'].should eq ''
      data[:languages][0].should eq 'spanish'
    end

    it 'returns the guide with first empty introduction' do

      guide = {'identity' => '123',
               'email' => 'valid@email.es',
               'name' => 'John Smith',
               'license_number' => 'abc123',
               'residence' => 'Madrid',
               'work_area' => 'Segovia',
               'experience' => '3',
               'phone' => '123442-22',
               'invalid_field' => 'should_not_appear',
               'languages' => ['spanish']
               }

      @repository.should_receive(:update).and_return(Guides::Guide.new(guide))
      guide['identity'] = {'id'=>'123', 'name'=>'John Smith'}
      result = @domain.update(guide)
      result.should_not be_nil
      result.should be_an_instance_of Guides::Guide

      data = result.data
      data[:license_number].should eq 'abc123'
      data[:residence].should eq 'Madrid'
      data[:work_area].should eq 'Segovia'
      data[:experience].should eq '3'
      data[:phone].should eq '123442-22'
      data[:invalid_field].should be_nil
      data[:introductions]['spanish'].should eq ''
      data[:languages][0].should eq 'spanish'
    end

    it 'doesnt update grant property' do
      Guides::Guide.any_instance.should_receive(:remove_system_properties)
      @repository.stub(:update)

      @domain.update({})
    end

    it "removes system properties" do
      guide = Guides::Guide.new({'email' => 'valid@email.es', 'granted' => true})

      guide.remove_system_properties

      guide.to_hash[:granted].should be_nil
    end

  end

  describe 'profile' do
    it 'returns the identity correctly' do
      guide = {'identity' => '123',
               'email' => 'valid@email.es',
               'name' => 'John Smith',
               'license_number' => 'abc123',
               'residence' => 'Madrid',
               'work_area' => 'Segovia',
               'experience' => '3',
               'phone' => '123442-22',
               'invalid_field' => 'should_not_appear',
               'languages' => ['spanish']
               }
      @repository.should_receive(:profile).and_return(Guides::Guide.new(guide))
      guide['identity'] = {'id'=>'123', 'name'=>'John Smith'}
      profile = @domain.profile({'username'=>'any@email.es'})

      profile.identity[:id].should eq '123'
      profile.identity[:name].should eq 'John Smith'
    end
  end

end

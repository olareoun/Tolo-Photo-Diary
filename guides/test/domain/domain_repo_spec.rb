require 'rspec'
require 'mongo'
require 'date'

require_relative '../../lib/guide_repo'

describe "Guide Repository" do

  before :each do
    @db = Mongo::Connection.new.db("zizerones_test")
    Guides::GuideRepository.db = @db
    @collection = @db['guides']
  end

  after(:each) do
    @collection.drop
  end

  it "inserts a new guide" do
    group = Guides::Guide.new({'email' => 'valid@email.es'})
    repository = Guides::GuideRepository.new
    id = repository.insert(group)

    retrieved_group = @collection.find_one({'_id' => BSON::ObjectId(id)})

    @collection.count.should eql 1
    id.should be_kind_of(String)
    retrieved_group['email'].should eql 'valid@email.es'
  end

  it "checks if guide with email is used" do
    group = Guides::Guide.new({'email' => 'valid@email.es'})
    repository = Guides::GuideRepository.new
    id = repository.insert(group)

    repository.is_guide_registered?(group.email).should be_true
  end

  it 'updates all the properties of a guide' do
    guide = Guides::Guide.new({'email' => 'valid@email.es'})
    repository = Guides::GuideRepository.new
    repository.insert(guide)
    guide = repository.profile('valid@email.es')

    guide_updated = Guides::Guide.new({'identity'=>guide.identity,'work_area' => 'Salamanca', 'email' => 'valid@email.es'})

    result = repository.update(guide_updated)

    result.data[:work_area].should eql 'Salamanca'
    result.data[:email].should eql 'valid@email.es'
    result.data[:identity].should eql guide.identity
  end

  it 'returns a void guide if the username is not valid' do
    guide = Guides::Guide.new({'email' => 'valid@email.es'})
    repository = Guides::GuideRepository.new

    guide_updated = Guides::Guide.new({'identity'=>'000000000000000000000000',
                                       'work_area' => 'Salamanca',
                                       'email' => 'valid@email.es'})

    result = repository.update(guide_updated)

    result.identity.should be_nil
  end

  it 'returns the properties of a guide' do
    guide = Guides::Guide.new({'email' => 'valid@email.es', 'work_area' => 'Salamanca'})
    repository = Guides::GuideRepository.new
    repository.insert(guide)

    result = repository.profile('valid@email.es')

    result.data[:email].should eql 'valid@email.es'
    result.data[:work_area].should eql 'Salamanca'
  end

end

require 'mongo'

module Guides
  class GuideRepository

    def self.db=custom_db
      @@db = custom_db
    end

    def insert(a_guide)
      id = guides.insert(a_guide.to_hash).to_s
    end

    def is_guide_registered?(an_email)
      return  guides.find({:email => an_email}).any?
    end

    def update(a_guide)
      doc = a_guide.to_hash.reject{|k,v| v.nil?}
      id = BSON::ObjectId(a_guide.identity)

      guides.update({:_id => id}, doc);

      doc_guide = guides.find_one({:_id => id})

      return Guide.new(doc_guide)
    end

    def profile(email)
      doc_guide = guides.find_one({'email' => email})
      return Guide.new(doc_guide)
    end

    private

    def guides
      @@db['guides']
    end

  end
end

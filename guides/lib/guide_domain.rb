module Guides
  class GuideDomain

    @repository

    def initialize
      @repository = GuideRepository.new
    end

    def add(data)
      new_guide = Guide.new(data)
      new_guide.raise_exception_if_data_not_valid
      raise 'zizerones.guides.emailInUse' if @repository.is_guide_registered?(new_guide.email)
      new_guide.identity = @repository.insert(new_guide)
      new_guide.identity = identity_from(new_guide) unless new_guide.nil?
      return new_guide
    end

    def update(data)
      guide = Guide.new(data)
      guide.remove_system_properties

      guide = @repository.update(guide)

      guide.identity = identity_from(guide) unless guide.nil?
      return guide
    end

    def profile(data)
      email = data['username']
      guide = @repository.profile(email)
      guide.identity = identity_from(guide) unless guide.nil?
      return guide
    end

    def repository=(custom_repo)
      @repository = custom_repo
    end

    private

    def identity_from(guide)
      {:id=>guide.identity.to_s, :name=>guide.name}
    end

  end
end

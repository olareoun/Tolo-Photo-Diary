module Presentations
    class Domain
        def initialize
            @presentations = {}
        end

        def save slides
            id = Time.now.to_i.to_s
            @presentations.merge!({ id => slides})
            id
        end

        def get id
            @presentations[id]
        end
    end
end
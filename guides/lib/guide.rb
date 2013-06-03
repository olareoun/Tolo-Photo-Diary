module Guides
  class Guide

    attr_reader :email, :name
    attr_accessor :identity

    MANDATORY_FIELDS = [:email]

    def initialize data = {}

      return if data.nil?
      @email = data['email']
      @name = data['name']
      @identity = data['identity']
      @identity = data['_id'].to_s unless data['_id'].nil?
      @license_number = data['license_number'] || data['license-number']
      @residence = data['residence']
      @work_area = data['work_area'] || data['work-area']
      @years_experience = data['experience']
      @phone = data['phone']
      @languages = formated_language(data)
      @imageprofile = data['imageprofile']
      @granted = data['granted']
      @introductions = introductions_formated(data)
    end

    def to_hash
      {:email => @email,
       :name => @name,
       :license_number => @license_number,
       :residence => @residence,
       :work_area => @work_area,
       :experience => @years_experience,
       :phone => @phone,
       :languages => @languages,
       :imageprofile => @imageprofile,
       :granted => @granted,
       :introductions => @introductions}
    end

    def data
      data = to_hash
      data[:identity] = @identity
      data
    end

    def mandatories_are_present?
      cleaned_data = data.reject{|k,v| v == '' || v.nil?}

      (cleaned_data.keys & MANDATORY_FIELDS) == MANDATORY_FIELDS
    end

    def raise_exception_if_data_not_valid
      raise 'zizerones.guides.notMandatoriesPresent' unless mandatories_are_present?
      raise 'emailNotValidFormat' unless email_is_valid?
    end

    def is_granted?
      @granted
    end

    def grant
      @granted = true
    end

    def reject
      @granted = false
    end

    def remove_system_properties
      @granted = nil
    end

    private

    def email_is_valid?
      !@email.match(/^.+@.+\..+$/).nil?
    end

    def formated_language(data)
      language = data['languages']
      language = [data['languages']] if(data['languages'].kind_of?(String))
      return language
    end

    def introductions_formated(data)
      languages = formated_language(data)
      introductions = data['introductions']
      return nil if languages.nil?
      introductions = introductions || {}
      languages.each do |language|
          introductions[language] = '' if introductions[language].nil?
      end
      introductions.keep_if {|key, value| languages.include? key }

      return introductions
    end

  end
end

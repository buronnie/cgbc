module Api::V1::ApipieResources
  extend ActiveSupport::Concern

  module ClassMethods
    @@resource_examples = {}

    # Generates a nice example given a status and optional json
    def example_response(status, json=nil)
      str = "#{status} #{Rack::Utils::HTTP_STATUS_CODES[status]}"
      str << "\n#{json.is_a?(String) ? json : ::MultiJson.dump(json, pretty: true)}" if json.present?
      example str
    end

    # Set controller-level, reusable resource example
    def resource_example
      @@resource_examples[controller_name] = yield if block_given?
      @@resource_examples[controller_name]
    end

  end
end

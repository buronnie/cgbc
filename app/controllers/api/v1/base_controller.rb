class Api::V1::BaseController < ActionController::Base

  #### APIPIE
  include ::Api::V1::ApipieResources

  resource_description do
    api_base_url '/api/v1'
    api_version 'v1'
    formats ['json']
  end

  def_param_group :pagination do
    param :page, Integer, desc: "The page number to return. Default is 1."
    param :per_page, Integer, desc: "Number of records to return per page."
  end

  respond_to :json

  # Adds scopes page and per_page
  def self.has_pagination_scopes(options={})
    options.reverse_merge!(only: :index)
    has_scope :page, options.dup.merge(default: 1) do |controller, scope, value|
      scope.ordered.page(value)
    end
    has_scope :per_page, options.dup.merge(default: -> c { c.send(:per_page) }) do |controller, scope, value|
      value.present? ? scope.per(value.to_i) : scope.per(options[:default])
    end
  end

  protected

  def prevent_browser_caching
    response.headers["Last-Modified"] = Time.now.httpdate
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "Fri, 01 Jan 1990 00:00:00 GMT"
    response.headers["Cache-Control"] = "no-cache, no-store, max-age=0, must-revalidate"
  end

  private

  # Terminate early, if nothing changed
  def verify_freshness!
    return
  end

end

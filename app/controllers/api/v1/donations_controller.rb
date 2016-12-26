class Api::V1::DonationsController < Api::V1::BaseController
  resource_description do
    short 'A donation is the amount of money donated to church.'
  end

  resource_example do
    {
      id: 1,
      amount: 100,
      unit: 'US dollar',
      start_date: '1/1/2016',
      end_date: '1/31/2016',
      notes: 'for Jan 2016'
    }
  end

  def_param_group :donation do
    param :donation, Hash, required: true, action_aware: true do
      param :amount, Float, required: true, desc: 'Donation amount'
      param :unit, String, required: true, desc: 'Money unit'
      param :start_date, Date, required: true, desc: 'Donation start date'
      param :end_date, Date, required: true, desc: 'Donation end date'
      param :notes, String, desc: 'Notes for this donation'
    end
  end

  # ---- INDEX ---------

  api :GET, '/donations', 'List all Donations'
  param_group :pagination, Api::V1::BaseController
  example_response 200, { current_page: 1, total_count: 1, total_pages: 1, records: [resource_example]}
  error code: 403

  def index
    @creatives = resource_chain.all
    respond_with @creatives
  end

  # ---- SHOW ---------

  api :GET, '/donations/:id', 'Show a Donation'
  example_response 200, resource_example
  error code: 403

  def show
    respond_with resource
  end

  # ---- CREATE ---------

  api :POST, '/donations', 'Create a Donation'
  param_group :donation
  example_response 201, resource_example
  error code: 403
  error code: 422

  def create
    @donation = resource_chain.create permitted_params
    respond_with @creative, location: [:api, :v1, @donation], status: :created
  end

  # ---- UPDATE ---------

  api :PUT, '/donations/:id', 'Update a Donation'
  param_group :donation
  example_response 200
  error code: 403
  error code: 422

  def update
    binding.pry
    resource.update_attributes permitted_params
    respond_with resource, status: 200
  end

  private

  # @return [ActionController::Parameters]
  def permitted_params
    params.require(:donation).permit(:amount, :unit, :start_date, :end_date, :notes)
  end

  # @return [ActiveRecord::Relation]
  def resource_chain
    Donation
  end

  # @return [Creative]
  def resource
    @donation ||= resource_chain.find params[:id]
  end

end
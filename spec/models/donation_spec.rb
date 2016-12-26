require 'spec_helper'

RSpec.describe Donation, type: :model do

  describe "class" do
    subject { described_class }
    its(:model_name) { is_expected.to eq("Donation") }
  end

  it { is_expected.to validate_presence_of(:amount) }
  it { is_expected.to validate_presence_of(:unit) }
  it { is_expected.to validate_presence_of(:start_date) }
  it { is_expected.to validate_presence_of(:end_date) }
  it { is_expected.to validate_length_of(:notes).is_at_most(1000) }
end

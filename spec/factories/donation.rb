FactoryGirl.define do

  factory :donation, :class => Donation do
    amount  100
    unit    "US Dollar"
    notes   "January 2016 donation to CGBC from Tim's family"
    start_date 2.years.from_now.to_f
    end_date   1.years.from_now.to_f
  end
end

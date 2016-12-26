class Donation < ApplicationRecord
  # ---->Validations
  validates :amount, presence: true
  validates :unit, presence: true
  validates :start_date, presence: true
  validates :end_date, presence: true
  validates :notes, length: { maximum: 1000 }
end

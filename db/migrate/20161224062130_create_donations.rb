class CreateDonations < ActiveRecord::Migration
  def change
    create_table :donations do |t|
      t.integer :amount
      t.string  :unit
      t.string  :notes
      t.timestamps
    end
  end
end

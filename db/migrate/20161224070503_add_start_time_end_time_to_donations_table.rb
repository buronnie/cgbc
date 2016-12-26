class AddStartTimeEndTimeToDonationsTable < ActiveRecord::Migration[5.0]
  def change
    add_column :donations, :start_date, :date
    add_column :donations, :end_date,   :date
  end
end

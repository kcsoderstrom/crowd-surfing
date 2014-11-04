class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.integer :user_id
      t.string :title
      t.string :location
      t.string :time
      t.date :date
      t.text :description

      t.timestamps
    end
  end
end

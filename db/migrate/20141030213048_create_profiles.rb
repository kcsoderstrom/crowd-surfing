class CreateProfiles < ActiveRecord::Migration
  def change
    create_table :profiles do |t|
      t.integer :user_id, index: true, unique: true, null: false
      t.text :about
      t.string :gender
      t.integer :age
      t.string :location
      t.boolean :established, default: false, null: false

      t.timestamps
    end
  end
end

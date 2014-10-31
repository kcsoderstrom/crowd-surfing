class CreateContacts < ActiveRecord::Migration
  def change
    create_table :contacts do |t|
      t.integer :user_id, index: true, null: false
      t.integer :friend_id, index: true, null: false

      t.timestamps
    end
  end
end

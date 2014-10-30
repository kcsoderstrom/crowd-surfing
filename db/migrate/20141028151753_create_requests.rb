class CreateRequests < ActiveRecord::Migration
  def change
    create_table :requests do |t|
      t.integer :sender_id, null: false, index: true
      t.integer :receiver_id, null: false, index: true
      t.boolean :invitation, null: false
      
      t.timestamps
    end
  end
end

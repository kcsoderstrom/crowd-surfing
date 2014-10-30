class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.integer :sender_id, null: false, index: true
      t.integer :receiver_id, null: false, index: true
      t.string :subject
      t.text :body
      
      t.timestamps
    end
  end
end

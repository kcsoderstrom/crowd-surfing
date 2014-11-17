class AddIndices < ActiveRecord::Migration
  def change
    add_index :users, :session_token, unique: true
    add_index :profiles, :user_id, unique: true
    add_index :photos, :profile_id
    add_index :events, :user_id
    add_index :requests, :event_id
    add_index :requests, :sender_id
    add_index :requests, :receiver_id
    add_index :contacts, :user_id
    add_index :contacts, :friend_id
    add_index :messages, :sender_id
    add_index :messages, :receiver_id
  end
end

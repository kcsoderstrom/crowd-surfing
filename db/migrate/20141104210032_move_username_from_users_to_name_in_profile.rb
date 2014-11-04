class MoveUsernameFromUsersToNameInProfile < ActiveRecord::Migration
  def change
    remove_column :users, :username, :string
    add_column :profiles, :name, :string
  end
end

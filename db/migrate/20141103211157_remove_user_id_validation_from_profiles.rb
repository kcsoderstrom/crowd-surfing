class RemoveUserIdValidationFromProfiles < ActiveRecord::Migration
  def up
    remove_column :profiles, :user_id
    add_column :profiles, :user_id, :integer, index: true
  end

  def down
    change_column :profiles, :user_id, :integer, null: false
  end
end

class ChangeUserIdToProfileIdInPhotos < ActiveRecord::Migration
  def up
    remove_column :photos, :user_id, :integer
    add_column :photos, :profile_id, :integer
  end

  def down
    remove_column :photos, :profile_id, :integer
    add_column :photos, :user_id, :integer
  end
end

class AddPrimaryPhotoToProfiles < ActiveRecord::Migration
  def change
    add_column :profiles, :primary_photo_id, :integer
  end
end

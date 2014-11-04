class DropPhotosAndRecreate < ActiveRecord::Migration
  def up
    drop_table :photos
    create_table :photos do |t|
      t.integer :profile_id, index: true
      t.attachment :pic

      t.timestamps
    end
  end

  def down
    drop_table :photos
    create_table :photos do |t|
      t.integer :user_id, null: false, index: true
      t.attachment :pic, null: false
      t.timestamps
    end
  end
end

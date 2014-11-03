class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.integer :user_id, null: false, index: true
      t.attachment :pic, null: false

      t.timestamps
    end
  end
end

class AddEventIdToPhotos < ActiveRecord::Migration
  def change
    add_column :photos, :event_id, :integer
    add_index :photos, :event_id, unique: true
  end
end

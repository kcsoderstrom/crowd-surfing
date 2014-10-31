class AddStatusAndDetailsToRequests < ActiveRecord::Migration
  def change
    add_column :requests, :status, :string, default: "pending"
    add_column :requests, :details, :string
  end
end

class Event < ActiveRecord::Base
  belongs_to :user
  belongs_to :photo
  has_many :requests, dependent: :destroy
end

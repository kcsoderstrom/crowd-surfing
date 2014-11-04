class Profile < ActiveRecord::Base
  belongs_to :user
  has_many :photos

  belongs_to :primary_photo, #that's kinda weird
  class_name: "Photo"
end

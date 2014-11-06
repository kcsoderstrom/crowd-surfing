class Photo < ActiveRecord::Base
  has_attached_file :pic, :styles => {
    :big => "600x600>",
    :small => "50x50#",
    :thumb => "28x28#"
  }, :default_url => "/images/:style_missing.png"

  validates_attachment_content_type(
    :pic,
    :content_type => /\Aimage\/.*\Z/
  )

  belongs_to :profile

end

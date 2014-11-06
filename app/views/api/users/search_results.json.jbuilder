json.array! @users do |user|
  json.name user.profile.name
  json.id user.id
  json.about ( user.profile.about.present? ? user.profile.about : "not given" )
  json.gender ( user.profile.gender.present? ? user.profile.gender : "not given" )
  json.age ( user.profile.age.present? ? user.profile.age : "not given" )
  if user.profile.primary_photo
    json.profile_photo_url user.profile.primary_photo.pic.url(:small)
  else
    json.profile_photo_url image_path("small_missing.png")
  end
end

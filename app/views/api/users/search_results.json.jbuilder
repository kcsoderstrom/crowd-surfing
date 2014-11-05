json.array! @users do |user|
  json.name user.profile.name
  json.id user.id
  if user.profile.primary_photo
    json.profile_photo_url user.profile.primary_photo.pic.url(:small)
  end
end

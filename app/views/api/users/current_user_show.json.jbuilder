json.extract! @user, :id, :email

json.contacts @contacts do |contact|
  json.extract! contact, :name, :id
  if contact.primary_photo_id
    json.thumb_url Photo.find(contact.primary_photo_id).pic.url(:thumb)
  else
    json.thumb_url image_path("thumb_missing.png")
  end
end

json.profile @user.profile

json.photos @user.profile.photos do |photo|
  json.url photo.pic.url(:small)
  json.id photo.id
end

if @user.profile.primary_photo
  json.profile_photo_url @user.profile.primary_photo.pic.url(:big)
  json.thumbnail_url @user.profile.primary_photo.pic.url(:thumb)
  json.small_photo_url @user.profile.primary_photo.pic.url(:small)
else
  json.small_photo_url image_path("small_missing.png")
  json.thumbnail_url image_path("thumb_missing.png")
  json.profile_photo_url image_path("big_missing.png")
end

json.primary_photo_id @user.profile.primary_photo_id
json.established @user.profile.established

json.is_contact true

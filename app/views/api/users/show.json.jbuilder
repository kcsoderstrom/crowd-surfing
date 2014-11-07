json.extract! @user, :id, :email

json.profile @user.profile

json.photos @user.profile.photos do |photo|
  json.url photo.pic.url(:small)
  json.id photo.id
end

if @user.profile.primary_photo
  json.profile_photo_url @user.profile.primary_photo.pic.url(:small)
  json.thumbnail_url @user.profile.primary_photo.pic.url(:thumb)
  json.big_photo_url @user.profile.primary_photo.pic.url(:big)
else
  json.profile_photo_url image_path("small_missing.png")
  json.thumbnail_url image_path("thumb_missing.png")
  json.big_photo_url image_path("big_missing.png")
end

json.is_contact current_user.friends.include?(@user)
json.established @user.profile.established

json.name @user.profile.name

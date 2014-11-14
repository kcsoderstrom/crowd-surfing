json.extract! @user, :id, :email

json.received_messages @user.received_messages do |msg|
  json.extract! msg, :subject, :body, :created_at, :sender_id, :receiver_id
  json.sender msg.sender.profile.name
  json.receiver msg.receiver.profile.name
end

json.sent_messages @user.sent_messages do |msg|
  json.extract! msg, :subject, :body, :created_at, :sender_id, :receiver_id
  json.sender msg.sender.profile.name
  json.receiver msg.receiver.profile.name
end

json.sent_requests @user.sent_requests do |req|
  json.extract! req, :invitation, :status, :created_at, :sender_id, :receiver_id
  json.receiver req.receiver.profile.name
  json.title req.event.title
end

json.received_requests @user.received_requests do |req|
  json.extract! req, :invitation, :status, :created_at, :sender_id, :receiver_id
  json.sender req.sender.profile.name
  json.title req.event.title
end

json.contacts @user.friends.map(&:profile).map{|profile| {name: profile.name, id: profile.user.id}}
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

json.events @user.events

json.primary_photo_id @user.profile.primary_photo_id
json.established @user.profile.established

json.is_contact true

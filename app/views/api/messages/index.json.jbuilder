json.sent_messages @sent_messages do |msg|
  json.extract! msg, :body, :subject, :id, :receiver_name, :receiver_id, :location
  json.created_at time_ago_in_words(msg.created_at)
  json.thumb_url ( msg.photo_id ? Photo.find(msg.photo_id).pic.url(:thumb) : image_path("thumb_missing.png") )
end

json.received_messages @received_messages do |msg|
  json.extract! msg, :body, :subject, :id, :sender_name, :sender_id, :location
  json.created_at time_ago_in_words(msg.created_at)
  json.thumb_url ( msg.photo_id ? Photo.find(msg.photo_id).pic.url(:thumb) : image_path("thumb_missing.png") )
end

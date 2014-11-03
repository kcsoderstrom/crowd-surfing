json.extract! @user, :id, :username

json.received_messages @user.received_messages do |msg|
  json.extract! msg, :subject, :body, :created_at, :sender_id, :receiver_id
  json.sender msg.sender.username
  json.receiver msg.receiver.username
end

json.sent_messages @user.sent_messages do |msg|
  json.extract! msg, :subject, :body, :created_at, :sender_id, :receiver_id
  json.sender msg.sender.username
  json.receiver msg.receiver.username
end

json.sent_requests @user.sent_requests do |req|
  json.extract! req, :invitation, :status, :created_at, :sender_id, :receiver_id
  json.receiver req.receiver.username
end

json.received_requests @user.received_requests do |req|
  json.extract! req, :invitation, :status, :created_at, :sender_id, :receiver_id
  json.sender req.sender.username
end

json.contacts @user.friends
json.profile @user.profile

json.is_contact current_user.friends.include?(@user)

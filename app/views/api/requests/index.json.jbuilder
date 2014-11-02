json.array! current_user.requests do |req|
  json.extract! req, :invitation, :status, :created_at, :sender_id, :receiver_id
  json.sender req.sender.username
  json.receiver req.receiver.username
end

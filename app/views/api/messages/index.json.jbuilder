json.array! @messages do |msg|
  json.extract! msg, :body, :subject, :created_at, :sender_id, :receiver_id, :id
  json.sender msg.sender.username
  json.receiver msg.receiver.username
end

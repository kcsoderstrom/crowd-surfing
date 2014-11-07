json.array! @messages do |msg|
  json.extract! msg, :body, :subject, :created_at, :sender_id, :receiver_id, :id
  json.sender name: msg.sender.profile.name, id: msg.sender.id
  json.receiver name: msg.receiver.profile.name, id: msg.receiver.id
end

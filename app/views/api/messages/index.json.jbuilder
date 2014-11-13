json.array! @messages do |msg|
  json.extract! msg, :body, :subject, :sender_id, :receiver_id, :id
  json.created_at time_ago_in_words(msg.created_at)
  json.sender name: msg.sender.profile.name, id: msg.sender.id
  json.receiver name: msg.receiver.profile.name, id: msg.receiver.id
end

json.sent_messages @sent_messages do |msg|
  json.extract! msg, :body, :subject, :sender_id, :receiver_id, :id, :receiver_name, :receiver_id
  json.created_at time_ago_in_words(msg.created_at)
end

json.received_messages @received_messages do |msg|
  json.extract! msg, :body, :subject, :sender_id, :receiver_id, :id, :receiver_name, :receiver_id
  json.created_at time_ago_in_words(msg.created_at)
end

json.extract! @message, :body, :subject, :created_at, :sender_id, :receiver_id
json.sender @message.sender.username
json.receiver @message.receiver.username
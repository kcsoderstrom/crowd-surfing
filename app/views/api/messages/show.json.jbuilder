json.extract! @message, :body, :subject, :created_at, :sender_id, :receiver_id
json.sender name: @message.sender.profile.name, id: @message.sender.id
json.receiver name: @message.receiver.profile.name, id: @message.receiver.id

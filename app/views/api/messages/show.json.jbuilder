json.extract! @message, :body, :subject, :sender_id, :receiver_id
json.created_at time_ago_in_words(@message.created_at)
json.sender name: @message.sender.profile.name, id: @message.sender.id, location: @message.sender.profile.location
json.receiver name: @message.receiver.profile.name, id: @message.receiver.id, location: @message.receiver.profile.location

#TODO: Customize SQL query so this doesn't ping the database so many times

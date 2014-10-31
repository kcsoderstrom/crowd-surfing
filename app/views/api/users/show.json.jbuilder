json.extract! @user, :id, :username

json.received_messages @user.received_messages
json.sent_messages @user.sent_messages
json.sent_requests @user.sent_requests
json.received_requests @user.received_requests
json.contacts @user.friends
json.profile @user.profile
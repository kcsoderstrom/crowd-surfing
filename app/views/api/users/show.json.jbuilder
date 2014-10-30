json.extract! @user, :id, :username

json.messages @user.messages
json.requests @user.requests
json.profile @user.profile
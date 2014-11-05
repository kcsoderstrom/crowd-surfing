json.array! @users do |user|
  json.name user.profile.name
  json.id user.id
end

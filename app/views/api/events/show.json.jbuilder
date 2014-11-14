is_authored = (@event.user_id == current_user.id)
json.extract! @event, :title, :time, :user_id, :id
json.date @event.date.strftime("%B %d, %Y")
json.is_authored is_authored
unless is_authored
  if @event.requests.map(&:receiver).include?(current_user)
    json.received_invitation true
    invitations = @event.requests.select{ |req| (req.receiver == current_user) && (req.invitation) }

    accepted_invitation = invitations.select{|req| req.status == "accepted"}.count > 0
    json.invitation_senders invitations.map(&:sender).map{|user| {name: user.profile.name, id: user.id}}
  elsif @event.requests.map(&:sender).include?(current_user)
    json.sent_request true
    requests = @event.requests.select{ |req| (req.sender == current_user) && (!req.invitation) }

    approved_request = requests.select{|req| req.status == "accepted"}.count > 0
    json.request_receivers requests.map(&:receiver).map{|user| {name: user.profile.name, id: user.id}}
  end
  # I thought this wouldn't work?
end

json.is_attending (is_authored || accepted_invitation || approved_request)
json.invitation_receivers @event.requests.select{ |req| (req.sender == current_user) && (req.invitation) }.map(&:receiver).map{|user| {name: user.profile.name, id: user.id}}
json.description @event.description
json.location @event.location
json.author_name @event.user.profile.name
json.author_id @event.user.id



json.attendees @event.requests.select{ |req| req.status == "accepted" }.map{ |req| req.invitation ? req.receiver : req.sender }.push(@event.user).map{|user| { photo_url: user.profile.primary_photo ? user.profile.primary_photo.pic.url(:small) : image_path("small_missing.png"), name: user.profile.name, id: user.id }}

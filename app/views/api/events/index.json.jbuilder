json.array! @events do |event|
  is_authored = (event.user_id == current_user.id)
  json.extract! event, :title, :time, :date, :user_id, :id
  json.is_authored is_authored
  unless is_authored
    if event.requests.map(&:receiver).include?(current_user)
      json.received_invitation true
      json.invitation_senders event.requests.select{ |req| (req.receiver == current_user) && (req.invitation) }.map(&:sender).map{|user| {name: user.profile.name, id: user.id}}
    elsif event.requests.map(&:sender).include?(current_user)
      json.sent_request true
      json.request_receivers event.requests.select{ |req| (req.sender == current_user) && (!req.invitation) }.map(&:receiver).map{|user| {name: user.profile.name, id: user.id}}
    end
    # I thought this wouldn't work?
  end

  json.invitation_receivers event.requests.select{ |req| (req.sender == current_user) && (req.invitation) }.map(&:receiver).map{|user| {name: user.profile.name, id: user.id}}
end

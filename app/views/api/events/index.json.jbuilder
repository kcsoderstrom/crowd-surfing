json.array! @events do |event|
  is_authored = (event.user_id == current_user.id)
  json.extract! event, :title, :time, :location, :user_id, :id
  json.date event.date.strftime("%B %d, %Y")
  json.is_authored is_authored
  unless is_authored
    if @received_invitations.map(&:event_id).include?(event.id)
      json.received_invitation true
      invitations = @received_invitations.select{ |req| (req.event_id == event.id) }
      accepted_invitation = invitations.any?{ |req| req.status == "accepted" }
      json.invitation_senders invitations.map{ |req| {name: req.sender_name, id: req.sender_id} }
    end

    if @sent_requests.map(&:event_id).include?(event.id)
      json.sent_request true
      requests = @sent_requests.select{ |req| (req.event_id == event.id)}

      approved_request = @sent_requests.any?{ |req| req.status == "accepted" }
      json.request_receivers @sent_requests.map{ |req| {name: req.receiver_name, id: req.receiver_id} }
    end
  end

  json.is_attending (is_authored || accepted_invitation || approved_request)
  json.invitation_receivers @sent_invitations.map{|req| {name: req.receiver_name, id: req.receiver_id}}
  
end

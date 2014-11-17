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
    # if event.requests.map(&:receiver).include?(current_user)
      # json.received_invitation true
      # invitations = event.requests.select{ |req| (req.receiver == current_user) && (req.invitation) }

      # accepted_invitation = invitations.select{|req| req.status == "accepted"}.count > 0
      # json.invitation_senders invitations.map(&:sender).map{|user| {name: user.profile.name, id: user.id}}

    elsif @sent_requests.map(&:event_id).include?(event.id)
      json.sent_request true
      requests = @sent_requests.select{ |req| (req.event_id == event.id)}

      approved_request = @sent_requests.any?{ |req| req.status == "accepted" }
      json.request_receivers = @sent_requests.map{ |req| {name: req.receiver_name, id: req.receiver_id} }
    # elsif event.requests.map(&:sender).include?(current_user)
      # json.sent_request true
      # requests = event.requests.select{ |req| (req.sender == current_user) && (!req.invitation) }

      # approved_request = requests.select{|req| req.status == "accepted"}.count > 0
      # json.request_receivers requests.map(&:receiver).map{|user| {name: user.profile.name, id: user.id}}
    end
  end

  json.is_attending (is_authored || accepted_invitation || approved_request)
  json.invitation_receivers @sent_invitations.map{|req| {name: req.receiver_name, id: req.receiver_id}}
end

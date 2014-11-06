json.array! @events do |event|
  is_authored = (event.user_id == current_user.id)
  json.extract! event, :title, :time, :date, :user_id, :id
  json.is_authored is_authored
  unless is_authored
    if event.requests.map(&:receiver).include?(current_user)
      json.received_invitation true
    elsif event.requests.map(&:sender).include?(current_user)
      json.sent_request true
    end
    # THIS DOESN'T WORK
  end
end

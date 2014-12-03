json.array! @events do |event|
  json.extract! event, :title, :time, :location, :description

  json.date event.date.strftime("%B %d, %Y")

  if event.photo_id
    json.photo_url event.photo.pic.url(:small)
  else
    json.photo_url image_path("small_missing.png")
  end
end

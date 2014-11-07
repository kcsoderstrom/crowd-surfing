module Api
  class EventsController < ApplicationController

    def create
      @event = current_user.events.new(event_params)
      if @event.save
        render json: @event
      else
        render json: @event.errors.full_messages
      end
    end

    def update

    end

    def show
      @event = Event.find(params[:id])
      if @event
        render json: @event
      else
        render json: "Gosh no it's just not there"
      end
    end

    def destroy

    end

    def search

      match = params[:match] && params[:match].length > 0 ? params[:match] : nil

      if params[:filter_by]
        location = filter_params[:location]
        date_lower = Date.parse(filter_params[:date_lower]) if filter_params[:date_lower].present?
        date_upper = Date.parse(filter_params[:date_upper]) if filter_params[:date_upper].present?
        keywords = filter_params[:event_keyword] ? filter_params[:event_keyword] : nil
      end

      @events = Event.all
      @events = @events.where("location ~ ?", location) if location
      @events = @events.where("title ~* ?", match) if match
      @events = @events.where("date < ?", date_upper + 1) if date_upper
      @events = @events.where("date > ?", date_lower - 1) if date_lower
      @events = @events.where("description ~* ?", keywords) if keywords

      if params[:sort_by]
        if params[:sort_by] == "alphabetical"
          @events = @events.order(:title)
        elsif params[:sort_by] == "date"
          @events = @events.order(:date)
        elsif parmas[:sort_by] == "proximity"
          # write something
        end
      end


      @events = @events.limit(10) if params[:page]
      @events = @events.offset(Integer(params[:page])*10) if params[:page]

      render :search_results

    end

    def index
      #TODO: IS THIS RIGHT AT ALL!?!?!?!?!???
      # ok so I want to get all of the events that the user has made
      where_string = "("
      where_string += "(requests.sender_id = ?)"
      where_string += "AND ()"
      where_string += "AND ()"

      current_user_id = current_user.id

      Event.where()

      @events = Event.includes(requests: [{sender: :profile}, {receiver: :profile}, :invitation]).find_by_sql(<<-SQL
        SELECT events.*
        FROM events
        LEFT OUTER JOIN requests AS sent_requests
        ON sent_requests.event_id = events.id
        LEFT OUTER JOIN requests AS received_invitations
        ON received_invitations.event_id = events.id
        WHERE ((
            sent_requests.sender_id = #{current_user_id}
          AND
            sent_requests.invitation = FALSE
          AND
            sent_requests.status != 'rejected'
        ) OR (
            received_invitations.receiver_id = #{current_user_id}
          AND
            received_invitations.invitation = TRUE
          AND
            received_invitations.status != 'rejected'
        ) OR (
          events.user_id = #{current_user_id}
        ))
        ORDER BY
          events.date
      SQL
      )

      puts "HERE ARE THE EVENTS OK"
      p @events

      render :index

      # and all of the people they've invited
      # and I want all the ones they've requested invitations to
      # that haven't been declined
    end

    private
    def event_params
      params.require(:event).permit(:title, :location, :time, :date, :description)
    end

    def filter_params
      params.require(:filter_by).permit(:location, :date_lower, :date_upper, :event_keyword)
    end

  end
end

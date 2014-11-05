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
        date_lower = Integer(filter_params[:date_lower]) if filter_params[:date_lower] && filter_params[:date_lower].length > 0
        date_upper = Integer(filter_params[:date_upper]) if filter_params[:date_upper] && filter_params[:date_upper].length > 0
        keywords = filter_params[:keyword] ? filter_params[:keyword].split(//) : nil
      end

      @events = Event.all
      @events = @events.where("location ~ ?", location) if location
      @events = @events.where("title ~* ?", match) if match
      @events = @events.where("date < ?", date_upper + 1) if date_upper
      @events = @events.where("date > ?", date_lower - 1) if date_lower

      if params[:sort_by]
        if params[:sort_by] == "last-login"
          @users = @users.order(:updated_at)
        end
      end


      @events = @events.limit(10) if params[:page]
      @events = @events.offset(Integer(params[:page])*10) if params[:page]

      render :search_results

    end

    private
    def event_params
      params.require(:event).permit(:title, :location, :time, :date, :description)
    end

    def filter_params
      params.require(:filter_by).permit(:location, :date_lower, :date_upper)
    end

  end
end

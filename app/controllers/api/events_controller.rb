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

    def index

    end

    def destroy

    end

    private
    def event_params
      params.require(:event).permit(:title, :location, :time, :date, :description)
    end

  end
end

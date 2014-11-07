module Api
  class RequestsController < ApplicationController

    def index
      if(current_user)
        render :index
        #render json: current_user.requests
      else
        render json: "Sign in ok"
      end
    end

    def create
      @request = Request.new(request_params)

      # I don't want to create it if there is already a request with the same
      # sender_id, receiver_id, and event_id

      duplicates = Request.where(sender_id: @request.sender_id)
                          .where(receiver_id: @request.receiver_id)
                          .where(event_id: @request.event_id)

      if duplicates.length > 0
        render json: @request, status: :unprocessable_entity
        return
      end

      if @request.save
        render json: @request
      else
        puts @request.errors.full_messages
        render json: @request.errors.full_messages
      end
    end

    def show
      @request = Request.find(params[:id])
      if @request.sender == current_user || @request.receiver == current_user
        render json: @request
      else
        render json: "Sign in you jerk"
      end
    end

    def update

    end

    def destroy

    end

    private
    def request_params
      { event_id: params[:event_id],
        sender_id: current_user.id,
        receiver_id: params[:receiver_id],
        details: params[:details],
        status: params[:status].present? ? params[:status] : "pending",
        invitation: params[:invitation] }
    end

  end
end

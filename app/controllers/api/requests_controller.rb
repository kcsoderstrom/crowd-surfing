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

      @request.invitation = false
      puts @request
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
      { sender_id: current_user.id,
        receiver_id: User.find_by_username(params[:receiver]).id,
        details: params[:details],
        status: params[:status],
        invitation: params[:invitation] }
    end

  end
end
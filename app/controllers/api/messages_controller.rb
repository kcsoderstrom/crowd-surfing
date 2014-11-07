module Api
  class MessagesController < ApplicationController

    def index
      if current_user
        @messages = current_user.messages
        render :index
      else
        render json: "Sign in ok"
      end
    end

    def create
      @message = Message.new(message_params)
      if @message.save
        render json: @message
      else
        render json: @message.errors.full_messages
      end
    end

    def show
      @message = Message.includes(:sender, :receiver).find(params[:id])
      if @message.sender == current_user || @message.receiver == current_user
        render :show
      else
        render json: "Sign in you jerk"
      end
    end

    private
    def message_params
      { sender_id: current_user ? current_user.id : 1,
        receiver_id: params[:receiver_id],
        body: params[:body],
        subject: params[:subject] }
    end

  end

end

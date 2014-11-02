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
      @message = Message.find(params[:id]).includes(:sender, :receiver)
      if @message.sender == current_user || @message.receiver == current_user
        render :show
      else
        render json: "Sign in you jerk"
      end
    end

    private
    def message_params
      { sender_id: current_user ? current_user.id : 1,
        receiver_id: User.find_by_username(params[:receiver]).id,
        body: params[:body],
        subject: params[:subject] }
    end

  end

end
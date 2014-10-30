class MessagesController < ApplicationController
  
  def index
  end
  
  def new
    @message = Message.new()
  end
  
  def create

    if(current_user)
    message_params = { sender_id: current_user.id,
                         receiver_id: params[:receiver_id],
                         body: params[:body],
                        subject: params[:subject] }
    else
    message_params = { sender_id: 1,
                        receiver_id: params[:receiver_id],
                        body: params[:body],
                        subject: params[:subject]}
   
    end
   
    @message = Message.new(message_params)
    if @message.save
      if current_user
        redirect_to messages_url
      else
        redirect_to new_session_url
      end
    else
      flash.now[:errors] = @message.errors.full_messages
      render :new
    end
  end
  
  def show
    @message = Message.find(params[:id])
    render :show
  end
  
end

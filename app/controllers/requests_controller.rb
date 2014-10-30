class RequestsController < ApplicationController
  
  def index
    if(current_user)
      render :index
    else
      redirect_to new_session_url
    end
  end
  
  def new
    @request = Request.new(receiver_id: params[:user_id])
    puts "receiver id: " + @request.receiver_id.to_s
  end
  
  def create
    puts "params: " + params.to_s
    request_params = { sender_id: current_user.id,
                       receiver_id: params[:receiver_id],
                       invitation: params[:invitation] }
    @request = Request.new(request_params)
    
    puts @request
    if @request.save
      redirect_to requests_url
    else
      flash.now[:errors] = @request.errors.full_messages
      puts flash.now[:errors]
      redirect_to user_url(User.find(request_params[:receiver_id]))
    end
  end
  
  def edit
    
  end
  
  def update
    
  end
  
  def destroy
    
  end
  
end

class SessionsController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.find_by_username(user_params[:username])
    if @user && @user.is_password?(user_params[:password])
      login_user!(@user)
      redirect_to root_url
    else
      @user = User.new
      @user.username = user_params[:username]
      render json: @user.errors.full_messages,
             status: :unprocessable_entity
    end
  end

  def destroy
    logout!
    redirect_to root_url
  end

  private
  def user_params
    params.require(:user).permit(:username, :password)
  end
end

class SessionsController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.find_by_email(user_params[:email])
    if @user && @user.is_password?(user_params[:password])
      login_user!(@user)
      redirect_to root_url
    else
      render json: @user,
             status: :unprocessable_entity
    end
  end

  def destroy
    logout!
    redirect_to root_url
  end

  private
  def user_params
    params.require(:user).permit(:email, :password)
  end
end

class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    @user.profile = Profile.new(user: @user)

    if @user.save
      login_user!(@user)
      redirect_to user_url(@user)
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def update
    @user = current_user

    if @user.update(profile: params.require(:user)[:profile])
      redirect_to user_url(@user)
    else
      flash.now[:errors] = @user.errors.full_messages
      render :edit
    end
  end

  def show
    @user = User.find(params[:id])
    render :show
  end

  def edit
    @user = current_user
    render :edit
  end

  def index
    if(params[:match])
      @users = User.where("username ~ ?", params[:match])
    end
    render :search
  end

  private
  def user_params
    params.require(:user).permit(:username, :password)
  end

end

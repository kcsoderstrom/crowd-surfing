class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create
    some_params = user_params
    if some_params.present? && some_params[:location].present?
      given_coords = some_params[:location]
      location = Geocoder.search(given_coords)[0].data["address_components"][3]["long_name"]
      some_params = some_params.except(:location)
    end

    @user = User.new(some_params)

    if @user.save
      @user.build_profile(name: params[:user][:name])
      @user.profile.update({location: location}) if location
      login_user!(@user)
      redirect_to root_url
    else
      render json: @user.errors.full_messages
    end
  end

  def update
    @user = current_user

    if @user.update(profile: params.require(:user)[:profile])
      redirect_to root_url
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
    params.require(:user).permit(:email, :password, :location)
  end

end

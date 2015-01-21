class SessionsController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.find_by_email(user_params[:email])
    if @user && @user.is_password?(user_params[:password])

      some_params = user_params
      if some_params.present? && some_params[:location].present? && @user.profile.location.blank?
        given_coords = some_params[:location]
        location = Geocoder.search(given_coords)[0].data["address_components"][3]["long_name"]
        @user.profile.update({location: location})
      end

      login_user!(@user)
      redirect_to root_url
    else
      redirect_to "#/sad_face"
    end
  end

  def destroy
    logout!
    redirect_to root_url
  end

  private
  def user_params
    params.require(:user).permit(:email, :password, :location)
  end
end

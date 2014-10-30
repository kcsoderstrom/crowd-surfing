module Api
  class UsersController < ApplicationController

    def json_current_user
      render json: current_user, include: :messages
    end

    def index
      render json: { users: User.all, current_user: current_user }
    end

    def show
      @user = User.find(params[:id])
      render :show
    end

    def update
      @user = current_user
      if @user.profile.update(profile_params)
        render :show
      else
        render json: @user.errors.full_messages,
               status: :unprocessable_entity
      end
    end

    def search
      if(params[:match])
        @users = User.where("username ~ ?", params[:match])
        render json: @users
      else
        render json: "gosh maybe you should type something"
      end
    end

    def create
      @user = User.new(user_params)
      if @user.save
        login_user!(@user)
        render :show
      else
        render json: @user.errors.full_messages,
               status: :unprocessable_entity
      end
    end

    private
    def user_params
      params.require(:user).permit(:username, :password)
    end

    def profile_params
      params.require(:user).require(:profile).permit(:about, :gender, :age)
    end

  end
end
module Api
  class UsersController < ApplicationController

    def index
      render json: User.all.includes(:sent_messages, :received_messages, :sent_requests, :received_requests)
    end

    def show
      @user = User.includes(sent_messages: [:sender, :receiver],
                            received_messages: [:sender, :receiver],
                            sent_requests: [:sender, :receiver],
                            received_requests: [:sender, :receiver])
                  .find(params[:id])
                  p current_user
                  p current_user.friends
                  p current_user.friends.include?(@user)
      render :show
      #TODO: fix this so that it only shows the info that's ok to show
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

      match = params[:match] && params[:match].length > 0 ? params[:match] : nil

      if params[:filter_by]
        gender = filter_params[:gender]
        age_lower = filter_params[:age_lower].length > 0 ? Integer(filter_params[:age_lower]) : nil
        age_upper = filter_params[:age_upper].length > 0 ? Integer(filter_params[:age_upper]) : nil
        keywords = filter_params[:keyword] ? filter_params[:keyword].split(//) : nil
      end

      @users = User.all

      @users = current_user.friends if params[:contacts_only]

      @users = @users.where("username ~* ?", match) if match

      @users = @users.joins(:profile)
                     .where("profiles.gender = ?", gender) if gender
      @users = @users.joins(:profile)
                     .where("profiles.age > ?", age_lower - 1) if age_lower
      @users = @users.joins(:profile)
                     .where("profiles.age < ? ", age_upper + 1) if age_upper

      if params[:sort_by]
        if params[:sort_by] == "last-login"
          @users = @users.order(:updated_at)
        end
      end

      render json: @users

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
      params.require(:user).require(:profile).permit(:about, :gender, :age, :location)
    end

    def filter_params
      params.require(:filter_by).permit(:match, :age_upper, :age_lower, :gender, :keyword)
    end

  end
end
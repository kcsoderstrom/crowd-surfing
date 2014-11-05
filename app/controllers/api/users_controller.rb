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
      if @user == current_user
        render :current_user_show
      else
        render :show
      end
    end

    def update
      @user = current_user

      profile_updated = @user.profile.update(profile_params)
      photo_created = @user.profile.photos.create(photo_params)

      if profile_updated && photo_created
        render :show
      else
        render json: @user.errors.full_messages,
               status: :unprocessable_entity

               #TODO: customize errors
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

      @users = User.includes(:profile).all

      @users = current_user.friends if params[:contacts_only]

      @users = @users.joins(:profile)
                     .where("name ~* ?", match) if match

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


      @users = @users.limit(10) if params[:page]
      @users = @users.offset(Integer(params[:page])*10) if params[:page]


      render :search_results

    end

    private
    def user_params
      params.require(:user).permit(:email, :password)
    end

    def profile_params
      params.require(:user).require(:profile).permit(:about, :gender, :age, :location, :primary_photo_id)
    end

    def filter_params
      params.require(:filter_by).permit(:match, :age_upper, :age_lower, :gender, :keyword, :name)
    end

    def photo_params
      params.permit(:pic)
    end

  end
end

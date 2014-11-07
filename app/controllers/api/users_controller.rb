module Api
  class UsersController < ApplicationController

    def index
      render json: User.all.includes(:sent_messages, :received_messages, :sent_requests, :received_requests)
    end

    def show
      @user = User.includes(:events,
                            sent_messages: [:sender, :receiver],
                            received_messages: [:sender, :receiver],
                            sent_requests: [:sender, :receiver],
                            received_requests: [:sender, :receiver])
                  .find(params[:id])

      if @user.id == current_user.id

        render :current_user_show
      else
        render :show
      end
    end

    def update
      @user = current_user

      if params[:delete_contact]
        contact = @user.contacts.where(friend_id: params[:contact_user_id]).first
        if contact && Contact.destroy(contact.id)
          render json: @user
        else
          render json: contact.errors.full_messages, status: :unprocessable_entity
        end

        return
      end

      if new_photo_params && new_photo_params[:pic].present?
        photo_created = @user.profile.photos.create(new_photo_params)
        photo_ok = photo_created
      else
        photo_ok = true
      end

      profile_updated = @user.profile.update(profile_params)

      if profile_updated && photo_ok
        puts "HERE IS THE ID OF THE PRIMARY PHOTO!!SDAJKASDFKLJASDFLJASGLJKSDFALKJASLKAFSDLJASFDLKJASFLSDFALJASDFLJKASFDLJASDFLJKADSF"
        p @user.profile.primary_photo_id
        @user.profile.primary_photo = @user.profile.photos.last if photo_created
        render :show
      else
        render json: @user.errors.full_messages,
               status: :unprocessable_entity

               #TODO: customize errors
      end
    end

    def search

      match = params[:match].present? ? params[:match] : nil
      exclusions = params[:exclude].present? ? params[:exclude] : nil

      p exclusions

      if params[:filter_by]
        gender = filter_params[:gender]
        age_lower = filter_params[:age_lower].present? ? Integer(filter_params[:age_lower]) : nil
        age_upper = filter_params[:age_upper].present? ? Integer(filter_params[:age_upper]) : nil
        keywords = filter_params[:user_keyword].present? ? filter_params[:user_keyword] : nil
        established = filter_params[:established]
      end

      @users = User.includes(:profile).all

      @users = current_user.friends if params[:contacts_only]

      @users = @users.joins(:profile)
                     .where("name ~* ?", match) if match
      @users = @users.where("users.id NOT IN (?)", exclusions) if exclusions

      @users = @users.joins(:profile)
                     .where("profiles.gender = ?", gender) if gender
      @users = @users.joins(:profile)
                     .where("profiles.age > ?", age_lower - 1) if age_lower
      @users = @users.joins(:profile)
                     .where("profiles.age < ? ", age_upper + 1) if age_upper
      @users = @users.joins(:profile)
                     .where("profiles.about ~* ?", keywords) if keywords
      @users = @users.joins(:profile)
                     .where("profiles.established = ?", established) unless established.nil?

      if params[:sort_by]
        if params[:sort_by] == "last-login"
          @users = @users.order(:last_login)
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
      params.require(:user).require(:profile).permit(:about, :gender, :age, :location, :primary_photo_id, :name, :established)
    end

    def filter_params
      params.require(:filter_by).permit(:match, :age_upper, :age_lower, :gender, :user_keyword, :name, :established)
    end

    def new_photo_params
      params.permit(:pic)
    end

  end
end

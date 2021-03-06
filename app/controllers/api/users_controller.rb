module Api
  class UsersController < ApplicationController

    def index
      # @users = User.all.limit(10)
      # render :index
    end

    def show
      @user = User.find(params[:id])
      current_user_id = current_user.id

      if @user.id == current_user_id

        @contacts = User.find_by_sql(<<-SQL
          SELECT
            profiles.name AS name, friends.friend_id AS id, profiles.primary_photo_id AS primary_photo_id, users.session_token
          FROM (
            SELECT
              friend_id
            FROM
              contacts
            WHERE
              contacts.user_id = #{current_user_id}
            ) AS friends
          JOIN
            users
          ON
            friends.friend_id = users.id
          JOIN
            profiles
          ON
            users.id = profiles.user_id
        SQL
        )

        puts @contacts.first
        puts @contacts.first.name
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
          render json: :current_user_show
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
        if photo_created
          @user.profile.update(primary_photo: @user.profile.photos.last)
        end
        render :current_user_show
      else
        render json: @user.errors.full_messages,
               status: :unprocessable_entity

               #TODO: customize errors
      end
    end

    def search

      match = params[:user_match].present? ? params[:user_match] : nil
      exclusions = params[:exclude].present? ? params[:exclude].select{|int| int.present? } : nil

      if params[:filter_by]
        gender = filter_params[:gender]
        age_lower = filter_params[:age_lower].present? ? Integer(filter_params[:age_lower]) : nil
        age_upper = filter_params[:age_upper].present? ? Integer(filter_params[:age_upper]) : nil
        keywords = filter_params[:user_keyword].present? ? filter_params[:user_keyword] : nil
        established = filter_params[:established]
        location = filter_params[:user_location]
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
      @users = @users.joins(:profile)
                     .where("profiles.location ~* ?", location) if location.present?

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
      params.require(:filter_by).permit(:user_location, :user_match, :age_upper, :age_lower, :gender, :user_keyword, :name, :established)
    end

    def new_photo_params
      params.permit(:pic)
    end

  end
end

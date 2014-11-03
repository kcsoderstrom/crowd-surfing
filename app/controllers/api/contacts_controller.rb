module Api
  class ContactsController < ApplicationController
    def create
      @contact = Contact.new({user_id: current_user.id, friend_id: params[:contact][:friend_id]})
      if @contact.save
        render json: @contact
      else
        render json: "that didn't work", status: :unprocessable_entity
      end
    end
  end
end
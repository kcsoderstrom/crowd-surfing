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

    def destroy

      puts "HEY WE GOT HERE OK &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&"
      @contact = Contact.where("user_id = ?", current_user.id)
                        .where("friend_id = ?", params[:contact_user_id])
                        .first

      if @contact && @contact.destroy
        render json: "It was destroyed."
      else
        render json: @contact.errors.full_messages,
                     status: :unprocessable_entity
      end
    end
  end
end

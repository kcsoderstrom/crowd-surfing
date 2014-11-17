module Api
  class MessagesController < ApplicationController

    def index
      if current_user
        current_user_id = current_user.id

        @received_messages = Message.find_by_sql(<<-SQL
          SELECT received_messages.*, profiles.name AS sender_name, profiles.id AS sender_id
          FROM (
            SELECT * FROM messages
            WHERE receiver_id=#{current_user_id}
          ) AS received_messages
          JOIN users
          ON users.id=received_messages.sender_id
          JOIN profiles
          ON users.id=profiles.user_id
        SQL
        )

        @sent_messages = Message.find_by_sql(<<-SQL
          SELECT sent_messages.*, profiles.name AS receiver_name, profiles.id AS receiver_id
          FROM (
            SELECT * FROM messages
            WHERE sender_id=#{current_user_id}
          ) AS sent_messages
          JOIN users
          ON users.id=sent_messages.receiver_id
          JOIN profiles
          ON users.id=profiles.user_id
        SQL
        )

        render :index
      else
        render json: "Sign in ok"
      end
    end

    def create
      @message = Message.new(message_params)
      if @message.save
        render json: @message
      else
        render json: @message.errors.full_messages
      end
    end

    def show
      @message = Message.includes(:sender, :receiver).find(params[:id])
      if @message.sender == current_user || @message.receiver == current_user
        render :show
      else
        render json: "Sign in you jerk"
      end
    end

    private
    def message_params
      { sender_id: current_user ? current_user.id : 1,
        receiver_id: params[:receiver_id],
        body: params[:body],
        subject: params[:subject] }
    end

  end

end

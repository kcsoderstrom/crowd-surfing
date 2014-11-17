module Api
  class EventsController < ApplicationController

    def create
      @event = current_user.events.new(event_params)
      if @event.save
        render json: @event
      else
        render json: @event.errors.full_messages
      end
    end

    def destroy

    end

    def search

      match = params[:event_match].present? ? params[:event_match] : nil

      if params[:filter_by]
        location = filter_params[:event_location]
        date_lower = Date.parse(filter_params[:date_lower]) if filter_params[:date_lower].present?
        date_upper = Date.parse(filter_params[:date_upper]) if filter_params[:date_upper].present?
        keywords = filter_params[:event_keyword] ? filter_params[:event_keyword] : nil
      end

      @events = Event.all
      @events = @events.joins(:user)
                       .joins("INNER JOIN profiles ON users.id = profiles.user_id")
                       .where("profiles.location ~ ?", location) if location
      @events = @events.where("title ~* ?", match) if match
      @events = @events.where("date < ?", date_upper + 1) if date_upper
      @events = @events.where("date > ?", date_lower - 1) if date_lower
      @events = @events.where("description ~* ?", keywords) if keywords

      if params[:sort_by]
        if params[:sort_by] == "alphabetical"
          @events = @events.order(:title)
        elsif params[:sort_by] == "date"
          @events = @events.order(:date)
        elsif parmas[:sort_by] == "proximity"
          # write something
        end
      end


      @events = @events.limit(10) if params[:page]
      @events = @events.offset(Integer(params[:page])*10) if params[:page]

      render :search_results

    end

    def index
      #TODO: IS THIS RIGHT AT ALL!?!?!?!?!???
      # ok so I want to get all of the events that the user has made
      current_user_id = current_user.id


      @received_invitations = Request.find_by_sql(<<-SQL
        SELECT requests.*, profiles.name AS sender_name, users.id AS sender_id
        FROM requests
        JOIN users
        ON requests.sender_id = users.id
        JOIN profiles
        ON profiles.user_id = users.id
        WHERE (
            requests.receiver_id = #{current_user_id}
          AND
            requests.invitation = TRUE
          AND
            requests.status != 'rejected'
        )
      SQL
      )

      @sent_requests = Request.find_by_sql(<<-SQL
        SELECT requests.*, profiles.name AS receiver_name, users.id AS receiver_id
        FROM requests
        JOIN users
        ON requests.receiver_id = users.id
        JOIN profiles
        ON profiles.user_id = users.id
        WHERE (
            requests.sender_id = #{current_user_id}
          AND
            requests.invitation = FALSE
          AND
            requests.status != 'rejected'
        )
      SQL
      )

      # I don't actually need the requests here,
      # just the recipients, so I'll leave the requests out for now.
      @sent_invitations = Request.find_by_sql(<<-SQL
        SELECT profiles.name AS receiver_name, users.id AS receiver_id
        FROM requests
        JOIN users
        ON requests.receiver_id = users.id
        JOIN profiles
        ON profiles.user_id = users.id
        WHERE (
            requests.sender_id = #{current_user_id}
          AND
            requests.invitation = TRUE
          AND
            requests.status != 'rejected'
        )
      SQL
      )

      relevant_request_ids = (@received_invitations.map(&:id) + @sent_requests.map(&:id)).join(",")

      if relevant_request_ids.length > 0
        @events = Event.find_by_sql(<<-SQL
          SELECT DISTINCT events.*
          FROM events
          LEFT OUTER JOIN requests
          ON requests.event_id = events.id
          WHERE (
            requests.id IN (#{ relevant_request_ids })
           OR
            events.user_id = #{current_user_id}
          )
          ORDER BY
            events.date
        SQL
        )
      else
        @events = Event.find_by_sql(<<-SQL
          SELECT DISTINCT events.*
          FROM events
          WHERE
            events.user_id = #{current_user_id}
          ORDER BY
            events.date
        SQL
        )
      end


      # @events = Event.includes(requests: [{sender: :profile}, {receiver: :profile}, :invitation]).find_by_sql(<<-SQL
      #   SELECT DISTINCT events.*
      #   FROM events
      #   LEFT OUTER JOIN
      #   ( SELECT requests.*
      #     FROM requests
      #     WHERE (
      #         sender_id = #{current_user_id}
      #       AND
      #         invitation = FALSE
      #       AND
      #         status != 'rejected'
      #     )
      #   ) AS sent_requests
      #   LEFT OUTER JOIN
      #   ( SELECT requests.*
      #     FROM requests
      #     WHERE (
      #         receiver_id = #{current_user_id}
      #       AND
      #         invitation = TRUE
      #       AND
      #         status != 'rejected'
      #     )
      #   )

      #   requests AS sent_requests
      #   ON sent_requests.event_id = events.id
      #   LEFT OUTER JOIN requests AS received_invitations
      #   ON received_invitations.event_id = events.id
      #   WHERE ((
      #
      #   ) OR (
      #       received_invitations.receiver_id = #{current_user_id}
      #     AND
      #       received_invitations.invitation = TRUE
      #     AND
      #       received_invitations.status != 'rejected'
      #   ) OR (
      #     events.user_id = #{current_user_id}
      #   ))
      #   ORDER BY
      #     events.date
      # SQL
      # )
      # render :index

      # and all of the people they've invited
      # and I want all the ones they've requested invitations to
      # that haven't been declined
    end

    def update
      @event = Event.find(params[:id])
      unless params[:is_attending].nil?
        is_attending = params[:is_attending]
        if is_attending == "true"
          current_user.received_requests.where(invitation: true).update_all(status: "accepted")
        else
          current_user.received_requests.where(invitation: true).update_all(status: "rejected")
        end
      end

      if @event.user == current_user && @event.update!(event_params)
        render :show
      else
        render json: "Log in!", status: :unprocessable_entity
      end
    end

    def destroy
      @event = Event.find(params[:id])

      if @event.destroy
        render json: @event
      else
        render json: @event.errors.full_messages, status: :unprocessable_entity
      end
    end

    def show
      @event = Event.includes(:user, requests: [{sender: :profile}, {receiver: :profile}]).find(params[:id])
      #render json: @event
      render :show
    end

    private
    def event_params
      params.require(:event).permit(:title, :location, :time, :date, :description)
    end

    def filter_params
      params.require(:filter_by).permit(:event_location, :date_lower, :date_upper, :event_keyword, :event_match)
    end

  end
end

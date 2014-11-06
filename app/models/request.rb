class Request < ActiveRecord::Base
  validates :sender_id, :receiver_id, presence: true
  validates :invitation, inclusion: { in: [true, false] }

  belongs_to :sender,
  class_name: "User",
  foreign_key: :sender_id

  belongs_to :receiver,
  class_name: "User",
  foreign_key: :receiver_id

  belongs_to :event

  def to_s
    req_type = self.invitation ? "Invitation" : "Request"
    #sender = self.sender_id == current_user.id ? "you" : User.find(sender_id)
    sender = User.find(sender_id).to_s
    #receiver = self.receiver_id == current_user.id ? "you" : User.find(receiver_id)
    receiver = User.find(receiver_id).to_s

    req_type + " from " + sender + " to " + receiver
  end
end

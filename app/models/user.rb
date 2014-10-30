class User < ActiveRecord::Base
  validates :username, :password_digest, :session_token, presence: true
  validates :username, uniqueness: true

  has_many :sent_requests,
  class_name: "Request",
  foreign_key: :sender_id

  has_many :received_requests,
  class_name: "Request",
  foreign_key: :receiver_id

  has_many :sent_messages,
  class_name: "Message",
  foreign_key: :sender_id

  has_many :received_messages,
  class_name: "Message",
  foreign_key: :receiver_id

  has_one :profile

  include BCrypt
  after_initialize :ensure_session_token

  def self.generate_session_token
    SecureRandom.hex(16)
    #really should make sure this isn't being used.
  end

  def password=(password)
    self.password_digest = Password.create(password)
  end

  def is_password?(password)
    Password.new(password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = self.class.generate_session_token
    self.update!(session_token: session_token)
  end

  def to_s
    username
  end

  def messages
    messages = []
    messages.concat(received_messages)
    messages.concat(sent_messages)
  end

  def requests
    requests = []
    requests.concat(received_requests)
    requests.concat(sent_requests)
  end

  private
  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end
end

class User < ApplicationRecord
  validates :username, presence: true, length: { minimum: 10, maximum: 50 }
  validates :password, presence: true, length: { minimum: 20, maximum: 50 }
  validate :validate_password

  def validate_password
    return if password.blank?
    score = Zxcvbn.test(password).score
    unless score >= 2
      errors.add(:password, "quality is weak")
    end
    unless password.match?(/\d/)
      errors.add(:password, "must contain at least one number")
    end
    unless password.match?(/[a-zA-Z]/)
      errors.add(:password, "must contain at least one letter")
    end
  end
end
 
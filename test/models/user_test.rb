require "test_helper"

class UserTest < ActiveSupport::TestCase
  test "should not save user with invalid username" do
    user_with_no_username = User.new(password: 'ValidPassword1234567890')
    user_with_short_username = User.new(username: 'short', password: 'ValidPassword1234567890')
    user_with_long_username = User.new(username: 'thisusernameisgreaterthanfiftycharacters01234567890', password: 'ValidPassword1234567890')

    assert_not user_with_no_username.save, "Saved the user without a username"
    assert_not user_with_short_username.save, "Saved the user with a username less than 10 characters"
    assert_not user_with_long_username.save, "Saved the user with a username more than 50 characters"
  end

  test "should not save user with invalid password" do
    user_with_no_password = User.new(username: 'validusername123')
    user_with_short_password = User.new(username: 'validusername123', password: 'short')
    user_with_long_password = User.new(username: 'validusername123', password: 'thispasswordisgreaterthanfiftycharacters01234567890')
    user_with_no_number_in_password = User.new(username: 'validusername123', password: 'PasswordWithoutANumber')
    user_with_no_letter_in_password = User.new(username: 'validusername123', password: '123456789012345678901234567890')
    user_with_low_strength_password = User.new(username: 'validusername123', password: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1')

    assert_not user_with_no_password.save, "Saved the user without a password"
    assert_not user_with_short_password.save, "Saved the user with a password less than 20 characters"
    assert_not user_with_long_password.save, "Saved the user with a password more than 50 characters"
    assert_not user_with_no_number_in_password.save, "Saved the user with a password that does not contain a number"
    assert_not user_with_no_letter_in_password.save, "Saved the user with a password that does not contain a letter"
    assert_not user_with_low_strength_password.save, "Saved the user with a password that has a low strength score"
  end

  test "should save valid user" do
    user = User.new(username: 'validusername123', password: 'ValidPassword1234567890')
    assert user.save, "Failed to save the user with valid username and password"
  end
end

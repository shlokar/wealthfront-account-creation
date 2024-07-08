require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  test "create_account fails with missing username" do
    post api_create_account_path, params: { user: { password: 'ValidPassword1234567890' } }
    assert_response :unprocessable_entity
    assert_equal JSON.parse(response.body)['errors'][0], "Username can't be blank"
  end

  test "create_account fails with missing password" do
    post api_create_account_path, params: { user: { username: 'validusername123' } }
    assert_response :unprocessable_entity
    assert_equal JSON.parse(response.body)['errors'][0], "Password can't be blank"
  end

  test "create_account fails with invalid username" do
    post api_create_account_path, params: { user: { username: '123456789', password: 'ValidPassword1234567890' } }
    assert_response :unprocessable_entity
    assert_equal JSON.parse(response.body)['errors'], ["Username is too short (minimum is 10 characters)"]
  end

  test "create_account fails with invalid password" do
    post api_create_account_path, params: { user: { username: 'validusername123', password: '1234567890123456789' } }
    assert_response :unprocessable_entity
    assert_equal JSON.parse(response.body)['errors'], ["Password is too short (minimum is 20 characters)", "Password quality is weak", "Password must contain at least one letter"]
  end
end

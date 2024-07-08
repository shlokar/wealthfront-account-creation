Rails.application.routes.draw do
  get '/', to: 'application#render_react', as: :root
  get 'signup/*all', to: 'application#render_react', as: :signup
  get 'create-account', to: 'application#render_react', as: :create_account
  post '/api/create-account', to: 'users#create'
end

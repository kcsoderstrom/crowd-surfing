Rails.application.routes.draw do
  root :to => "application#welcome"

  resources :users, only: [:new, :show, :create, :edit, :update, :index] do
    resources :requests, only: [:new]
  end
  resource :session, only: [:new, :create, :destroy]
  resources :requests, only: [:create, :edit, :update, :destroy, :index]
  resources :messages, only: [:index, :new, :create, :show]

  namespace :api, defaults: { format: :json } do
    get 'users/current_user', to: "users#json_current_user", as: "current_user"
    get 'users/search', to: "users#search", as: "search"
    resources :users, only: [:show, :create, :update, :index]
    resources :session, only: [:create, :update, :destroy]
    resources :requests, only: [:create, :show, :update, :destroy, :index]
    resources :messages, only: [:create, :show, :update, :destroy, :index]
  end
end

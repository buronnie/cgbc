Rails.application.routes.draw do
  apipie
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'main#index'

  # -- API ---------------------------------------------
  namespace :api do
    namespace :v1 do
      resource :donations
    end
  end

end

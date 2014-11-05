class OauthCallbacksController < ApplicationController
  def facebook
    @user = User.facebook_make({
      provider: request.env['omniauth.auth'][:provider],
      uid: request.env['omniauth.auth'][:uid],
      email: request.env['omniauth.auth'][:info][:email],
      profile: {
        name: request.env['omniauth.auth'][:info][:name],
        location: request.env['omniauth.auth'][:info][:location],
        gender: request.env['omniauth.auth'][:extra][:raw_info][:gender]
      }
    })

    login_user!(@user)
    redirect_to root_url
  end
end

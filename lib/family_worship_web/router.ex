defmodule FamilyWorshipWeb.Router do
  use FamilyWorshipWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug Guardian.Plug.VerifyHeader, realm: "Bearer"
    plug Guardian.Plug.LoadResource
  end

  scope "/", FamilyWorshipWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
  end

  scope "/api", FamilyWorshipWeb do
    pipe_through :api
    resources "/users", UserController
    resources "/families", FamilyController, except: [:new, :edit]
    get "/families/family/:user_id", FamilyController, :retrieve
    resources "/worship_sessions", WorshipSessionController, except: [:new, :edit]
    get "/worship_sessions/user_sessions/:user_id", WorshipSessionController, :retrieve
    resources "/psalms", PsalmController, except: [:new, :edit]
    get "/psalms/psalm/:psalm_ref", PsalmController, :retrieve
    post "/sessions", SessionsController, :create # login
    delete "/sessions", SessionsController, :delete # log out
  end
end

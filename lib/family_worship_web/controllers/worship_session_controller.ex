defmodule FamilyWorshipWeb.WorshipSessionController do
  use FamilyWorshipWeb, :controller

  alias FamilyWorship.Worship
  alias FamilyWorship.Worship.WorshipSession

  action_fallback FamilyWorshipWeb.FallbackController

  def index(conn, _params) do
    worship_sessions = Worship.list_worship_sessions()
    render(conn, "index.json", worship_sessions: worship_sessions)
  end

  def create(conn, %{"worship_session" => worship_session_params}) do
    with {:ok, %WorshipSession{} = worship_session} <- Worship.create_worship_session(worship_session_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", worship_session_path(conn, :show, worship_session))
      |> render("show.json", worship_session: worship_session)
    end
  end

  def show(conn, %{"id" => id}) do
    worship_session = Worship.get_worship_session!(id)
    render(conn, "show.json", worship_session: worship_session)
  end

  def retrieve(conn, %{"user_id" => user_id}) do
    worship_sessions = Worship.get_worship_sessions_by_user_id!(user_id)
    render(conn, "index.json", worship_sessions: worship_sessions)
  end

  def update(conn, %{"id" => id, "worship_session" => worship_session_params}) do
    worship_session = Worship.get_worship_session!(id)

    with {:ok, %WorshipSession{} = worship_session} <- Worship.update_worship_session(worship_session, worship_session_params) do
      render(conn, "show.json", worship_session: worship_session)
    end
  end

  def delete(conn, %{"id" => id}) do
    worship_session = Worship.get_worship_session!(id)
    with {:ok, %WorshipSession{}} <- Worship.delete_worship_session(worship_session) do
      send_resp(conn, :no_content, "")
    end
  end
end

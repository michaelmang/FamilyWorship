defmodule FamilyWorshipWeb.PsalmController do
  use FamilyWorshipWeb, :controller

  alias FamilyWorship.Worship
  alias FamilyWorship.Worship.Psalm

  action_fallback FamilyWorshipWeb.FallbackController

  def index(conn, _params) do
    psalms = Worship.list_psalms()
    render(conn, "index.json", psalms: psalms)
  end

  def create(conn, %{"psalm" => psalm_params}) do
    with {:ok, %Psalm{} = psalm} <- Worship.create_psalm(psalm_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", psalm_path(conn, :show, psalm))
      |> render("show.json", psalm: psalm)
    end
  end

  def show(conn, %{"id" => id}) do
    psalm = Worship.get_psalm!(id)
    render(conn, "show.json", psalm: psalm)
  end

  def retrieve(conn, %{"psalm_ref" => psalm_ref}) do
    psalm = Worship.get_psalm_by_ref!(psalm_ref)
    render(conn, "show.json", psalm: psalm)
  end

  def update(conn, %{"id" => id, "psalm" => psalm_params}) do
    psalm = Worship.get_psalm!(id)

    with {:ok, %Psalm{} = psalm} <- Worship.update_psalm(psalm, psalm_params) do
      render(conn, "show.json", psalm: psalm)
    end
  end

  def delete(conn, %{"id" => id}) do
    psalm = Worship.get_psalm!(id)
    with {:ok, %Psalm{}} <- Worship.delete_psalm(psalm) do
      send_resp(conn, :no_content, "")
    end
  end
end

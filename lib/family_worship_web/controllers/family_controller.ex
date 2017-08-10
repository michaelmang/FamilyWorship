defmodule FamilyWorshipWeb.FamilyController do
  use FamilyWorshipWeb, :controller

  alias FamilyWorship.Accounts
  alias FamilyWorship.Accounts.Family

  action_fallback FamilyWorshipWeb.FallbackController

  def index(conn, _params) do
    families = Accounts.list_families()
    render(conn, "index.json", families: families)
  end

  def create(conn, %{"family" => family_params}) do
    with {:ok, %Family{} = family} <- Accounts.create_family(family_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", family_path(conn, :show, family))
      |> render("show.json", family: family)
    end
  end

  def show(conn, %{"id" => id}) do
    family = Accounts.get_family!(id)
    render(conn, "show.json", family: family)
  end

  def retrieve(conn, %{"user_id" => user_id}) do
    family = Accounts.get_family_by_ref!(user_id)
    render(conn, "show.json", family: family)
  end

  def update(conn, %{"id" => id, "family" => family_params}) do
    family = Accounts.get_family!(id)

    with {:ok, %Family{} = family} <- Accounts.update_family(family, family_params) do
      render(conn, "show.json", family: family)
    end
  end

  def delete(conn, %{"id" => id}) do
    family = Accounts.get_family!(id)
    with {:ok, %Family{}} <- Accounts.delete_family(family) do
      send_resp(conn, :no_content, "")
    end
  end
end

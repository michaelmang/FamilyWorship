defmodule FamilyWorshipWeb.PageController do
  use FamilyWorshipWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end

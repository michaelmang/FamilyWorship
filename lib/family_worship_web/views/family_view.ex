defmodule FamilyWorshipWeb.FamilyView do
  use FamilyWorshipWeb, :view
  alias FamilyWorshipWeb.FamilyView

  def render("index.json", %{families: families}) do
    %{data: render_many(families, FamilyView, "family.json")}
  end

  def render("show.json", %{family: family}) do
    %{data: render_one(family, FamilyView, "family.json")}
  end

  def render("family.json", %{family: family}) do
    %{id: family.id,
      name: family.name,
      user_id: family.user_id}
  end
end

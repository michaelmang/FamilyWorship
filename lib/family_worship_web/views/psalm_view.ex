defmodule FamilyWorshipWeb.PsalmView do
  use FamilyWorshipWeb, :view
  alias FamilyWorshipWeb.PsalmView

  def render("index.json", %{psalms: psalms}) do
    %{data: render_many(psalms, PsalmView, "psalm.json")}
  end

  def render("show.json", %{psalm: psalm}) do
    %{data: render_one(psalm, PsalmView, "psalm.json")}
  end

  def render("psalm.json", %{psalm: psalm}) do
    %{id: psalm.id,
      lyrics: psalm.lyrics,
      notes: psalm.notes,
      psalm_ref: psalm.psalm_ref
    }
  end
end

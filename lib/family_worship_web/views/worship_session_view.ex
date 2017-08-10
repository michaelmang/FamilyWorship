defmodule FamilyWorshipWeb.WorshipSessionView do
  use FamilyWorshipWeb, :view
  alias FamilyWorshipWeb.WorshipSessionView

  def render("index.json", %{worship_sessions: worship_sessions}) do
    %{data: render_many(worship_sessions, WorshipSessionView, "worship_session.json")}
  end

  def render("show.json", %{worship_session: worship_session}) do
    %{data: render_one(worship_session, WorshipSessionView, "worship_session.json")}
  end

  def render("worship_session.json", %{worship_session: worship_session}) do
    %{id: worship_session.id,
      date: worship_session.date,
      time: worship_session.time,
      openingNotes: worship_session.openingNotes,
      firstPsalm: worship_session.firstPsalm,
      book: worship_session.book,
      chapter: worship_session.chapter,
      verses: worship_session.verses,
      messageNotes: worship_session.messageNotes,
      secondPsalm: worship_session.secondPsalm,
      closingNotes: worship_session.closingNotes,
      user_id: worship_session.user_id}
  end
end

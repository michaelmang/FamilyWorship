defmodule FamilyWorship.Repo.Migrations.CreateWorshipSessions do
  use Ecto.Migration

  def change do
    create table(:worship_sessions) do
      add :date, :string
      add :time, :string
      add :openingNotes, :string
      add :firstPsalm, :string
      add :book, :string
      add :chapter, :string
      add :verses, :integer
      add :messageNotes, :string
      add :secondPsalm, :string
      add :closingNotes, :string

      timestamps()
    end

  end
end

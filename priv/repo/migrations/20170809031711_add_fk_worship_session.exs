defmodule FamilyWorship.Repo.Migrations.AddFkWorshipSessions do
  use Ecto.Migration

  def change do
    alter table(:worship_sessions) do
      add :user_id, references(:users), null: false
    end
  end
end

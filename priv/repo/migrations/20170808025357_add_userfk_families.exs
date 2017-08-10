defmodule FamilyWorship.Repo.Migrations.AddUserfkFamilies do
  use Ecto.Migration

  def change do
    alter table(:families) do
      add :user_id, references(:users), null: false
    end
  end
end

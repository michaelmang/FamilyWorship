defmodule FamilyWorship.Repo.Migrations.AlterFamiliesTable do
  use Ecto.Migration

  def change do
    alter table(:families) do
      remove :user_id
    end
  end
end

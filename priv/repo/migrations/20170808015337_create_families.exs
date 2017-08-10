defmodule FamilyWorship.Repo.Migrations.CreateFamilies do
  use Ecto.Migration

  def change do
    create table(:families) do
      add :name, :string
      add :user_id, :uuid

      timestamps()
    end

  end
end

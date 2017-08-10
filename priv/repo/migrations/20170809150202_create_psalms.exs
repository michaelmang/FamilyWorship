defmodule FamilyWorship.Repo.Migrations.CreatePsalms do
  use Ecto.Migration

  def change do
    create table(:psalms) do
      add :lyrics, :string
      add :notes, :string

      timestamps()
    end

  end
end

defmodule FamilyWorship.Repo.Migrations.AddRefPsalms do
  use Ecto.Migration

  def change do
    alter table(:psalms) do
      add :psalm_ref, :string
    end
  end
end

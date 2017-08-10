defmodule FamilyWorship.Repo.Migrations.AlterPsalmRefType do
  use Ecto.Migration

  def change do
    alter table(:psalms) do
      add :psalm_ref, :integer
    end
  end
end

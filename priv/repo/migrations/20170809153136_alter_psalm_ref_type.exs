defmodule FamilyWorship.Repo.Migrations.AlterPsalmRefType do
  use Ecto.Migration

  def change do
    alter table(:psalms) do
      remove :psalm_ref
    end
  end
end

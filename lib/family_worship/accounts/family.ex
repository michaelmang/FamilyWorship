defmodule FamilyWorship.Accounts.Family do
  use Ecto.Schema
  import Ecto.Changeset
  alias FamilyWorship.Accounts.Family


  schema "families" do
    field :name, :string
    field :user_id, :integer

    timestamps()
  end

  @doc false
  def changeset(%Family{} = family, attrs) do
    family
    |> cast(attrs, [:name, :user_id])
    |> validate_required([:name, :user_id])
    # |> foreign_key_constraint(:user_id)
  end
end

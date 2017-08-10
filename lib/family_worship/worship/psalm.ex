defmodule FamilyWorship.Worship.Psalm do
  use Ecto.Schema
  import Ecto.Changeset
  alias FamilyWorship.Worship.Psalm


  schema "psalms" do
    field :lyrics, :string
    field :notes, :string
    field :psalm_ref, :integer
    timestamps()
  end

  @doc false
  def changeset(%Psalm{} = psalm, attrs) do
    psalm
    |> cast(attrs, [:lyrics, :notes, :psalm_ref])
    |> validate_required([:lyrics, :notes, :psalm_ref])
  end
end

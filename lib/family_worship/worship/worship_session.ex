defmodule FamilyWorship.Worship.WorshipSession do
  use Ecto.Schema
  import Ecto.Changeset
  alias FamilyWorship.Worship.WorshipSession


  schema "worship_sessions" do
    field :book, :string
    field :chapter, :string
    field :closingNotes, :string
    field :date, :string
    field :firstPsalm, :string
    field :messageNotes, :string
    field :openingNotes, :string
    field :secondPsalm, :string
    field :time, :string
    field :verses, :integer
    field :user_id, :integer

    timestamps()
  end

  @doc false
  def changeset(%WorshipSession{} = worship_session, attrs) do
    worship_session
    |> cast(attrs, [:date, :time, :openingNotes, :firstPsalm, :book, :chapter, :verses, :messageNotes, :secondPsalm, :closingNotes, :user_id])
    |> validate_required([:date, :time, :openingNotes, :firstPsalm, :book, :chapter, :verses, :messageNotes, :secondPsalm, :closingNotes, :user_id])
  end
end

defmodule FamilyWorship.Worship do
  @moduledoc """
  The Worship context.
  """

  import Ecto.Query, warn: false
  alias FamilyWorship.Repo

  alias FamilyWorship.Worship.WorshipSession

  @doc """
  Returns the list of worship_sessions.

  ## Examples

      iex> list_worship_sessions()
      [%WorshipSession{}, ...]

  """
  def list_worship_sessions do
    Repo.all(WorshipSession)
  end

  @doc """
  Gets a single worship_session.

  Raises `Ecto.NoResultsError` if the Worship session does not exist.

  ## Examples

      iex> get_worship_session!(123)
      %WorshipSession{}

      iex> get_worship_session!(456)
      ** (Ecto.NoResultsError)

  """
  def get_worship_session!(id), do: Repo.get!(WorshipSession, id)

  def get_worship_sessions_by_user_id!(user_id) do
    from(ws in WorshipSession, where: ws.user_id == ^user_id) |> Repo.all()
  end

  @doc """
  Creates a worship_session.

  ## Examples

      iex> create_worship_session(%{field: value})
      {:ok, %WorshipSession{}}

      iex> create_worship_session(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_worship_session(attrs \\ %{}) do
    %WorshipSession{}
    |> WorshipSession.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a worship_session.

  ## Examples

      iex> update_worship_session(worship_session, %{field: new_value})
      {:ok, %WorshipSession{}}

      iex> update_worship_session(worship_session, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_worship_session(%WorshipSession{} = worship_session, attrs) do
    worship_session
    |> WorshipSession.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a WorshipSession.

  ## Examples

      iex> delete_worship_session(worship_session)
      {:ok, %WorshipSession{}}

      iex> delete_worship_session(worship_session)
      {:error, %Ecto.Changeset{}}

  """
  def delete_worship_session(%WorshipSession{} = worship_session) do
    Repo.delete(worship_session)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking worship_session changes.

  ## Examples

      iex> change_worship_session(worship_session)
      %Ecto.Changeset{source: %WorshipSession{}}

  """
  def change_worship_session(%WorshipSession{} = worship_session) do
    WorshipSession.changeset(worship_session, %{})
  end

  alias FamilyWorship.Worship.Psalm

  @doc """
  Returns the list of psalms.

  ## Examples

      iex> list_psalms()
      [%Psalm{}, ...]

  """
  def list_psalms do
    Repo.all(Psalm)
  end

  @doc """
  Gets a single psalm.

  Raises `Ecto.NoResultsError` if the Psalm does not exist.

  ## Examples

      iex> get_psalm!(123)
      %Psalm{}

      iex> get_psalm!(456)
      ** (Ecto.NoResultsError)

  """
  def get_psalm!(id), do: Repo.get!(Psalm, id)

  def get_psalm_by_ref!(psalm_ref) do
    Repo.get_by!(Psalm, psalm_ref: psalm_ref)
  end

  @doc """
  Creates a psalm.

  ## Examples

      iex> create_psalm(%{field: value})
      {:ok, %Psalm{}}

      iex> create_psalm(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_psalm(attrs \\ %{}) do
    %Psalm{}
    |> Psalm.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a psalm.

  ## Examples

      iex> update_psalm(psalm, %{field: new_value})
      {:ok, %Psalm{}}

      iex> update_psalm(psalm, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_psalm(%Psalm{} = psalm, attrs) do
    psalm
    |> Psalm.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Psalm.

  ## Examples

      iex> delete_psalm(psalm)
      {:ok, %Psalm{}}

      iex> delete_psalm(psalm)
      {:error, %Ecto.Changeset{}}

  """
  def delete_psalm(%Psalm{} = psalm) do
    Repo.delete(psalm)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking psalm changes.

  ## Examples

      iex> change_psalm(psalm)
      %Ecto.Changeset{source: %Psalm{}}

  """
  def change_psalm(%Psalm{} = psalm) do
    Psalm.changeset(psalm, %{})
  end
end

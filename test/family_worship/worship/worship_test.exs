defmodule FamilyWorship.WorshipTest do
  use FamilyWorship.DataCase

  alias FamilyWorship.Worship

  describe "worship_sessions" do
    alias FamilyWorship.Worship.WorshipSession

    @valid_attrs %{book: "some book", chapter: "some chapter", closingNotes: "some closingNotes", date: "some date", firstPsalm: "some firstPsalm", messageNotes: "some messageNotes", openingNotes: "some openingNotes", secondPsalm: "some secondPsalm", time: "some time", verses: 42}
    @update_attrs %{book: "some updated book", chapter: "some updated chapter", closingNotes: "some updated closingNotes", date: "some updated date", firstPsalm: "some updated firstPsalm", messageNotes: "some updated messageNotes", openingNotes: "some updated openingNotes", secondPsalm: "some updated secondPsalm", time: "some updated time", verses: 43}
    @invalid_attrs %{book: nil, chapter: nil, closingNotes: nil, date: nil, firstPsalm: nil, messageNotes: nil, openingNotes: nil, secondPsalm: nil, time: nil, verses: nil}

    def worship_session_fixture(attrs \\ %{}) do
      {:ok, worship_session} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Worship.create_worship_session()

      worship_session
    end

    test "list_worship_sessions/0 returns all worship_sessions" do
      worship_session = worship_session_fixture()
      assert Worship.list_worship_sessions() == [worship_session]
    end

    test "get_worship_session!/1 returns the worship_session with given id" do
      worship_session = worship_session_fixture()
      assert Worship.get_worship_session!(worship_session.id) == worship_session
    end

    test "create_worship_session/1 with valid data creates a worship_session" do
      assert {:ok, %WorshipSession{} = worship_session} = Worship.create_worship_session(@valid_attrs)
      assert worship_session.book == "some book"
      assert worship_session.chapter == "some chapter"
      assert worship_session.closingNotes == "some closingNotes"
      assert worship_session.date == "some date"
      assert worship_session.firstPsalm == "some firstPsalm"
      assert worship_session.messageNotes == "some messageNotes"
      assert worship_session.openingNotes == "some openingNotes"
      assert worship_session.secondPsalm == "some secondPsalm"
      assert worship_session.time == "some time"
      assert worship_session.verses == 42
    end

    test "create_worship_session/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Worship.create_worship_session(@invalid_attrs)
    end

    test "update_worship_session/2 with valid data updates the worship_session" do
      worship_session = worship_session_fixture()
      assert {:ok, worship_session} = Worship.update_worship_session(worship_session, @update_attrs)
      assert %WorshipSession{} = worship_session
      assert worship_session.book == "some updated book"
      assert worship_session.chapter == "some updated chapter"
      assert worship_session.closingNotes == "some updated closingNotes"
      assert worship_session.date == "some updated date"
      assert worship_session.firstPsalm == "some updated firstPsalm"
      assert worship_session.messageNotes == "some updated messageNotes"
      assert worship_session.openingNotes == "some updated openingNotes"
      assert worship_session.secondPsalm == "some updated secondPsalm"
      assert worship_session.time == "some updated time"
      assert worship_session.verses == 43
    end

    test "update_worship_session/2 with invalid data returns error changeset" do
      worship_session = worship_session_fixture()
      assert {:error, %Ecto.Changeset{}} = Worship.update_worship_session(worship_session, @invalid_attrs)
      assert worship_session == Worship.get_worship_session!(worship_session.id)
    end

    test "delete_worship_session/1 deletes the worship_session" do
      worship_session = worship_session_fixture()
      assert {:ok, %WorshipSession{}} = Worship.delete_worship_session(worship_session)
      assert_raise Ecto.NoResultsError, fn -> Worship.get_worship_session!(worship_session.id) end
    end

    test "change_worship_session/1 returns a worship_session changeset" do
      worship_session = worship_session_fixture()
      assert %Ecto.Changeset{} = Worship.change_worship_session(worship_session)
    end
  end

  describe "psalms" do
    alias FamilyWorship.Worship.Psalm

    @valid_attrs %{lyrics: "some lyrics", notes: "some notes"}
    @update_attrs %{lyrics: "some updated lyrics", notes: "some updated notes"}
    @invalid_attrs %{lyrics: nil, notes: nil}

    def psalm_fixture(attrs \\ %{}) do
      {:ok, psalm} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Worship.create_psalm()

      psalm
    end

    test "list_psalms/0 returns all psalms" do
      psalm = psalm_fixture()
      assert Worship.list_psalms() == [psalm]
    end

    test "get_psalm!/1 returns the psalm with given id" do
      psalm = psalm_fixture()
      assert Worship.get_psalm!(psalm.id) == psalm
    end

    test "create_psalm/1 with valid data creates a psalm" do
      assert {:ok, %Psalm{} = psalm} = Worship.create_psalm(@valid_attrs)
      assert psalm.lyrics == "some lyrics"
      assert psalm.notes == "some notes"
    end

    test "create_psalm/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Worship.create_psalm(@invalid_attrs)
    end

    test "update_psalm/2 with valid data updates the psalm" do
      psalm = psalm_fixture()
      assert {:ok, psalm} = Worship.update_psalm(psalm, @update_attrs)
      assert %Psalm{} = psalm
      assert psalm.lyrics == "some updated lyrics"
      assert psalm.notes == "some updated notes"
    end

    test "update_psalm/2 with invalid data returns error changeset" do
      psalm = psalm_fixture()
      assert {:error, %Ecto.Changeset{}} = Worship.update_psalm(psalm, @invalid_attrs)
      assert psalm == Worship.get_psalm!(psalm.id)
    end

    test "delete_psalm/1 deletes the psalm" do
      psalm = psalm_fixture()
      assert {:ok, %Psalm{}} = Worship.delete_psalm(psalm)
      assert_raise Ecto.NoResultsError, fn -> Worship.get_psalm!(psalm.id) end
    end

    test "change_psalm/1 returns a psalm changeset" do
      psalm = psalm_fixture()
      assert %Ecto.Changeset{} = Worship.change_psalm(psalm)
    end
  end
end

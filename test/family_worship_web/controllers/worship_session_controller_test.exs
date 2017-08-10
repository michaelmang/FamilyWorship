defmodule FamilyWorshipWeb.WorshipSessionControllerTest do
  use FamilyWorshipWeb.ConnCase

  alias FamilyWorship.Worship
  alias FamilyWorship.Worship.WorshipSession

  @create_attrs %{book: "some book", chapter: "some chapter", closingNotes: "some closingNotes", date: "some date", firstPsalm: "some firstPsalm", messageNotes: "some messageNotes", openingNotes: "some openingNotes", secondPsalm: "some secondPsalm", time: "some time", verses: 42}
  @update_attrs %{book: "some updated book", chapter: "some updated chapter", closingNotes: "some updated closingNotes", date: "some updated date", firstPsalm: "some updated firstPsalm", messageNotes: "some updated messageNotes", openingNotes: "some updated openingNotes", secondPsalm: "some updated secondPsalm", time: "some updated time", verses: 43}
  @invalid_attrs %{book: nil, chapter: nil, closingNotes: nil, date: nil, firstPsalm: nil, messageNotes: nil, openingNotes: nil, secondPsalm: nil, time: nil, verses: nil}

  def fixture(:worship_session) do
    {:ok, worship_session} = Worship.create_worship_session(@create_attrs)
    worship_session
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all worship_sessions", %{conn: conn} do
      conn = get conn, worship_session_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create worship_session" do
    test "renders worship_session when data is valid", %{conn: conn} do
      conn = post conn, worship_session_path(conn, :create), worship_session: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, worship_session_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "book" => "some book",
        "chapter" => "some chapter",
        "closingNotes" => "some closingNotes",
        "date" => "some date",
        "firstPsalm" => "some firstPsalm",
        "messageNotes" => "some messageNotes",
        "openingNotes" => "some openingNotes",
        "secondPsalm" => "some secondPsalm",
        "time" => "some time",
        "verses" => 42}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, worship_session_path(conn, :create), worship_session: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update worship_session" do
    setup [:create_worship_session]

    test "renders worship_session when data is valid", %{conn: conn, worship_session: %WorshipSession{id: id} = worship_session} do
      conn = put conn, worship_session_path(conn, :update, worship_session), worship_session: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, worship_session_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "book" => "some updated book",
        "chapter" => "some updated chapter",
        "closingNotes" => "some updated closingNotes",
        "date" => "some updated date",
        "firstPsalm" => "some updated firstPsalm",
        "messageNotes" => "some updated messageNotes",
        "openingNotes" => "some updated openingNotes",
        "secondPsalm" => "some updated secondPsalm",
        "time" => "some updated time",
        "verses" => 43}
    end

    test "renders errors when data is invalid", %{conn: conn, worship_session: worship_session} do
      conn = put conn, worship_session_path(conn, :update, worship_session), worship_session: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete worship_session" do
    setup [:create_worship_session]

    test "deletes chosen worship_session", %{conn: conn, worship_session: worship_session} do
      conn = delete conn, worship_session_path(conn, :delete, worship_session)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, worship_session_path(conn, :show, worship_session)
      end
    end
  end

  defp create_worship_session(_) do
    worship_session = fixture(:worship_session)
    {:ok, worship_session: worship_session}
  end
end

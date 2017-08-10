defmodule FamilyWorshipWeb.PsalmControllerTest do
  use FamilyWorshipWeb.ConnCase

  alias FamilyWorship.Worship
  alias FamilyWorship.Worship.Psalm

  @create_attrs %{lyrics: "some lyrics", notes: "some notes"}
  @update_attrs %{lyrics: "some updated lyrics", notes: "some updated notes"}
  @invalid_attrs %{lyrics: nil, notes: nil}

  def fixture(:psalm) do
    {:ok, psalm} = Worship.create_psalm(@create_attrs)
    psalm
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all psalms", %{conn: conn} do
      conn = get conn, psalm_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create psalm" do
    test "renders psalm when data is valid", %{conn: conn} do
      conn = post conn, psalm_path(conn, :create), psalm: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, psalm_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "lyrics" => "some lyrics",
        "notes" => "some notes"}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, psalm_path(conn, :create), psalm: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update psalm" do
    setup [:create_psalm]

    test "renders psalm when data is valid", %{conn: conn, psalm: %Psalm{id: id} = psalm} do
      conn = put conn, psalm_path(conn, :update, psalm), psalm: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, psalm_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "lyrics" => "some updated lyrics",
        "notes" => "some updated notes"}
    end

    test "renders errors when data is invalid", %{conn: conn, psalm: psalm} do
      conn = put conn, psalm_path(conn, :update, psalm), psalm: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete psalm" do
    setup [:create_psalm]

    test "deletes chosen psalm", %{conn: conn, psalm: psalm} do
      conn = delete conn, psalm_path(conn, :delete, psalm)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, psalm_path(conn, :show, psalm)
      end
    end
  end

  defp create_psalm(_) do
    psalm = fixture(:psalm)
    {:ok, psalm: psalm}
  end
end

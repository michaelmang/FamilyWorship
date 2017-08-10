defmodule FamilyWorshipWeb.FamilyControllerTest do
  use FamilyWorshipWeb.ConnCase

  alias FamilyWorship.Accounts
  alias FamilyWorship.Accounts.Family

  @create_attrs %{name: "some name", user_id: "7488a646-e31f-11e4-aace-600308960662"}
  @update_attrs %{name: "some updated name", user_id: "7488a646-e31f-11e4-aace-600308960668"}
  @invalid_attrs %{name: nil, user_id: nil}

  def fixture(:family) do
    {:ok, family} = Accounts.create_family(@create_attrs)
    family
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all families", %{conn: conn} do
      conn = get conn, family_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create family" do
    test "renders family when data is valid", %{conn: conn} do
      conn = post conn, family_path(conn, :create), family: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, family_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "name" => "some name",
        "user_id" => "7488a646-e31f-11e4-aace-600308960662"}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, family_path(conn, :create), family: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update family" do
    setup [:create_family]

    test "renders family when data is valid", %{conn: conn, family: %Family{id: id} = family} do
      conn = put conn, family_path(conn, :update, family), family: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, family_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "name" => "some updated name",
        "user_id" => "7488a646-e31f-11e4-aace-600308960668"}
    end

    test "renders errors when data is invalid", %{conn: conn, family: family} do
      conn = put conn, family_path(conn, :update, family), family: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete family" do
    setup [:create_family]

    test "deletes chosen family", %{conn: conn, family: family} do
      conn = delete conn, family_path(conn, :delete, family)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, family_path(conn, :show, family)
      end
    end
  end

  defp create_family(_) do
    family = fixture(:family)
    {:ok, family: family}
  end
end

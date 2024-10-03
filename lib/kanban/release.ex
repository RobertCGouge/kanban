defmodule Kanban.Release do
  @moduledoc """
  Used for executing DB release tasks when run in production without Mix
  installed.
  """
  @app :kanban

  def migrate do
    load_app()

    for repo <- repos() do
      Ecto.Adapters.Postgres.execute_ddl(repo, "drop schema public cascade;", [])
      Ecto.Adapters.Postgres.execute_ddl(repo, "create schema public;", [])

      {:ok, _, _} = Ecto.Migrator.with_repo(repo, &Ecto.Migrator.run(&1, :up, all: true))
    end
  end

  def rollback(repo, version) do
    load_app()
    {:ok, _, _} = Ecto.Migrator.with_repo(repo, &Ecto.Migrator.run(&1, :down, to: version))
  end

  defp repos do
    Application.fetch_env!(@app, :ecto_repos)
  end

  defp load_app do
    Application.load(@app)
  end
end

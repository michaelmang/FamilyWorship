# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :family_worship,
  ecto_repos: [FamilyWorship.Repo]

# Configures the endpoint
config :family_worship, FamilyWorshipWeb.Endpoint,
  url: [host: "family-worship.herokuapp.com"],
  secret_key_base: "eDxiRsym52HFEJijR4NT8r1PAGhZp+lFAkViiP5sSLRXWAz/KeHADGNjJcJPOkYA",
  render_errors: [view: FamilyWorshipWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: FamilyWorship.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Configures Guardian
  config :guardian, Guardian,
    issuer: "FamilyWorship",
    ttl: {30, :days},
    verify_issuer: true,
    serializer: FamilyWorship.GuardianSerializer,
    secret_key: "ht9l4jHJtpn420vjNGu2TNJxctxQMu+yEeP/ZxrF70IC1MOfqpt7F36wrrL7qNkX"

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"

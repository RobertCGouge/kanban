#!/usr/bin/env bash

# in scripts/asdf_plugins

# install necessary plugins
plugins=(
    "github-cli"
    "packer"
    "terraform"
    "awscli"
    "elixir"
    "postgres"
    "jq"
    "age"
    "sops"
)

for plugin in "${plugins[@]}"; do
asdf plugin-add "$plugin"
done

echo "Installation complete."
echo "Please restart your terminal or source your profile file."
#!/usr/bin/env bash
#---
# Excerpted from "Engineering Elixir Applications",
# published by The Pragmatic Bookshelf.
# Copyrights apply to this code. It may not be used to create training material,
# courses, books, articles, and the like. Contact us if you are in doubt.
# We make no guarantees that this code is fit for any purpose.
# Visit https://pragprog.com/titles/beamops for more book information.
#---

# set -x

# Replace this with the command that outputs the version information
version_output=$(cat ./.tool-versions)
# Extract the Elixir version
elixir_version=$(echo "${version_output}" | grep 'elixir')
elixir_version=$(echo "${elixir_version}" | cut -d' ' -f2)
elixir_version=$(echo "${elixir_version}" | cut -d' ' -f1)
# Extract Erlang version
erlang_version=$(echo "${version_output}" | grep 'erlang')
erlang_version=$(echo "${erlang_version}" | cut -d' ' -f2)
# Extract os version
os_version=$(echo "${version_output}" | grep '#base-os')
os_version=$(echo "${version_output}" | cut -d' ' -f2)
{
	echo "elixir_version=${elixir_version}"
	echo "erlang_version=${erlang_version}"
	echo "os_version=${os_version}"
} >>"${GITHUB_OUTPUT}"

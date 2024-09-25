ARG EX_VSN=1.16.3
ARG OTP_VSN=26.1.2
ARG ALPN_VSN=3.18.9

ARG BUILDER_IMAGE=hexpm/elixir:${EX_VSN}-erlang-${OTP_VSN}-alpine-${ALPN_VSN}
ARG RUNNER_IMG=alpine:${ALPN_VSN}

FROM ${BUILDER_IMAGE} AS builder

WORKDIR /app

RUN mix local.hex --force && \
    mix local.rebar --force

ENV MIX_ENV="prod"

COPY mix.exs mix.lock ./
RUN mix deps.get --only $MIX_ENV

RUN mkdir config
COPY config/config.exs config/${MIX_ENV}.exs config/
RUN mix deps.compile

COPY priv priv
COPY lib lib
COPY assets assets

RUN mix assets.deploy
RUN mix compile

COPY config/runtime.exs config/
COPY rel rel

RUN mix release

FROM ${RUNNER_IMG} AS runner

RUN apk add --update ncurses-libs libstdc++

WORKDIR /app
RUN chown nobody /app
ENV MIX_ENV="prod"
COPY --from=builder \
    --chown=nobody:root /app/_build/${MIX_ENV}/rel/kanban ./

USER nobody
CMD [ "/app/bin/server" ]
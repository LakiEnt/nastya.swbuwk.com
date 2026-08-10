FROM node:22-slim AS base
ENV PATH="/pnpm:$PATH"

RUN apt-get update && apt-get install -y --no-install-recommends proxychains-ng \
    && rm -rf /var/lib/apt/lists/* \
    && echo "strict_chain\nquiet_mode\n[ProxyList]\nhttp 172.17.0.1 1080" > /etc/proxychains4.conf

RUN corepack enable
WORKDIR /app


FROM base AS build

COPY package.json pnpm-lock.yaml ./
RUN proxychains4 pnpm install --frozen-lockfile --ignore-scripts

COPY . .
RUN proxychains4 pnpm build


FROM base AS runner

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

COPY --from=build /app/.output ./.output
COPY --from=build /app/content/projects.json /app/content/projects.json

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
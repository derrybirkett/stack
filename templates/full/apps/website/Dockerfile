FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm nx build website

FROM base AS runner
ENV NODE_ENV=production
COPY --from=build /app/dist/apps/website/standalone ./
COPY --from=build /app/dist/apps/website/static ./public
EXPOSE 3000
CMD ["node", "server.js"]

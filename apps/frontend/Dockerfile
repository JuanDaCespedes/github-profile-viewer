FROM node:24-alpine AS builder

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* ./
COPY apps/frontend/package.json ./apps/frontend/

RUN pnpm install --frozen-lockfile || pnpm install

COPY apps/frontend ./apps/frontend

RUN pnpm --filter frontend run build

FROM node:24-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001

COPY --from=builder /app/apps/frontend/public ./public
COPY --from=builder /app/apps/frontend/.next ./
COPY --from=builder /app/apps/frontend/node_modules ./node_modules
COPY --from=builder /app/apps/frontend/package.json ./package.json

EXPOSE 3001

CMD ["pnpm", "start"]

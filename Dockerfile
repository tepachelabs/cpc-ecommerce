FROM node:20.10.0-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json panda.config.ts postcss.config.cjs ./
RUN npm install

FROM node:20.10.0-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/styled-system ./styled-system
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
ARG NEXT_PUBLIC_POSTHOG_KEY=$NEXT_PUBLIC_POSTHOG_KEY
ARG POSTHOG_KEY=$POSTHOG_KEY
ARG LOGTAIL_SOURCE_TOKEN=$LOGTAIL_SOURCE_TOKEN

RUN npm run build

FROM node:20.10.0-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ARG NEXT_PUBLIC_POSTHOG_KEY=$NEXT_PUBLIC_POSTHOG_KEY
ARG POSTHOG_KEY=$POSTHOG_KEY
ARG LOGTAIL_SOURCE_TOKEN=$LOGTAIL_SOURCE_TOKEN

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js

USER nextjs

EXPOSE 80

ENV PORT 80

CMD ["npm", "start"]

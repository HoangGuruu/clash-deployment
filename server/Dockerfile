# ---- Stage 1: Install deps + Prisma Client ----
FROM node:18-alpine AS deps
WORKDIR /app

# Install OS deps
RUN apk add --no-cache openssl

# Copy package and install
COPY package.json package-lock.json* ./
RUN npm ci

# Copy Prisma schema
COPY prisma ./prisma

# Generate Prisma client
RUN npx prisma generate --schema=./prisma/schema.prisma

# ---- Stage 2: Build NestJS ----
FROM node:18-alpine AS builder
WORKDIR /app

COPY . .
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/prisma ./prisma

RUN npm run build

# ---- Stage 3: Production container ----
FROM node:18-alpine AS runner
WORKDIR /app

RUN apk add --no-cache openssl

ENV NODE_ENV=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=deps /app/node_modules/.prisma ./node_modules/.prisma

EXPOSE 3000

CMD ["node", "dist/index.js"]


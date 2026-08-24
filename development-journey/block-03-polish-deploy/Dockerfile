# Install dependencies
FROM oven/bun:1.1.17 as base

WORKDIR /app

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN bun install --frozen-lockfile

# Build the application
FROM base as builder

COPY . .
RUN bun run build

# Production image
FROM oven/bun:1.1.17 as runner

WORKDIR /app

# Copy built application
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Set the port for the application
ENV PORT 8080
EXPOSE 8080

# Start the application
CMD ["bun", "run", "start"]

# First Stage: Build the App
FROM node:22.11.0 AS builder

WORKDIR /app

COPY package*.json .

# Install dependencies npm
RUN npm install

COPY . .

# Build the application
RUN npm run web:build:server:dev-remote:ssr


# Second Stage: Setup the runtime
FROM node:22.11.0 AS runner

WORKDIR /app

COPY --from=builder /app/.output/ /app/.output/

EXPOSE 3000

# Start the application with node for the Nuxt SSR
CMD ["node", ".output/server/index.mjs"]
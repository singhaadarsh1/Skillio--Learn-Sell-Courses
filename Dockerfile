# Stage 1: Install production dependencies
FROM node:22-slim AS dependencies

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev


# Stage 2: Production runtime
FROM node:22-slim AS production

WORKDIR /app

ENV NODE_ENV=production

COPY --from=dependencies /app/node_modules ./node_modules
COPY --chown=node:node . .

USER node

EXPOSE 3000

CMD ["npm", "start"]
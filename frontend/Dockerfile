
# Stage 1: Build the React application
FROM node:22-slim AS builder

WORKDIR /app

# Copy dependency files first
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy frontend source code
COPY . .

# Build the production frontend
RUN npm run build


# Stage 2: Serve the frontend using Nginx
FROM nginx:alpine

# Remove default Nginx website configuration
RUN rm /etc/nginx/conf.d/default.conf

# Add our Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the React production build
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

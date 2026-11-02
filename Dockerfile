# 1. Use Node.js 22 as the base image
FROM node:22-slim

# 2. Set the working directory
WORKDIR /app

# 3. Copy dependency files first
COPY package*.json ./

# 4. Install production dependencies
RUN npm ci --omit=dev

# 5. Copy backend source code
COPY . .

# 6. Document backend port
EXPOSE 3000

# 7. Start the backend
CMD ["npm", "start"]
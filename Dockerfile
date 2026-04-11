# Stage 1: Build (You already have this part)
FROM node:20-alpine AS build
WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve using the image you ALREADY HAVE
FROM node:20-alpine
WORKDIR /app
# Install a tiny static file server (this is very light)
RUN npm install -g serve
COPY --from=build /app/dist /app/dist
EXPOSE 8080
CMD ["serve", "-s", "dist", "-l", "8080"]
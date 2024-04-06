# Use an official Node.js runtime as a parent image
FROM node:18-alpine AS builder

RUN apk add --no-cache libc6-compat

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package.json package-lock.json ./

# Copy all other project files to working directory
COPY . .

# if use Image
RUN npm i sharp

# Run the next build process and generate the artifacts
RUN npm run build

# Multi-stage build process
FROM node:18-alpine

# update and install latest dependencies, add dumb-init package
# add a non-root user
RUN apk update && apk upgrade && apk add dumb-init && adduser -D nextuser

# Set work dir as app
WORKDIR /app

# Copy the public folder from the project as this is not included in the build process
COPY --chown=nextuser:nextuser --from=builder /app/public ./public

# Copy the standalone folder inside the .next folder generated from the build process
COPY --chown=nextuser:nextuser --from=builder /app/.next/standalone ./

# Copy the static folder inside the .next folder generated from the build process
COPY --chown=nextuser:nextuser --from=builder /app/.next/static ./.next/static
# Set non-root user
USER nextuser

EXPOSE 3000

ENV HOST=0.0.0.0 PORT=3000 NODE_ENV=production

# Start the application
CMD ["dumb-init","node","server.js"]
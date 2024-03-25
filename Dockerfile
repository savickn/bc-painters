# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

ARG NODE_VERSION=18.18.1

FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.
# ENV NODE_ENV production

# choose folder on container
WORKDIR /usr/bc-app

# to copy package.json files
COPY package*.json ./

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci

# environment variables
ENV NODE_ENV production
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Run the application as a non-root user. 
# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs
# RUN mkdir .next
# RUN chown nextjs:nodejs .next
# USER nextjs

# Copy the rest of the source files into the image.
COPY . .

# build next app
RUN npm run build

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD npm run start



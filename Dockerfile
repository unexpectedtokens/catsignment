# Dockerfile
# Use Bun's official image
FROM oven/bun:1 AS base

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json bun.lockb ./
RUN bun install && bunx prisma generate && bunx prisma migrate dev --name init


# Copy the application source code
COPY . .


RUN bunx prisma generate


# Expose the port (default to 3000 if not specified)
ARG PORT=3000
ENV PORT=$PORT
EXPOSE $PORT

# Start the Bun server
CMD ["bun", "run", "start"]
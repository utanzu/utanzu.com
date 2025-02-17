# Stage 1: Install dependencies
FROM node:20-alpine AS deps

WORKDIR /app

# Copy package.json and yarn.lock for caching
COPY package.json yarn.lock ./

# Install dependencies (without devDependencies, if desired)
RUN yarn install

# Stage 2: Build the application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy all source code
COPY . .

# Copy package files and node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json
COPY --from=deps /app/yarn.lock ./yarn.lock

# Re-run yarn install to ensure the node_modules state file is generated
RUN yarn install

# Build the Next.js application
RUN yarn build

# Stage 3: Run the application
FROM node:20-alpine AS runner

WORKDIR /app

# Copy only the necessary production files from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose the port Next.js listens on
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]
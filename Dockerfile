# Dockerfile for Next.js frontend
FROM node:20-alpine

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Set working directory
WORKDIR /app

# Create non-root user and group
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Copy package files first for better caching
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci --only=production --silent && npm cache clean --force

# Copy all source code
COPY . .

# Ensure .next/cache exists and is writable
RUN mkdir -p /app/.next/cache && chown -R nextjs:nodejs /app/.next

# Change ownership of entire app
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Expose Next.js port
EXPOSE 3000

# Health check (adjust if you have a specific API route)
HEALTHCHECK --interval=30s --timeout=30s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:3000/api/health || wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start Next.js dev server (use 'npm start' for production)
CMD ["npm", "run", "dev"]

# Use Node.js image as base
FROM node:14

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Run migrations
RUN npx prisma migrate deploy --preview-feature

# Verify the presence of seed data files
RUN ls ./prisma/seed/

# Seed the database if the seed data files exist
RUN test -f ./prisma/seed/manufacturer-seed-data.json && test -f ./prisma/seed/brand-seed-data.json && npx prisma db seed --preview-feature || echo "Seed data files not found, skipping seed"

# Expose port 3000 (assuming your Nest.js app runs on this port)
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start:dev"]

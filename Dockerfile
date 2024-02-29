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

# Seed the database
RUN npx prisma db seed --preview-feature


# Expose port 3000 (assuming your Nest.js app runs on this port)
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start:dev"]
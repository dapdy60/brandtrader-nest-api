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

# Expose port 3000 (assuming your Nest.js app runs on this port)
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start:dev"]

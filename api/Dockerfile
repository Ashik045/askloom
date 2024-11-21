# Use the official Node.js 18 image as a base image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and yarn.lock
COPY package*.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the app's code
COPY . .

# Build the app
RUN yarn run build

# Expose the application port
EXPOSE 4000

# Start the app
CMD ["yarn", "start"]

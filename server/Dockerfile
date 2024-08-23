# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app
# Copy the rest of the application code excluding node_modules
COPY . .

# remove the node_modules folder
RUN rm -rf node_modules

# Install dependencies
RUN npm install



# Build the NestJS application
RUN npm run build

# Expose the application port
EXPOSE 6868

# Start the NestJS application
CMD ["npm", "run", "start:prod"]
#Use an official Node.js runtime as a parent image

FROM node:18-alpine as build

# Set the working directory inside the container
# Copy the package.json and package-lock.json files to the container
COPY package*.json /app/

# Set the working directory inside the container
WORKDIR /app

# Install the dependencies
RUN npm install

# Copy the remaining application code to the container
COPY . /app/


# Build the application
# RUN npm run build

# Expose port 3000
EXPOSE 3000

# # Start the application
#CMD ["npm", "start"]

# Use the official Nginx v1.21 image as the base image for serving the React app
# FROM nginx:alpine
# COPY nginx.conf /etc/nginx/conf.d/configfile.template
# # Copy the production-ready build from the build stage to the Nginx container
# COPY --from=build /app/build /usr/share/nginx/html

# Copy the Nginx configuration file to the container

# Expose port 80 for serving the React app
# EXPOSE 80
# CMD sh -c "envsubst '80' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
# Start the Nginx server
# CMD ["nginx", "-g", "daemon off;"]


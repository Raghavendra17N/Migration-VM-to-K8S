#Use an official Node.js runtime as a parent image

FROM node:18-alpine

# Set the working directory inside the container
# Copy the package.json and package-lock.json files to the container
COPY package*.json /app/react-todolist/react-todolist/

# Set the working directory inside the container
WORKDIR /app/react-todolist/react-todolist/


# Install the dependencies
RUN npm install

# Copy the remaining application code to the container
COPY . /app/react-todolist/react-todolist/

# Build the application
#RUN npm run build

# # Expose port 3000
EXPOSE 3000

# # Start the application
#CMD ["npm", "start"]

# Use the official Nginx v1.21 image as the base image for serving the React app
# FROM nginx:1.21

# # Copy the production-ready build from the build stage to the Nginx container
# COPY --from=react-build /app/build /usr/share/nginx/html

# # Copy the Nginx configuration file to the container
# COPY nginx.conf /etc/nginx/nginx.conf

# # Expose port 80 for serving the React app
# EXPOSE 80

# # Start the Nginx server
# CMD ["nginx", "-g", "daemon off;"]


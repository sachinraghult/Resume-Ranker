# Use the alpine image 
FROM node:alpine

# Set the workdir 
WORKDIR /app
# Add the node dependencies to the path.
ENV PATH /app/node_modules/.bin:$PATH

# Install dependencies.
COPY package.json ./
COPY package-lock.json ./
RUN npm install --force
RUN npm install react-scripts@3.4.1 -g --force

# Copy the code.
COPY . ./

# Build the public directory.
CMD npm run build

FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Install NestJS globally
RUN npm install -g @nestjs/cli

# Copy package.json and package-lock.json to working directory
COPY package*.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code to working directory
COPY . .

# Expose the default port for the NestJS application
EXPOSE 3000

# Start the NestJS application in development mode
CMD ["npm", "run", "start:dev"]

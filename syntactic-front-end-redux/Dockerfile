# # Stage 1 - the build process
# FROM node:7.10 as build-deps
# WORKDIR /usr/src/app
# COPY package.json package.lock ./
# RUN yarn
# COPY . ./
# RUN yarn build

# # Stage 2 - the production environment
# FROM nginx:1.12-alpine
# COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

# Stage 1 - the build process
FROM node:8
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./

RUN npm install --silent
# Copy app source code
COPY . .

# Expose port and start application
EXPOSE 3000
CMD ["npm", "start"]
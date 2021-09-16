FROM node:14-alpine AS development
ENV PATH /app/node_modules/.bin:$PATH
# Add a work directory
RUN mkdir -p /app
WORKDIR /app

COPY . .
RUN npm install
RUN npm install -g json-graphql-server

# Expose port
EXPOSE 3000
EXPOSE 5000
# Start the app
CMD [ "sleep", "infinity" ]
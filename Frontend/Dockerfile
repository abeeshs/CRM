# Dockerfile for React client



# Serve react client
FROM node:16-alpine

# Working directory be app
WORKDIR /app

### Copying build artifacts into the container
COPY build .

### Installing serve
RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", ".", "-p", "3000"]

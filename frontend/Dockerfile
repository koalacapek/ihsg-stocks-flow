# Build stage
FROM node:21 AS build

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Production stage
FROM node:21

RUN npm install -g serve

WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist ./

EXPOSE 3000

CMD ["serve", "-s", ".", "-l", "3000"]

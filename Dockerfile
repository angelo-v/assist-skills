FROM node:lts-slim AS build

WORKDIR /app

COPY . /app

RUN npm ci
RUN npm run build

FROM node:lts-alpine AS production

WORKDIR /app

COPY package*.json .

RUN npm ci --only=production
COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["node", "/app/dist/index.js"]

FROM node:18.19-alpine AS build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run && npm run build

FROM nginx:1.25.3-alpine-slim AS prod-stage

LABEL description="web image" version="v1.25.3-alpine-slim"

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80
EXPOSE 443

# CMD ["/bin/sh", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
ENTRYPOINT ["nginx","-g","daemon off;" ]

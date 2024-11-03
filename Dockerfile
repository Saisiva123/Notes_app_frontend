FROM --platform=linux/amd64 node:lts-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG REACT_APP_ENV

RUN if ["${REACT_APP_ENV}" = "production"]; \
        then npm run build:production; \
    elif [ "${REACT_APP_ENV}" = "staging" ]; \
        then npm run build:staging; \
    else \
            npm run build:dev; \
    fi

FROM --platform=linux/amd64 nginx:alpine 

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]

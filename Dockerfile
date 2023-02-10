FROM 323985919046.dkr.ecr.ap-southeast-1.amazonaws.com/dockerhub/node:12.22.0-alpine3.12
WORKDIR /app
COPY . /app
ENV PATH /app/node_modules/.bin:$PATH
ARG ENV=stg
EXPOSE 80
ENV NODE_OPTIONS="--abort-on-uncaught-exception --max-old-space-size=1024 --no-warnings"
ENV UV_THREADPOOL_SIZE=16
ENV ENV=${ENV}
CMD ["sh", "-c", "npm run start:${ENV}"]

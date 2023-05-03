FROM golang:1.20-alpine
RUN apk update
RUN apk add alpine-sdk
COPY ./go-app /app/go
WORKDIR /app/go
CMD ["go", "run", "main.go"]
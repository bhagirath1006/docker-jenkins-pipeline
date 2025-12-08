FROM openjdk:17-slim AS build
WORKDIR /app
COPY app.java .
RUN javac app.java

FROM openjdk:17-slim
WORKDIR /app
COPY --from=build /app/app.class .
CMD ["java", "app"]

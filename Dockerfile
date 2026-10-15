FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY LoopRideApp.java .

RUN javac -Xlint:all -d . LoopRideApp.java

ENV PORT=10000
EXPOSE 10000

# Run Java directly so container stop signals reach the JVM (no shell wrapper).
CMD ["java", "project.LoopRideApp", "10000"]

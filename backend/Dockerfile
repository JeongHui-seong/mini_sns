# 공식 OpenJDK 17 풀 버전 기반
FROM openjdk:17-jdk

# 작업 디렉토리 설정
WORKDIR /app

# 빌드된 JAR 파일 복사
COPY build/libs/*.jar app.jar

# 앱이 사용하는 포트 노출
EXPOSE 8080

# 애플리케이션 실행
ENTRYPOINT ["java", "-jar", "app.jar"]

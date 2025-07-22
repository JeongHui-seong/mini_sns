# mini_sns
## .devcontainer 대신 docker-compose.yml을 쓴 이유
- 팀원 전원이 VSCode를 사용 중.
- VSCode 전용 `.devcontainer`를 통해 Docker 환경을 구축할 수 있지만,  이는 VSCode 사용자에게만 해당.
- `docker-compose.yml`을 사용하면 IDE에 상관없이 동일한 개발 환경을 제공합니다.
- 따라서 협업과 환경 일관성을 위해  `docker-compose.yml` 기반 환경을 중심으로 학습하고 활용.

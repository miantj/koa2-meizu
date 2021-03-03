#!/usr/bin/env bash

# 删除旧的镜像
docker rmi payfornow/nodejs:1.0

# 编译
docker build -f ./Dockerfile.nodejs -t payfornow/nodejs:1.0 .

# 推送
docker push payfornow/nodejs:1.0

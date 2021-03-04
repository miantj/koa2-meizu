#!/usr/bin/env bash

# 删除旧的镜像
docker rmi minglyle/mz_koa_nodejs

# 编译
docker build -f ./Dockerfile.nodejs -t minglyle/mz_koa_nodejs .

# 推送
docker push minglyle/mz_koa_nodejs

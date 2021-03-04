#!/usr/bin/env bash

# 删除旧的镜像
docker rmi minglyle/mz_koa_mysql

# 编译
docker build -f ./Dockerfile.mysql -t minglyle/mz_koa_mysql .

# 推送
docker push minglyle/mz_koa_mysql

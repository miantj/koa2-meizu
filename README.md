# 魅族商场kao + docker + 原生js



一起学kao ，使用kao + docker开发部署魅族商场，web页面未使用任何依赖全部手写原生js与html。[传送门](http://8.129.114.82) 


(./meizu.gif)

## 安装依赖

```

npm install

```

### 运行服务

```

npm run dev

```

### 如果 Mysql 报错：Client does not support authentication protocol requested by server；

```

1、use mysql;

2、alter user 'root'@'localhost' identified with mysql_native_password by '密码';

3、flush privileges;

```

### docker 部分

```
<!-- 查看端口占有 -->
netstat -tlnp|grep 80

<!-- 拉取 MySQL 镜像 -->
docker pull mysql:latest

<!-- 创建mysql容器 -->
docker build ./Dockerfile.mysql -t mysql .

<!-- 运行mysql -->
docker run --name mysql-test -p 3366:3306 -e MYSQL_ROOT_PASSWORD=12345678 -d minglyle/mz_koa_mysql

<!-- -p 3306:3306 ：映射容器服务的 3306 端口到宿主机的 3366 端口，外部主机可以直接通过 宿主机ip:3306 访问到 MySQL 的服务。
MYSQL_ROOT_PASSWORD=12345678：设置 MySQL 服务 root 用户的密码。 -->

docker exec -it mysql-test /bin/bash

mysql -u root -p

<!-- Mysql 导入数据 -->
source mysql/mz.sql

<!-- 创建koa容器 -->
docker build -f ./Dockerfile.nodejs -t minglyle/mz_koa_nodejs .

<!-- 运行koa容器 -->
docker run --name koa -p 80:8080 -d minglyle/mz_koa_nodejs

```

mysql -uroot -p12345678 -e "create database db;"

## 我拉取 mysql 时候没有指定 mysql 版本号， 默认拉取的是 Mysql8

## 最新 mysql 8 的安全插件和本地的客户端不兼容, 需要做如下修改

```
use mysql

select user,host,plugin,authentication_string from user;

alter user 'root'@'%' identified by '12345678' password expire never;

alter user 'root'@'%' identified with mysql_native_password by '12345678';

flush privileges;

```

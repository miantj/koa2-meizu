# 此项目用于个人技术学习


## Mysql导入数据
```

source mz.sql

```

## 安装依赖
```

npm install

```

### 运行服务
```

npm run dev

```


### 如果Mysql报错：Client does not support authentication protocol requested by server；
```

1、use mysql;

2、alter user 'root'@'localhost' identified with mysql_native_password by '密码';

3、flush privileges;

```

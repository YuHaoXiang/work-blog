---
title: 文件名匹配-通配符使用
icon: file
---

## 通配符详细介绍
**测试数据**
```bash
[sectrend@localhost sca-compose]$ touch a a6.log abc.log ac.txt b c c5.txt x.log A
[sectrend@localhost sca-compose]$ ls
a  A  a6.log  abc.log  ac.txt  b  c  c5.txt  config  docker-compose.yml  java_data  x.log
```
### *
>代表任意多个字符

**例：查询以".log"结尾的文件**
```bash
[sectrend@localhost sca-compose]$ ll *.log
-rw-rw-r--. 1 sectrend sectrend 0 4月  24 10:06 a6.log
-rw-rw-r--. 1 sectrend sectrend 0 4月  24 10:06 abc.log
-rw-rw-r--. 1 sectrend sectrend 0 4月  24 10:06 x.log
```


### ?
> 代表任意单个字符  

**例：只查询a、b、c**
```bash
[sectrend@localhost sca-compose]$ ll ?
-rw-rw-r--. 1 sectrend sectrend 0 4月  24 10:06 a
-rw-rw-r--. 1 sectrend sectrend 0 4月  24 10:06 A
-rw-rw-r--. 1 sectrend sectrend 0 4月  24 10:06 b
-rw-rw-r--. 1 sectrend sectrend 0 4月  24 10:06 c
```
### []
>代表"["和"]"之间的某一个字符，比如[0-9]可以代表0-9之间的任意一个数字，[a-zA-Z]可以代表a-z和A-Z之间的任意一个字母，字母区分大小写。

**例:只查询字母文件**
```bash
[sectrend@localhost sca-compose]$ ll [a-zA-Z]
-rw-rw-r--. 1 sectrend sectrend 0 4月  24 10:06 a
-rw-rw-r--. 1 sectrend sectrend 0 4月  24 10:06 A
-rw-rw-r--. 1 sectrend sectrend 0 4月  24 10:06 b
-rw-rw-r--. 1 sectrend sectrend 0 4月  24 10:06 c
```
### ^
>表示匹配结果取反的意思，注意这个通配符必须要在[]中使用

**例：查询不是以".txt"结尾的文件**
```bash
[sectrend@localhost sca-compose]$ ls *[^txt]*   ## 前*遍历一层文件夹
a  A  a6.log  abc.log  ac.txt  b  c  c5.txt  docker-compose.yml  x.log

config:
minio  mysql  nginx

java_data:
db_sql  minio  mysql  powerjob-data  redis

```

### {}
>表示符合括号内包含的多个文件  

**例：查询".log"和".txt"结尾的文件**
```bash
[sectrend@localhost sca-compose]$ ll {*.log,*.txt}
-rw-rw-r--. 1 sectrend sectrend 0 4月  24 10:06 a6.log
-rw-rw-r--. 1 sectrend sectrend 0 4月  24 10:06 abc.log
-rw-rw-r--. 1 sectrend sectrend 0 4月  24 10:06 ac.txt
-rw-rw-r--. 1 sectrend sectrend 0 4月  24 10:06 c5.txt
-rw-rw-r--. 1 sectrend sectrend 0 4月  24 10:06 x.log
```
::: warning 注意
"."这个符合比较特殊，如果匹配的条件加上了该符合那么说明查询结果文件就包含带"."的文件,例如前面的"^"的例子，如果我这样查询"ll *.[^txt]*",那么结果就不一样
```bash
[sectrend@localhost sca-compose]$ ll *.[^txt]*
-rw-rw-r--. 1 sectrend sectrend    0 4月  24 10:06 a6.log
-rw-rw-r--. 1 sectrend sectrend    0 4月  24 10:06 abc.log
-rw-rw-r--. 1 sectrend sectrend 4578 4月  24 10:05 docker-compose.yml
-rw-rw-r--. 1 sectrend sectrend    0 4月  24 10:06 x.log
```
:::

### 删除操作
**例：删除a、b、c和以.txt结尾的文件**
```bash
[sectrend@localhost sca-compose]$ rm -f {[abc],*.txt}
[sectrend@localhost sca-compose]$ ls
A  a6.log  abc.log  config  docker-compose.yml  java_data  x.log

```

## 实例
::: info demo
*: 匹配文件名中的任何字符串，包括空字符串。  
?: 匹配文件名中的任何单个字符。  
[...]: 匹配[ ]中所包含的任何字符。
[!...]:  匹配[ ]中非感叹号！之后的字符。和^的效果一样  
:::

- 5*  5开头的所有字符串

- *5  5结尾的所有字符串

- *5? 以5为倒数第二个字符的字符串

- [0-9]    所有以数字的字符

- [1,2]         1或者2

- [!0-9]        不是数字的字符

- ls /etc/[!a-n]*.conf 列出/etc/目录中不是以字母a到n开头的，并且以.conf结尾的文件

- ls /etc/[a-n]*.conf 列出/etc/目录中以字母a到n开头的，并且以.conf结尾的文件

- ls /bin/[ck]* 列出以 c或k开头的文件名
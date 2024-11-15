---
title: MySQL脚本
catalog: mysql
---

## 生成批量清理表sql语句
```sql
select CONCAT('truncate TABLE ',table_schema,'.',TABLE_NAME, ';') from INFORMATION_SCHEMA.TABLES where table_schema in ('数据库1','数据库2');
```

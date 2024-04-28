---
title: 替换Jar包中class文件
icon: jar
category: Java
---

**如何在不重新打包的情况下，替换Jar包中的class文件**
```bash 
# 获取jar包中，class文件所在的具体路径
jar -tvf *.jar | grep *.class(*，根据自己的jar包和类名替换)
# 替换了想要替换的class文件
jar -xvf *.jar */*/*/*.class
# 将替换后的class文件，压缩进jar包
jar -uvf *.jar  */*/*/*.class
```

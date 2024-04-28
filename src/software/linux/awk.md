---
title: awk
icon: linux
category: Linux
tag:
  - shell
---


# awk
awk 是一种处理文本文件的语言，是一个强大的文本分析工具。  
## 语法
```bash 
awk options 'pattern {action}' file
```
::: info 选项参数说明
- options：是一些选项，用于控制 awk 的行为。   
- pattern：是用于匹配输入数据的模式。如果省略，则 awk 将对所有行进行操作。  
- {action}：是在匹配到模式的行上执行的动作。如果省略，则默认动作是打印整行。  
:::

::: info options选项参数说明 
- -F <分隔符> 或 --field-separator=<分隔符>： 指定输入字段的分隔符，默认是空格。使用这个选项可以指定不同于默认分隔符的字段分隔符。
- -v <变量名>=<值>： 设置 awk 内部的变量值。可以使用该选项将外部值传递给 awk 脚本中的变量。
- -f <脚本文件>： 指定一个包含 awk 脚本的文件。这样可以在文件中编写较大的 awk 脚本，然后通过 -f 选项将其加载。
- -v 或 --version： 显示 awk 的版本信息。
- -h 或 --help： 显示 awk 的帮助信息，包括选项和用法示例。 
:::

## 常见的 awk 命令用法
打印整行：  
```bash
awk '{print}' file
```   
打印特定列：  
```bash
awk '{print $1, $2}' file
```  
使用分隔符指定列：  
```bash
awk -F',' '{print $1, $2}' file
```  
打印行数：  
```bash
awk '{print NR, $0}' file
```    
打印行数满足条件的行：    
```bash
awk '/pattern/ {print NR, $0}' file
```  
计算列的总和：  
```bash
awk '{sum += $1} END {print sum}' file
```  
打印最大值：  
```bash
awk 'max < $1 {max = $1} END {print max}' file
```    
格式化输出：  
```bash
awk '{printf "%-10s %-10s\n", $1, $2}' file
```  
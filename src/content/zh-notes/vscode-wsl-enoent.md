---
title: "问题记录：VS Code 无法连接 WSL 的排查"
description: "记录一次 VS Code Remote WSL 报错 `spawn C:\\WINDOWS\\System32\\wsl.exe ENOENT` 的定位与解决过程。"
date: "2025-11-04"
draft: false
featured: false
tags: ["WSL", "VS Code", "Troubleshooting"]
readingTime: "3 分钟"
category: "问题记录"
---

## 问题现象

在 VS Code 中连接 WSL 时，出现如下报错：

```text
spawn C:\WINDOWS\System32\wsl.exe ENOENT
```

这个错误的核心含义不是 WSL 本身一定坏掉了，而是 VS Code 期望访问的 `wsl.exe` 路径不可用。

## 我当时的判断

既然报错里明确指出找不到 `C:\WINDOWS\System32\wsl.exe`，那排查重点就应该放在两件事上：

- `wsl.exe` 是否真的存在
- 该路径是否能被系统正确访问

## 一种直接可用的处理方式

如果系统中的 `wsl.exe` 实际位于其他位置，可以通过创建符号链接的方式，把默认路径补出来。

### 操作步骤

1. 以管理员身份打开命令提示符 `CMD`
2. 执行命令，把默认路径映射到实际的 `wsl.exe` 位置

```cmd
mklink "C:\WINDOWS\System32\wsl.exe" "C:\Program Files\wsl\wsl.exe"
```

3. 重启 VS Code 后重新连接 WSL

## 这条记录的意义

这类问题的价值不在于命令本身，而在于排查思路：

- 先读懂错误信息在说什么
- 再确认工具实际依赖的路径
- 最后用最小改动恢复预期路径

很多环境问题并不复杂，复杂的是没有先把错误信息翻译成可以验证的假设。

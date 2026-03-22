---
title: "面向项目记录的 Markdown 工作流"
description: "建立一套可重复的内容工作流，让项目总结与学习笔记都能通过 Git 仓库直接发布。"
date: "2026-03-18"
draft: false
featured: false
tags: ["工作流", "文档"]
readingTime: "4 分钟"
role: "工作流设计"
duration: "初始化阶段"
stack: ["Markdown", "Git", "VS Code"]
outcome: "降低了内容发布摩擦"
---

## 为什么要这样设计

很多个人博客无法持续更新，不是因为没有内容，而是因为发布流程太重。每次写完还要
登录后台、手动排版、调整展示，久而久之就很难保持频率。

## 我的目标

我希望未来发一篇内容只需要四步：

1. 新建一个 Markdown 文件
2. 填写 frontmatter
3. 在 VS Code 中完成写作
4. 提交并部署

## 这样做的好处

- 草稿管理简单
- 内容天然可迁移
- 变更历史清晰
- 维护成本低

## 未来可补充的能力

- 为 frontmatter 增加校验
- 自动优化图片资源
- 为每次提交生成预览环境

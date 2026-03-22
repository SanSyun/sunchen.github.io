---
title: "ZYNQ PS 端 Linux 启动文件制作流程"
description: "结合 Vitis、U-Boot 与 Linux 内核配置，梳理 ZYNQ 平台从设备树生成到 BOOT.BIN、zImage 落地的完整启动文件制作流程。"
date: "2025-10-17"
draft: false
featured: true
tags: ["ZYNQ", "Embedded Linux", "Boot", "Device Tree"]
readingTime: "12 分钟"
category: "嵌入式 Linux"
---

## 背景

在 ZYNQ 平台上移植 Linux 时，最容易卡住的往往不是单个工具的使用，而是启动链路中多个文件的配合关系：
`BOOT.BIN`、`system-top.dtb`、`zImage` 到底各自从哪里来、谁依赖谁、版本如何保持一致。

这篇笔记把我实际走通的一套流程整理成可复用步骤，目标是帮助自己下次快速回忆，也让读者能看清整个启动链路。

## 准备环境

我当时使用的环境如下：

- `Vitis 2024.2 Classic`
- `Vivado 2024.2`
- Ubuntu 虚拟机或 WSL
- `arm-xilinx-linux-gnueabi-` 交叉编译工具链

启动介质使用一张带两个分区的 SD 卡：

- `boot` 分区：`FAT32`，存放 `BOOT.BIN`、`zImage`、`system-top.dtb`
- `rootfs` 分区：`ext4`，存放根文件系统

## 启动链路先理清

在实际动手前，先明确三个核心文件：

- `BOOT.BIN`：通常包含 `FSBL + bitstream + U-Boot`
- `system-top.dtb`：描述硬件拓扑和外设信息
- `zImage`：Linux 内核镜像

如果只记操作步骤，很容易在版本错配或文件更新后找不到问题。把这三者的来源和关系理解清楚，后续调试会轻松很多。

## 第一步：生成设备树

设备树建议与当前工具链版本保持一致。我当时选择的是 `2024.2` 对应版本的 Xilinx 设备树源码。

### 基本流程

1. 下载与工具版本对应的设备树源码。
2. 在 Vitis 中导入设备树源码目录。
3. 基于设计好的 `xsa` 创建 `device_tree` 平台工程。
4. 编译工程，得到定制化设备树输出。

![设备树源码版本选择](/images/notes/zynq/device-tree-source.png)

生成后通常会看到以下几个关键文件：

- `pcw.dtsi`：PS 端外设相关配置
- `zynq-7000.dtsi`：ZYNQ-7000 通用设备树片段
- `system-top.dts`：当前平台的顶层设备树
- `pl.dtsi`：如果有 PL 侧设计，通常还会生成这一项

![设备树工程编译结果](/images/notes/zynq/device-tree-build.png)

### 一个常见坑：PHY ID

如果开发板启动后网络不通，一个高概率问题就是设备树里的 PHY 配置不匹配。
PHY ID 取决于硬件上 PHY strap 引脚的焊接方式，范围一般在 `0~7`。这时需要检查 `pcw.dtsi` 中 `gem0` 节点的 `reg` 配置是否与硬件一致。

这个问题的经验价值在于：设备树不是“能编过就行”，它必须准确反映板级硬件。

## 第二步：编译 U-Boot 并生成 `u-boot.elf`

我使用的是与工具版本对应的 `u-boot-xlnx` 源码。这里最关键的不是“下载源码”，而是让 U-Boot 真正认识你自己的设备树和启动参数。

### 关键改动

需要重点处理以下几件事：

1. 在 defconfig 中把默认设备树改成 `system-top`
2. 把 `system-top` 加入 `CONFIG_OF_LIST`
3. 在 `arch/arm/dts/` 中加入前面生成的设备树文件
4. 修改该目录下 `Makefile`，让 `system-top.dtb` 被编译出来
5. 补齐启动环境变量，包括：
   - 内核加载地址
   - 设备树加载地址
   - SD 卡启动脚本
   - `bootargs`

![U-Boot 环境变量配置示意](/images/notes/zynq/uboot-env.png)

### 我的理解

这一阶段本质上是在做两件事：

- 告诉 U-Boot “我要加载哪个硬件描述文件”
- 告诉 U-Boot “我要怎么从 SD 卡把 Linux 拉起来”

如果前者不对，设备树会错；如果后者不对，内核文件虽然存在，也未必能被正确启动。

## 第三步：生成 `BOOT.BIN`

`BOOT.BIN` 的生成通常在 Vitis 侧完成，核心输入通常是：

- `fsbl.elf`
- `design_1_wrapper.bit`
- `u-boot.elf`

顺序也很重要，因为它基本对应启动执行顺序。我的实践里会先创建一个 `FSBL` 工程，必要时打开调试日志，确保启动异常时能看到足够信息。

![创建 BOOT.BIN 的配置界面](/images/notes/zynq/bootbin-create.png)

### 这里值得记住的点

- 如果硬件设计更新了，记得同步更新 `xsa`
- 更新后重新编译 `fsbl`
- 再重新打包 `BOOT.BIN`

否则很容易出现“文件能生成，但板子行为不对”的情况。

## 第四步：编译 Linux 内核，得到 `zImage`

内核部分的逻辑与 U-Boot 很像：

1. 下载与当前版本匹配的 `linux-xlnx`
2. 把 `system-top.dtb` 和其他相关设备树片段放到内核对应的 `dts` 目录
3. 修改 `Makefile`，让 `system-top.dtb` 参与构建
4. 使用合适的 `defconfig` 配置工程
5. 编译整个内核

完成后即可得到 `zImage`。

## 上板启动时我关注什么

当三个关键文件都生成后，我会把它们放入 SD 卡的 `boot` 分区，然后重点检查：

- 串口是否有 FSBL 输出
- U-Boot 是否成功执行默认启动脚本
- 内核是否成功解压并进入挂载根文件系统阶段
- 网络、串口等基础外设是否工作正常

![SD 卡 boot 分区中的启动文件](/images/notes/zynq/sd-boot-files.png)

如果启动异常，我一般按下面顺序排查：

1. `BOOT.BIN` 是否由最新文件重新打包
2. 设备树是否与硬件一致
3. `bootargs` 是否正确
4. SD 卡分区与文件名是否匹配

## 一个实用建议：把重复流程脚本化

这套流程里最耗时间的不是单次配置，而是硬件或设备树更新后反复重做。比较推荐把 U-Boot、内核和产物拷贝脚本化，至少统一下面几件事：

- U-Boot 编译
- Linux 编译
- 产物拷贝到统一输出目录

这样每次有修改时，只需要跑一次脚本即可完成更新。

## 小结

这篇笔记最重要的不是记住某条命令，而是建立一个稳定认知：

- `BOOT.BIN` 负责前期启动
- `system-top.dtb` 负责描述硬件
- `zImage` 负责真正启动 Linux 内核

只要这三部分的版本、内容和启动参数一致，ZYNQ 上的 Linux 启动链路就会清晰很多。

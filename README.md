# 寓言学堂

用故事理解复杂概念 — 一个完全离线的中文学习应用

[![Expo](https://img.shields.io/badge/Expo-54-blue.svg)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React%20Native-0.81-blue.svg)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 简介

「寓言学堂」是一个完全离线的中文学习应用，通过寓言故事帮助用户理解抽象概念。每个概念都包含：

- **寓言故事** — 用生动的故事场景解释抽象概念
- **通俗解释** — 用日常语言让概念更易懂
- **正式定义** — 学术性的准确定义
- **隐喻映射** — 故事元素与理论概念的对应关系
- **类比边界** — 理解概念的适用范围和局限性
- **现实案例** — 正面和反面案例加深理解
- **知识测验** — 3 道选择题巩固学习

## 功能特性

- 6 个学科领域：经济学、心理学、管理学、计算机科学、哲学、金融学
- 47+ 个精心编写的寓言概念
- 完全离线运行，无需网络
- 学习记录、收藏、错题本
- 每日推荐概念
- 温暖现代的 UI 设计

## 截图

<div style="display: flex; gap: 10px;">
  <img src="screenshots/home.png" width="200" alt="首页" />
  <img src="screenshots/story.png" width="200" alt="寓言故事" />
  <img src="screenshots/explanation.png" width="200" alt="概念解读" />
  <img src="screenshots/quiz.png" width="200" alt="知识测验" />
</div>

## 快速开始

### 环境要求

- Node.js 18+
- npm 或 yarn
- Expo CLI
- iOS Simulator 或 Android Emulator（或 Expo Go App）

### 安装

```bash
# 克隆仓库
git clone https://github.com/YOUR_USERNAME/fable-learning-app.git
cd fable-learning-app

# 安装依赖
npm install

# 启动开发服务器
npx expo start
```

### 运行

```bash
# iOS 模拟器
npx expo start --ios

# Android 模拟器
npx expo start --android

# 使用 Expo Go 扫码运行
npx expo start
```

## 项目结构

```
fable-learning-app/
├── app/                    # 页面路由（Expo Router）
│   ├── index.tsx          # 首页
│   ├── fields/            # 学科列表
│   ├── concept/[id]/      # 概念详情
│   ├── favorites.tsx      # 收藏
│   ├── records.tsx        # 学习记录
│   ├── wrong-answers.tsx  # 错题本
│   └── settings.tsx       # 设置
├── src/
│   ├── components/        # UI 组件
│   ├── data/              # 概念数据（JSON）
│   ├── lib/               # 数据库操作
│   ├── theme/             # 设计令牌
│   ├── types/             # TypeScript 类型
│   └── utils/             # 工具函数
├── assets/                # 图标、图片
└── package.json
```

## 添加新概念

1. 编辑对应的 JSON 文件（如 `src/data/concepts/economics.json`）
2. 参考 `src/data/concepts/_template.json` 的结构
3. 运行验证脚本：

```bash
npm run validate
npm run stats
```

## 技术栈

- **框架**: Expo SDK 54 + React Native 0.81
- **路由**: Expo Router 6（文件式路由）
- **数据库**: expo-sqlite 16（本地 SQLite）
- **语言**: TypeScript 5.9
- **图标**: @expo/vector-icons (Ionicons)

## 设计理念

融合三种设计风格：
- **Apple HIG** — 清晰的层级、留白
- **Material 3** — 色调系统、颜色角色
- **HarmonyOS** — 超圆角、柔和温暖

## 贡献

欢迎贡献！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 致谢

- 所有概念的寓言故事均为原创
- 图标来自 [Ionicons](https://ionic.io/ionicons)
- 设计灵感来自 Apple、Google Material、华为 HarmonyOS

---

如果觉得有用，请给个 Star ⭐

# Meimate C-Side v3.0

客戶端預約系統，提供線上預約、會員管理、消費紀錄等功能。

## 技術棧

- **Nuxt.js 2** (Vue 2)
- **Tailwind CSS 3**
- **SweetAlert2** (全域主題化)
- **AOS** 動畫
- **GraphQL API** (via axios)

## 快速開始

```bash
# 安裝依賴
npm install

# 開發模式
npm run dev

# 建置
npm run build
npm run start
```

## 設計系統

### 品牌色
| Token | Hex | 用途 |
|-------|-----|------|
| `gmb-orange-500` | #FF6B2C | 主色 (按鈕、icon、重點) |
| `gmb-orange-600` | #e55e25 | Hover 態 |
| `gmb-orange-100` | - | 淺色背景 |

### 元件規範
- **按鈕**: `rounded-full` pill 型態
- **卡片**: `rounded-2xl` + `border border-gray-100`
- **彈窗**: `rounded-2xl` + `shadow-lg`
- **輸入框**: `rounded-full` + `focus:border-gmb-orange-400`

### 全域 SweetAlert2 主題
通知彈窗透過 `static/style/components/swal-theme.css` 全域統一:
- 橘色品牌 icon 色
- 圓角彈窗容器
- 品牌色 pill 按鈕
- 統一字體與間距

## 專案結構

```
├── api/              # API 請求層
├── components/       # 共用元件
├── layouts/          # 佈局
├── pages/            # 頁面路由
│   ├── member/       # 會員區
│   │   ├── appointment/  # 預約流程
│   │   ├── info/         # 個人資料
│   │   └── ...
│   ├── password/     # 密碼設定
│   └── login.vue     # 登入
├── plugins/          # Nuxt 插件
├── static/
│   └── style/
│       ├── main.css          # CSS 入口
│       └── components/
│           └── swal-theme.css  # Swal 全域主題
├── store/            # Vuex Store
└── tailwind.config.js
```

## v3.0 powered by BOS

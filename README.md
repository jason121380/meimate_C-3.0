# Meimate C-Side v3.0

客戶端預約系統，提供線上預約、會員管理、消費紀錄等功能。

## 技術棧

| 技術 | 版本 | 用途 |
|------|------|------|
| Nuxt.js | 2.x | 框架 (Vue 2) |
| Tailwind CSS | 3.x | 樣式系統 |
| SweetAlert2 | - | 通知彈窗 (全域主題化) |
| AOS | - | 滾動動畫 |
| VeeValidate | - | 表單驗證 |
| Axios + GraphQL | - | API 通訊 |

## 🎨 設計系統

> **完整設計規範請參閱 [THEME.md](./THEME.md)**

### 快速一覽
| 元素 | 規範 |
|------|------|
| 品牌色 | `#FF6B2C` (`gmb-orange-500`) |
| 按鈕 | `rounded-full` pill 型態 |
| 卡片 | `rounded-2xl` + `border-gray-100` |
| 輸入框 | `rounded-full` + 橘色 focus |
| 彈窗 | `rounded-2xl` + `shadow-lg` |
| 字體 | Inter + Noto Sans TC |

### SweetAlert2 全域主題
所有通知彈窗透過 `static/style/components/swal-theme.css` 自動套用品牌樣式，無需手動設定。

## 快速開始

```bash
npm install
npm run dev     # 開發伺服器
npm run build   # 建置生產版本
npm run start   # 啟動生產版本
```

## 專案結構

```
├── api/                    # API 請求層 (GraphQL)
├── components/             # 共用 Vue 元件
│   ├── BindLineModal.vue
│   ├── CancelAppointmentModal.vue
│   ├── LogoutModal.vue
│   ├── PasswordEditModal.vue
│   ├── StatusModal.vue
│   └── ...
├── layouts/                # Nuxt 佈局
├── pages/                  # 頁面路由
│   ├── login.vue
│   ├── password/
│   ├── lineRedirect.vue
│   └── member/
│       ├── index.vue           # 首頁
│       ├── appointment/        # 預約流程
│       │   ├── index.vue       # 選擇設計師
│       │   ├── selectService.vue
│       │   ├── selectDate.vue
│       │   └── check/_id.vue   # 預約確認
│       ├── info/               # 個人資料
│       ├── setting/            # 偏好設定
│       ├── consumption.vue     # 消費紀錄
│       ├── ticket/             # 票券
│       └── ...
├── plugins/                # Nuxt 插件
├── store/                  # Vuex Store
├── static/
│   ├── style/
│   │   ├── main.css            # CSS 入口
│   │   └── components/
│   │       └── swal-theme.css  # ⭐ Swal 全域主題
│   ├── icons/
│   └── images/
├── THEME.md                # ⭐ 設計主題規範
├── CLAUDE.md               # AI 開發指引
├── MEMORY.md               # 開發變更記錄
└── tailwind.config.js      # Tailwind 配置
```

## v3.0 powered by BOS

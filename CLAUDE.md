# Meimate 客戶預約系統 (C-Side) v3.0

## 專案概述
Meimate 客戶端預約系統，提供會員預約、消費紀錄、票券管理等功能。

## 技術棧
- **框架**: Nuxt.js 2 (Vue 2)
- **樣式**: Tailwind CSS 3 + 自訂 CSS
- **API**: GraphQL (透過 axios)
- **UI 互動**: SweetAlert2 (全域主題化)、AOS 動畫
- **驗證**: VeeValidate

## 🎨 設計主題
> **詳細規範請參閱 [THEME.md](./THEME.md)**

- **品牌主色**: `gmb-orange-500` (#FF6B2C)
- **按鈕**: `rounded-full` (pill)
- **卡片**: `rounded-2xl` + `border-gray-100`
- **彈窗**: 全域 CSS 自動套用品牌樣式
- **輸入框**: `rounded-full` + 橘色 focus ring

## 重要檔案

| 類型 | 路徑 | 說明 |
|------|------|------|
| 主題規範 | `THEME.md` | 完整設計語言文件 |
| Tailwind 配置 | `tailwind.config.js` | 色彩/圓角/陰影 token |
| 全域 CSS | `static/style/main.css` | CSS 入口 |
| Swal 主題 | `static/style/components/swal-theme.css` | SweetAlert2 全域樣式 |
| API 攔截器 | `api/index.js` | 錯誤通知 + token 管理 |
| 權限攔截 | `plugins/permisstion.js` | 路由守衛 |

## 執行方式
```bash
npm install
npm run dev    # 開發模式
npm run build  # 建置
```

## v3.0 powered by BOS

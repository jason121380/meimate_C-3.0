# Meimate 客戶預約系統 (C-Side) v3.0

## 專案概述
Meimate 客戶端預約系統，提供會員預約、消費紀錄、票券管理等功能。

## 技術棧
- **框架**: Nuxt.js 2 (Vue 2)
- **樣式**: Tailwind CSS 3
- **API**: GraphQL (透過 axios)
- **UI 互動**: SweetAlert2、AOS 動畫

## 品牌設計系統

### 核心色彩
- **品牌主色**: `gmb-orange-500` (#FF6B2C)
- **品牌暗色**: `gmb-orange-600` (#e55e25)
- **品牌淺色**: `gmb-orange-100` (用於背景/hover)

### 設計規範
- **按鈕**: `rounded-full` (pill shape)，品牌橘色
- **卡片**: `rounded-2xl`，白底 + `border-gray-100`
- **彈窗**: `rounded-2xl` + `shadow-lg`
- **輸入框**: `rounded-full`，focus 時顯示橘色邊框 (`focus:border-gmb-orange-400`)

### 全域 SweetAlert2 主題
- 樣式定義在 `static/style/components/swal-theme.css`
- 透過 `static/style/main.css` 引入
- 所有 Swal 通知自動套用：橘色 icon、圓角彈窗、品牌色按鈕
- **不需要在每個 Swal.fire() 中手動設定 iconColor/customClass**

### StatusModal 與自訂彈窗
- 所有自訂 modal 元件統一使用 `rounded-2xl` 彈窗
- 確認按鈕: `bg-gmb-orange-500 rounded-full`
- 取消按鈕: `bg-gray-100 text-gray-600 rounded-full`
- 關閉按鈕: 簡潔 SVG X icon + `text-gray-400 hover:text-gray-600`

## 重要檔案路徑
- `tailwind.config.js` - Tailwind 配置 (含 gmb-orange 色彩)
- `static/style/main.css` - 全域 CSS 入口
- `static/style/components/swal-theme.css` - SweetAlert2 全域主題
- `plugins/permisstion.js` - 路由權限攔截
- `api/index.js` - API 攔截器 (含錯誤通知)

## 執行方式
```bash
npm install
npm run dev
```

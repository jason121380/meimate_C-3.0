# Meimate C-Side 開發記錄

## 2026-03-28 UI 現代化更新

### 已完成項目

#### 品牌色系統一
- 全站從 `bg-mm-accent` / `#1A1A2E` / `#FEB401` 遷移至 `gmb-orange-500` (#FF6B2C)
- Tailwind 配置已新增 `gmb-orange` 色階 (100-900)

#### SweetAlert2 全域主題化
- 新增 `static/style/components/swal-theme.css` 全域 CSS
- 所有 Swal icon、按鈕、彈窗圓角透過 CSS 自動套用
- 已更新檔案：
  - `api/index.js` (5 處通知)
  - `plugins/permisstion.js` (2 處登入攔截)
  - `pages/member/index.vue` (LINE 綁定/登出)
  - `pages/member/appointment/index.vue` (門市未開放)
  - `pages/lineRedirect.vue` (LINE 綁定成功)
  - `components/Navigation.vue` (功能提示/登出)
  - `components/PasswordEditModal.vue` (編輯成功)

#### 自訂 Modal 統一化
- `LogoutModal.vue` → 橘色按鈕 + rounded-2xl
- `CancelAppointmentModal.vue` → 橘色按鈕 + rounded-2xl
- `StatusModal.vue` → 橘色按鈕
- `BindLineModal.vue` → 橘色按鈕
- `LineModal.vue` → 橘色按鈕
- `PasswordEditModal.vue` → 全面主題化 (圓角輸入框+橘色按鈕)

#### 頁面更新
- **首頁 (index.vue)**: 現代化重構，品牌配色
- **登入頁 (login.vue)**: 主題更新
- **設定密碼頁 (password/index.vue)**: 全面主題化，移除 header/logo
- **預約成功頁 (check/_id.vue)**: 大打勾 icon + 橘色狀態標籤
- **修改個人資料 (info.vue)**: 移除電腦版 Breadcrumb
- **備註欄位**: 預設為空
- **登入失敗**: 錯誤訊息改為「手機號碼或密碼錯誤，請按忘記密碼收取簡訊驗證」

#### LINE 綁定通知
- 所有「立即綁定」按鈕從綠色 (#06C755) 改為橘色主題

### 已知待處理
- `@tailwindcss/line-clamp` 已內建 v3.3+，可從 plugins 移除
- Vue 警告：`pages/member/index.vue` 部分屬性未定義

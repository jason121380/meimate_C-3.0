# Meimate C-Side 開發記錄

## 設計主題
> 完整規範請參閱 **[THEME.md](./THEME.md)**
> 品牌色: `gmb-orange-500` (#FF6B2C) | 按鈕: `rounded-full` | 卡片: `rounded-2xl`

---

## 2026-03-28 UI 現代化 (已完成)

### SweetAlert2 全域主題化
- 新增 `static/style/components/swal-theme.css`
- 透過 CSS 全域自動套用，不需在每個 `Swal.fire()` 手動設定
- 已更新所有檔案中的 Swal 呼叫

### 已更新的通知彈窗 (Swal)
| 檔案 | 通知類型 |
|------|---------|
| `api/index.js` | Token 過期、API 錯誤、500 錯誤 (×5) |
| `plugins/permisstion.js` | 登入攔截 (×2) |
| `pages/member/index.vue` | LINE 綁定成功、登出確認/成功 |
| `pages/member/appointment/index.vue` | 門市未開放 (×2) |
| `pages/lineRedirect.vue` | LINE 綁定成功 |
| `components/Navigation.vue` | 功能提示、登出確認/成功 |
| `components/PasswordEditModal.vue` | 編輯成功 |

### 已更新的自訂 Modal 元件
| 元件 | 變更 |
|------|------|
| `LogoutModal.vue` | 橘色按鈕 + rounded-2xl 彈窗 |
| `CancelAppointmentModal.vue` | 橘色按鈕 + rounded-2xl 彈窗 |
| `PasswordEditModal.vue` | 全面主題化 (圓角輸入框+橘色按鈕) |
| `BindLineModal.vue` | 綠色→橘色按鈕 |
| `LineModal.vue` | 綠色→橘色按鈕 |

### 已更新的頁面
| 頁面 | 變更 |
|------|------|
| `pages/member/index.vue` | 首頁現代化重構 |
| `pages/password/index.vue` | 全面主題化、移除 Header/Logo |
| `pages/member/appointment/check/_id.vue` | 大打勾 icon、橘色狀態標籤、備註預設空 |
| `pages/member/info.vue` | 移除電腦版 Breadcrumb |
| `pages/member/setting/edit.vue` | 全面主題化 (搜尋框/門市/設計師卡片) |
| `pages/member/appointment/selectService.vue` | 修復底部操作欄縫隙 |
| `api/index.js` | 登入失敗文字改為「手機號碼或密碼錯誤，請按忘記密碼收取簡訊驗證」|

### 文件更新
- `THEME.md` — 新建完整設計主題規範
- `CLAUDE.md` — 更新專案資訊
- `README.md` — 更新技術棧與結構
- `MEMORY.md` — 本開發記錄

### 已知待處理
- `@tailwindcss/line-clamp` 已內建 v3.3+，可從 plugins 移除
- 部分頁面 (消費紀錄、卡券) 如需統一風格，依循 THEME.md 規範

# 名留客戶預約系統

## 專案狀態 (2026/03 更新)
目前已全面進行 UI/UX 現代化改版，導入 Tailwind CSS 的自定義樣式 (`gmb-orange-500`)，並將核心操作元件全面圓角化 (`rounded-full`)。
更詳細的樣式守則請參考 `CLAUDE.md`，開發歷史紀錄請參考 `MEMORY.md`。

# 打包
npm run generate

## api 使用方式

```javascript
// ssr asyncData
$api.xxx();
// spa mounted
// 帶入需要回傳的key值 例: 'name, cellphone, gender'
this.api.xxx();
```

## font-awesome 引入方式

```javascript
// nuxt.config.js
fontawesome: {
  components: 'fa',
  proIcons: {
    // 種類
    solid: ['xxx', 'xxx'],
    regulat: ['xxx', 'xxx'],
    light: ['xxx']
  }
}
```

```html
<!-- use example -->
<i class="bi bi-person"/>
```

## 全域 Loading example

```javascript
// ssr
store.dispatch("loading/isLoading", true);
store.dispatch("loading/isLoading", false);

// spa
this.$store.dispatch("loading/isLoading", true);
this.$store.dispatch("loading/isLoading", false);
```

## 小範圍 Loading example

```javascript
// ssr
store.dispatch("itemLoading/isLoading", true);
store.dispatch("itemLoading/isLoading", false);

// spa
this.$store.dispatch("itemLoading/isLoading", true);
this.$store.dispatch("itemLoading/isLoading", false);
```

## 操作 Cookies 方法

```javascript
// ssr
async asyncData({ app }) {
  const token = app.$cookies.get('customeraccesstoken')
}
// spa
mounted() {
  this.$cookieMethods.getToken()
  this.$cookieMethods.setToken('xxx')
  this.$cookieMethods.removeToken()
}
```

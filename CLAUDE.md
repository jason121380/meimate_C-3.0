# Meimate Customer Project Guidelines

## Core Principles
1. **Design System**: UI relies on Tailwind CSS with a customized configuration (`tailwind.config.js`). It uses a specific brand palette heavily centered around `gmb-orange-500` (#FF6B2C) and minimal, highly-spaced modern aesthetics.
2. **Global Components Style**: 
   - Primary headers and critical UI elements use `gmb-orange-500`. 
   - Button shapes, list items, and UI inputs standardise on a `rounded-full` (pill shape) or `rounded-2xl` look to create a soft, welcoming feel.
   - Avoid aggressive drop-shadows; favor soft offsets, high-contrast flat styling, and ample whitespace (`bg-white` on `bg-gray-50/50` wrappers).
3. **Framework Context**: Nuxt.js 2 (Vue 2 runtime). Vuex for state management. Components often rely heavily on computed properties reacting to `$store.state`.
4. **PWA & Mobile Ready**: Always account for iOS Safe Areas (`env(safe-area-inset-bottom)`) in fixed elements (e.g. `BottomTabBar`). Ensure max-width constraining on all core screens (`max-w-[768px] mx-auto px-5`) to avoid edge-bleeding.

## Common Best Practices
- When modifying/creating pages, bypass deep nested `<MemberGlobalCard>` wrappers if they strip out responsive paddings. Prefer defining the structure directly with clean flex-columns and `px-5` wrappers.
- Use `this.api` endpoints for all data fetching.
- Ensure correct data-binding behavior using `ValidationObserver` and `ValidationProvider` in forms.

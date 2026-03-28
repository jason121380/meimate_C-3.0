<template>
  <section>
    <ul class="breadcrumb breadcrumb-separatorless !hidden lg:!flex font-semibold">
      <li class="breadcrumb-item">
        <div @click="$router.push('/member')">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 text-bs-gray-500">
            <path
              d="M11 2.375L2 9.575V20.575C2 21.175 2.4 21.575 3 21.575H9C9.6 21.575 10 21.175 10 20.575V14.575C10 13.975 10.4 13.575 11 13.575H13C13.6 13.575 14 13.975 14 14.575V20.575C14 21.175 14.4 21.575 15 21.575H21C21.6 21.575 22 21.175 22 20.575V9.575L13 2.375C12.4 1.875 11.6 1.875 11 2.375Z"
              fill="currentColor" />
          </svg>
        </div>
      </li>
      <li class="breadcrumb-item">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 text-bs-gray-500">
          <path
            d="M11.2657 11.4343L15.45 7.25C15.8642 6.83579 15.8642 6.16421 15.45 5.75C15.0358 5.33579 14.3642 5.33579 13.95 5.75L8.40712 11.2929C8.01659 11.6834 8.01659 12.3166 8.40712 12.7071L13.95 18.25C14.3642 18.6642 15.0358 18.6642 15.45 18.25C15.8642 17.8358 15.8642 17.1642 15.45 16.75L11.2657 12.5657C10.9533 12.2533 10.9533 11.7467 11.2657 11.4343Z"
            fill="currentColor" />
        </svg>
      </li>
      <li class="breadcrumb-item text-bs-gray-500 text-sm">{{ title }}</li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: () => false
    }
  },
  name: 'Breadcrumb'
}
</script>

<template>
  <section v-if="false">
    <div class="relative bg-white w-full border-none">
      <div
        class="flex justify-between items-center bg-white border-b border-gray-100 py-3 px-4">
        <div class="flex items-center">
          <div @click="$router.push('/member')" class="flex gap-1 pl-1">
            <img :src="'/logo.png'" alt="logo" class="w-32 h-9 object-contain">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HomeHeader'
}
</script>

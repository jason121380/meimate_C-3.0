<template>
  <section>
    <nav class="flex items-center justify-center" aria-label="Progress">
      <ol role="list" class="flex items-center">
        <li v-for="(step, index) in data" :key="index" class="relative " :class="{ 'pr-8 sm:pr-20': index + 1 < data }">
          <div v-if="index + 1 < data" class="absolute inset-0 flex items-center">
            <div :class="{ 'bg-gray-200': currentStep <= index + 1, 'bg-mm-accent': currentStep > index + 1 }"
              class="h-0.5 w-full "></div>
          </div>
          <div :class="{
            'border-2 border-gray-200 bg-white': currentStep < index + 1,
            'border-2 border-mm-accent bg-white': currentStep === index + 1,
            'bg-mm-accent': currentStep > index + 1
          }"
            class="relative flex h-8 w-8 items-center justify-center rounded-full ">
            <span v-if="currentStep <= index + 1"
              :class="{ 'bg-mm-accent': currentStep === index + 1 || currentStep > index + 1, 'bg-transparent': currentStep < index + 1 }"
              class="h-2.5 w-2.5 rounded-full "></span>
            <svg v-if="currentStep > index + 1" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                clip-rule="evenodd" />
            </svg>
          </div>
        </li>
      </ol>
    </nav>
  </section>
</template>

<script>
export default {
  props: {
    data: {
      type: Number
    },
    currentStep: {
      type: Number,
      default: 1
    }
  },
  name: 'Progress'
}
</script>

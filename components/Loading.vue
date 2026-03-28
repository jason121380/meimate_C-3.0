<template>
  <div>
    <transition name="fade">
      <div v-if="isLoading" class="w-full h-full fixed left-0 top-0 bg-[rgba(35,45,78,0.9)] z-40">
        <div class="w-1.5 h-1.5 bg-bs-warning-900 rounded-full absolute left-16 top-24 animate-reverse-float"></div>
        <div class="w-[3px] h-[3px] rounded-full bg-white absolute left-[45%] top-24 animate-float"></div>
        <div class="absolute right-14 top-12 animate-reverse-float z-10">
          <div
            class="w-0 h-0 border-b-[#FEB401] rotate-[50deg] border-b-[20px] border-r-transparent border-r-[10px] border-l-transparent border-l-[10px] z-20">
          </div>
        </div>
        <div class="absolute left-14 bottom-16 animate-reverse-float">
          <div
            class="w-0 h-0 border-b-[#FEB401] rotate-[65deg] border-b-[25px] border-r-transparent border-r-[12.5px] border-l-transparent border-l-[12.5px] z-20">
          </div>
        </div>
        <div class="absolute right-10 bottom-36 animate-reverse-float">
          <div
            class="w-0 h-0 border-b-[#232D4E] rotate-[65deg] border-b-[25px] border-r-transparent border-r-[12.5px] border-l-transparent border-l-[12.5px] z-20">
          </div>
        </div>

        <img src="/images/loading/top-circle.png" class="absolute right-0 top-0 max-w-[50%]">
        <img src="/images/loading/bottom-circle.png" class="absolute left-0 bottom-5 max-w-[60%]">

        <img src="/images/loading/deyer.svg" alt="吹風機" class="absolute left-3 top-[22%] animate-reverse-float">

        <div class="absolute right-[25%] top-[39%] flex justify-center items-center animate-float">
          <img src="/images/loading/scissors-left.svg" class="h-9 animate-cut rotate-[-30deg] translate-x-1.5">
          <img src="/images/loading/scissors-right.svg" class="h-8 rotate-[-30deg] -translate-x-5 -translate-y-1">
        </div>

        <img src="/images/loading/triangle.svg" alt="空心三角形" class="absolute bottom-32 left-1/2 animate-float">

        <div
          class="w-64 h-64 border-2 absolute left-[calc(50%-128px)] top-[20%] border-[#FEB401] rounded-[48%] animate-reverse-spin-slow after:content-[''] after:absolute after:left-0 after:top-0 after:w-3.5 after:h-3.5 after:bg-white after:rounded-full after:m-[30px]">
        </div>
        <div
          class="w-56 h-56 border-2 absolute left-[calc(50%-112px)] top-[22%] border-white rounded-full animate-spin-slow after:content-[''] after:absolute after:left-0 after:top-0 after:w-2.5 after:h-2.5 after:bg-[#ACE6FF] after:rounded-full after:m-[26px]">
        </div>

        <div class="absolute left-[calc(50%-68.8px)] top-[33%] flex">
          <span
            class="animate-floatText-1 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-t from-[#FFBB36] to-[rgba(254,255,206,0.55)]">L</span>
          <span
            class="animate-floatText-2 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-t from-[#FFBB36] to-[rgba(254,255,206,0.55)]">o</span>
          <span
            class="animate-floatText-3 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-t from-[#FFBB36] to-[rgba(254,255,206,0.55)]">a</span>
          <span
            class="animate-floatText-4 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-t from-[#FFBB36] to-[rgba(254,255,206,0.55)]">d</span>
          <span
            class="animate-floatText-5 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-t from-[#FFBB36] to-[rgba(254,255,206,0.55)]">i</span>
          <span
            class="animate-floatText-6 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-t from-[#FFBB36] to-[rgba(254,255,206,0.55)]">n</span>
          <span
            class="animate-floatText-7 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-t from-[#FFBB36] to-[rgba(254,255,206,0.55)]">g</span>
        </div>

        <div class="w-1 h-1 rounded-full bg-white absolute left-20 top-[55%] animate-shine"></div>
        <div class="w-1 h-1 rounded-full bg-bs-warning-900 absolute right-16 top-[60%] animate-shine-yellow"></div>

        <div class="w-[3px] h-[3px] bg-white rounded-full absolute right-10 top-[65%] animate-reverse-float"></div>
        <div class="w-1 h-1 bg-white rounded-full absolute right-10 bottom-1/4 animate-float"></div>
        <div class="w-[3px] h-[3px] bg-white rounded-full absolute right-20 bottom-40 animate-float"></div>
        <div class="w-3.5 h-3.5 bg-bs-warning-900 rounded-full absolute right-16 bottom-24 animate-float"></div>
        <div class="w-[5px] h-[5px] bg-white rounded-full absolute left-10 bottom-1/2 animate-reverse-float"></div>
        <div class="w-1 h-1 bg-white rounded-full absolute left-32 bottom-14 animate-float"></div>
        <div class="w-5 h-5 bg-mm-accent rounded-full absolute left-40 bottom-20 animate-reverse-float"></div>
        <div class="w-2.5 h-2.5 bg-bs-warning-900 rounded-full absolute left-52 bottom-52 animate-reverse-float"></div>
        <div class="w-5 h-5 bg-[rgba(254,180,1,0.5)] rounded-full absolute left-14 bottom-[30%] animate-float"></div>
        <div class="w-[5px] h-[5px] bg-white rounded-full absolute right-12 top-[30%] animate-float"></div>
        <div class="w-[3px] h-[3px] bg-bs-warning-900 rounded-full absolute right-10 top-[37%] animate-reverse-float">
        </div>

        <div class="absolute left-32 bottom-40 animate-float">
          <div class="w-4 h-1 bg-white rotate-[65deg]"></div>
          <div class="w-4 h-1 bg-white rotate-[-40deg] -translate-y-1"></div>
        </div>
        <div class="absolute right-32 bottom-24 animate-reverse-float">
          <div class="w-4 h-1 bg-white rotate-[65deg]"></div>
          <div class="w-4 h-1 bg-white rotate-[-40deg] -translate-y-1"></div>
        </div>

      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  computed: {
    isLoading() {
      return this.$store.state.loading.isLoading
    }
  }
}
</script>

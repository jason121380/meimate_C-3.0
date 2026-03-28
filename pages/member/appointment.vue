<template>
  <section class="w-full max-w-[768px] mx-auto pb-16">
    <HeaderTitle v-if="renderComponent" :display="display" :title="merchantName" :showClose="true" />
    <nuxt-child @inCheck="forceRerender" />
  </section>
</template>

<script>
export default {
  name: 'appointment',
  head() {
    return {
      meta: [
        {
          name: 'theme-color',
          content: '#ffffff'
        }
      ]
    }
  },
  data() {
    return {
      renderComponent: true,
      display: true
    }
  },
  computed: {
    merchantName() {
      try {
        return JSON.parse(window.localStorage.getItem('merchant'))?.name || '立即預約'
      } catch {
        return '立即預約'
      }
    }
  },
  methods: {
    forceRerender() {
      this.display = false
      this.renderComponent = false;
      this.$nextTick(() => {
        this.renderComponent = true;
      });
    },
    checkArrowDisplay() {
      if (
        this.$route.query.arrowDisplay !== undefined && this.$route.name === "member-appointment"
      ) {
        const isArrowDisplayForLine = JSON.parse(localStorage.getItem("merchant"))?.isArrowDisplayForLine;
        this.display = isArrowDisplayForLine;
      } else if (this.$route.name === "appointment-line") {
        this.display = false
      }
    },
  },
  mounted() {
    this.checkArrowDisplay();
  },
  watch: {
    $route({ name }) {
      if (name === "member-appointment" || name === "appointment-line") {
        this.checkArrowDisplay();
      } else {
        this.display = true;
      }
    }
  }
}
</script>

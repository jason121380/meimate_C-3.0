<template>
  <div class="card w-full">
    <div
      @click="isShowDetail = !isShowDetail"
      class="card-header !p-4 flex justify-between"
    >
      <div class="!my-0">預約詳細</div>
      <span v-if="isShowDetail" class="text-mm-accent">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.5657 11.3657L16.75 15.55C17.1642 15.9643 17.8358 15.9643 18.25 15.55C18.6642 15.1358 18.6642 14.4643 18.25 14.05L12.7071 8.50716C12.3166 8.11663 11.6834 8.11663 11.2929 8.50715L5.75 14.05C5.33579 14.4643 5.33579 15.1358 5.75 15.55C6.16421 15.9643 6.83579 15.9643 7.25 15.55L11.4343 11.3657C11.7467 11.0533 12.2533 11.0533 12.5657 11.3657Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span v-else class="text-mm-accent">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.4343 12.7344L7.25 8.55005C6.83579 8.13583 6.16421 8.13584 5.75 8.55005C5.33579 8.96426 5.33579 9.63583 5.75 10.05L11.2929 15.5929C11.6834 15.9835 12.3166 15.9835 12.7071 15.5929L18.25 10.05C18.6642 9.63584 18.6642 8.96426 18.25 8.55005C17.8358 8.13584 17.1642 8.13584 16.75 8.55005L12.5657 12.7344C12.2533 13.0468 11.7467 13.0468 11.4343 12.7344Z"
            fill="currentColor"
          />
        </svg>
      </span>
    </div>
    <transition name="slide-fade">
      <div v-show="isShowDetail" class="card-body !py-5 !px-[1.625rem] overflow-hidden">
        <div class="flex justify-between">
          <div>
            <p v-formatDate="'time'" class="text-mm-accent text-xl font-extrabold">{{ orderDate }}</p>
          </div>
        </div>
        <div class="mt-2">
          <p class="font-semibold text-sm truncate">{{ merchantName }}</p>
        </div>
        <div class="mt-2 flex justify-between flex-wrap">
          <div class="text-gray-dark font-bold text-xl flex">
            <p class="break-all">{{ designerName }}</p>
          </div>
          <div class="flex gap-4 items-center">
            <div
              @click="windowAssign(`http://maps.google.com/?q=${address}`)"
              class="text-mm-accent w-5 h-5 object-contain"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 16"
                class="w-5 h-5 pt-[0.0125rem]"
              >
                <path
                  d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"
                />
              </svg>
            </div>
            <a :href="telLink" class="text-mm-accent object-contain">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-5 h-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
        <div class="grid grid-cols-3 mt-3">
          <div class="col-span-1">
            <p class="text-xs text-gray font-bold">備註</p>
          </div>
          <div class="col-span-2">
            <p class="text-xs break-all">{{ remarkForCustomer }}</p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: "OrderDetailCollapse",
  data() {
    return {
      isShowDetail: true,
      merchantName: "",
      designerName: "",
      telLink: "",
      remarkForCustomer: "",
      orderDate: '',
      address: "",
    };
  },
  methods: {
    windowAssign(url) {
      window.open(url, '_blank')
    },
  },
  mounted() {
    const { address, name, tel } = JSON.parse(
      window.localStorage.getItem("merchant")
    );
    const remark = this.$store.state.appointmentData.remarkForCustomer;
    const service = this.$store.state.appointmentData.designerServiceIds;
    this.address = address || "";
    this.merchantName = name || "";
    this.telLink = `tel:+886-${tel.slice(1)}`;
    this.orderDate = this.$route.query.fromLINE === 'true' ? this.$store.state.appointmentData.cacheTimeStamp : this.$store.state.appointmentData.timestamp;
    this.designerName = this.$store.state.appointmentData.designerName;
    this.remarkForCustomer = `${service
      .map((item) => item.name)
      .join("、")} ${remark}`;
  },
};
</script>
<style>
.slide-fade-enter-active {
  transition: none;
}

.slide-fade-leave-active {
  transition: none;
}

.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 1;
}
</style>

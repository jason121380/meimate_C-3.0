<template>
  <section>
    <div v-if="isShowNavigation" class="w-full fixed bottom-0 left-0 bg-white shadow-[inset_0_2px_2px_rgba(0,0,0,0.2)]">
      <div class="w-[76px] h-[76px] absolute left-1/2 -translate-x-1/2 bottom-3 rounded-full overflow-hidden">
        <button ref="book" @click="$router.push('/member/appointment')" data-mdb-ripple="true"
          data-mdb-ripple-color="light" class="w-full h-full text-white text-sm bg-mm-accent">
          <p v-pre>立即</p>
          <p v-pre>預約</p>
        </button>
      </div>
      <ul class="flex">
        <li class="text-center w-[20%]" v-for="(item, i) in menuList" :key="i"
          :class="{ 'ml-auto': i === 2, hidden: i > 3 }">
          <button @click="item.label === '登出' ? logOut() : $router.push(item.path)" data-mdb-ripple="true"
            data-mdb-ripple-color="dark" class="py-3 w-full">
            <i class="text-xl" :class="item.icon"/>
            <p class="text-sm">{{ item.label }}</p>
          </button>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { removeToken } from "@/plugins/cookies";
export default {
  name: "Navigation",
  data() {
    return {
      menuList: [
        { label: "首頁", path: "/member", icon: "bi bi-house-door" },
        {
          label: "服務紀錄",
          path: "/member/consumption",
          icon: "bi bi-list-ul",
        },
        {
          label: "我的卡券",
          path: "/member/ticket",
          icon: "bi bi-ticket",
        },
        {
          label: "入金紀錄",
          path: "/member/addValue",
          icon: "bi bi-coin",
        },
        { label: "會員資料", path: "/member/info", icon: "bi bi-person" },
        {
          label: "偏好設定",
          path: "/member/setting",
          icon: "bi bi-heart",
        },
        { label: "登出", icon: "bi bi-box-arrow-right" },
      ],
      bakmenuList: [
        { label: "首頁", path: "/member", icon: "bi bi-house-door" },
        {
          label: "服務紀錄",
          path: "/member/consumption",
          icon: "bi bi-list-ul",
        },
        {
          label: "我的卡券",
          path: "/member/ticket",
          icon: "bi bi-ticket",
        },
        {
          label: "入金紀錄",
          path: "/member/addValue",
          icon: "bi bi-coin",
        },
        {
          label: "紅利點數",
          path: "/member/customerBonus",
          icon: "bi bi-p-circle",
        },
        { label: "會員資料", path: "/member/info", icon: "bi bi-person" },
        {
          label: "偏好設定",
          path: "/member/setting",
          icon: "bi bi-heart",
        },
        { label: "登出", icon: "bi bi-box-arrow-right" },
      ],
      merchantId: "",
      isDisplay: {},
    };
  },
  methods: {
    showAlert() {
      this.$swal.fire({
        icon: "warning",
        title: `<h3 class="text-xl font-semibold text-gray-900">功能尚未開放<br>Coming Soon</h3>`,
        background: "#fff",
        iconColor: "#FF6B2C",
        timer: 1500,
        showConfirmButton: false,
        customClass: { popup: '!rounded-2xl !shadow-lg' }
      });
    },
    handleDisplay(newValue) {
      this.isDisplay = newValue;
      this.menuList = this.bakmenuList;
      let hideList = [];
      let needHandleDisplayList = new Map([
        ["ServiceRecord", "服務紀錄"],
        ["TicketRecord", "我的卡券"],
        ["WalletRecord", "入金紀錄"],
        ["BonusRecord", "紅利點數"],
      ]);

      needHandleDisplayList.forEach((value, key) => {
        if (!this.isDisplay[key]) hideList.push(value);
      });
      this.menuList = this.menuList.filter(
        (item) => !hideList.includes(item.label)
      );
    },
    logOut() {
      this.$swal
        .fire({
          html: `<p class="text-lg text-gray-900 font-bold">確定要登出嗎?</p>`,
          showCancelButton: true,
          confirmButtonText: "登出",
          confirmButtonColor: "#FF6B2C",
          cancelButtonText: "取消",
          customClass: {
            popup: '!rounded-2xl !shadow-lg',
            confirmButton: '!rounded-full !px-8',
            cancelButton: '!rounded-full !px-8'
          }
        })
        .then((result) => {
          if (result.isConfirmed) {
            removeToken();
            window.localStorage.clear();
            this.$swal
              .fire({
                icon: "success",
                title: '<h3 class="text-xl font-semibold text-gray-900">會員已登出</h3>',
                background: "#fff",
                iconColor: "#FF6B2C",
                timer: 1500,
                showConfirmButton: false,
                customClass: { popup: '!rounded-2xl !shadow-lg' }
              })
              .then(() => {
                this.$router.push("/");
                setTimeout(() => {
                  location.reload();
                }, 100);
              });
          }
        });
    },
  },
  computed: {
    isShowNavigation() {
      return this.$route.path !== '/' &&
        this.$route.path !== '/login' &&
        this.$route.path !== '/login/' &&
        this.$route.path !== '/password' &&
        this.$route.path !== '/password/' &&
        this.$route.path !== '/member' &&
        this.$route.path !== '/member/appointment' &&
        this.$route.path !== '/member/appointment/selectDate' &&
        this.$route.path !== '/member/appointment/selectService';
    },
  },
  watch: {
    "$store.state.customerSidePageDisplay.isDisplay"(newValue) {
      this.handleDisplay(newValue);
    },
    async $route() {
      const merchant = JSON.parse(localStorage.getItem("merchant"));
      this.merchantId = merchant ? JSON.stringify(merchant?.id) : "";
      if (
        this.$router.currentRoute.path.includes("/appointment/selectDate") ||
        this.$router.currentRoute.path.includes(
          "/member/appointment/selectService"
        )
      ) {
        this.$refs.book?.classList.add("!bg-mm-accent");
        this.$refs.book?.setAttribute("disabled", true);
      } else {
        this.$refs.book?.classList.remove("!bg-mm-accent");
        this.$refs.book?.removeAttribute("disabled");
      }
    },
  },
};
</script>

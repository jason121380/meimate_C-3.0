<template>
  <section id="firstPos" class="">
    <HeaderTitle :title="'會員卡'" :display="false"/>
    <div
      class="w-full max-w-[768px] mx-auto lg:mt-[9.5rem] overflow-y-auto mt-4"
    >
      <Breadcrumb :title="'會員卡'" />
      <img
        class="shadow-md bg-cover bg-no-repeat object-cover w-full aspect-video rounded-lg"
        :src="cardInfo && cardInfo.membershipImage ? cardInfo.membershipImage : '/images/member/card-bg.webp'"
        alt=""
      />
      <div class="card mt-3 p-4 flex gap-3">
        <div class="grid grid-cols-12">
          <div class="col-span-4">姓名：</div>
          <div class="col-span-8">{{ name }}</div>
        </div>
        <div class="grid grid-cols-12">
          <div class="col-span-4">電話：</div>
          <div class="col-span-8">{{ cellphone }}</div>
        </div>
        <template v-if="cardInfo">
          <div class="grid grid-cols-12">
            <div class="col-span-4">名稱：</div>
            <div class="col-span-8">{{ cardInfo.membershipName }}</div>
          </div>
          <div class="grid grid-cols-12">
            <div class="col-span-4">有效期限：</div>
            <div v-formatDate="'date'" class="col-span-8">
              {{ cardInfo.expiryDate ? cardInfo.expiryDate : "永久會籍" }}
            </div>
          </div>
          <div class="grid grid-cols-12">
            <div class="col-span-4">說明：</div>
            <div class="col-span-8">{{ cardInfo.membershipComment }}</div>
          </div>
        </template>
        <div v-else class="grid grid-cols-12">
          <div class="col-span-4">會員狀態：</div>
          <div class="col-span-8">一般會員</div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "membershipCard-index",
  head() {
    return {
      meta: [
        {
          hid: "theme-color", name: "theme-color",
          content: "#ffffff",
        },
      ],
    };
  },
  data() {
    return {
      display: true,
      cardInfo: null,
      name: "",
      cellphone: "",
    };
  },
  async mounted() {
    if (
      this.$route.query.arrowDisplay !== undefined &&
      this.$route.name === "member-membershipCard"
    ) {
      const isArrowDisplayForLine = JSON.parse(
        localStorage.getItem("merchant")
      )?.isArrowDisplayForLine;
      this.display = isArrowDisplayForLine;
    }
    this.$store.dispatch("loading/isLoading", true);
    await this.getData();
  },
  methods: {
    async getData() {
      const merchant = JSON.parse(localStorage.getItem("merchant"));
      try {
        const [personalData, membership] = await Promise.all([
          this.api.getCustomerPersonalData("name cellphone"),
          this.api.customerMembershipRecord(merchant.id),
        ]);
        this.name = personalData.data.getCustomerPersonalData.name;
        this.cellphone = personalData.data.getCustomerPersonalData.cellphone;
        const membershipCard =
          membership.data.customerMembershipRecord.unExpired;
        if (membershipCard.length) {
          const [cardData] = membershipCard;
          this.cardInfo = cardData;
        }
        this.$store.dispatch("loading/isLoading", false);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

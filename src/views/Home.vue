<template>
  <div class="home">
    <van-button type="primary">防抖按钮</van-button>
    <van-button type="primary">节流按钮</van-button>
  </div>
</template>

<script>
import { getRescueList } from "@/api/advisory";
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  // components: {
  //   HelloWorld
  // },
  mounted() {
    this.$alertShow("戳我一下");
    getRescueList().then((res) => {
      let vdata = this.$common.deepCopy(res.data);
      console.log(vdata);
    });
  }
};
</script>

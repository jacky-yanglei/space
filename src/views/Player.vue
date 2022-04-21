<template>
  <div class="content">
      <router-view/>
      <banner></banner>
      <VideoComponent></VideoComponent>
      <TextComponent></TextComponent>
      <ChooseEvent></ChooseEvent>
      <ChatDetaileComponent></ChatDetaileComponent>
      <WaitDMComponent></WaitDMComponent>
      <ColletComponent></ColletComponent>
      <ChatVideoComponent></ChatVideoComponent>
  </div>
</template>
<script>
import banner from "./banner.vue";
import WaitDMComponent from "../components/WaitDMComponent.vue";
import VideoComponent from "../components/VideoComponent.vue";
import TextComponent from "../components/TextComponent.vue";
import ChooseEvent from "../components/ChooseEvent.vue";
import ChatDetaileComponent from "../components/ChatDetaileComponent.vue";
import ColletComponent from "../components/ColletComponent.vue";
import ChatVideoComponent from "../components/ChatVideoComponent.vue";
import Websocket from "../ws/ws.js"
export default {
  components: {
    banner,
    VideoComponent,
    TextComponent,
    ChatDetaileComponent,
    ChooseEvent,
    WaitDMComponent,
    ColletComponent,
    ChatVideoComponent,
  },
  data() {
    return {
      authCode: null,
    }
  },
  created() {
  },
  mounted() {
    // console.log(this)
    // alert(this.GetQueryString('code'));
    new Websocket(this.$route.params.id, this, this.GetQueryString('code'));
    // let data = {"msg": "故事开始了", "img":["http://123213","http://123213"], "speaker": "eleven", "group": "public"};
    // this.$store.commit('receivedChat', data);
    // let replyData = {"msg": "故事开始了", "img":["http://123213","http://123213"], "speaker": "player", "group": "public"};
    // this.$store.commit('receivedChat', replyData);
    // console.log(this)
  },
  methods: {
    GetQueryString(name) {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    },
  }
}
</script>
<style lang="less" scoped>
.content {
  padding-bottom: 52px;
  max-width: 750px;
  margin: 0 auto;
}
</style>

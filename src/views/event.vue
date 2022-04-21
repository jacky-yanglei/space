<template>
  <div class="page">
    <div class="bg">
      <div class="content">

      <div class="level">
        事件列表
      </div>
        <div class="chat-item">
          <img src="../assets/chat-icon.png" alt="" />

          <div class="msg">
           第一幕：《乌克兰作妖，美国撑腰》
          </div>
        </div>

        <div class="chat-item">
          <img src="../assets/chat-icon.png" alt="" />

         <div class="msg">
           第二幕：《普京拍案，大喊出兵》
          </div>
        </div>

      
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input: "",
    };
  },
  methods: {
    push() {
      this.$router.push("/script/register/" + this.input);
    },
  },
};
</script>

<style lang="less"  scoped>
.bg {
  background-image: url("../assets/watch.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 200px;
  height: calc(100vh - 52px);
  overflow-y: auto;
}

.content {
  backdrop-filter: blur(4px);
  background: rgba(113, 199, 213, 0.12);
  overflow: hidden;
  min-height: 100%;
}

.chat-item {
  display: flex;
  border: 1px solid rgba(113, 199, 213, 1);
  max-width: 90%;
  margin: auto;
  margin-bottom: 20px;
  border-radius: 12px;

  img {
    width: 50px;
    padding: 10px;
  }

  .msg{
    width: calc(100% - 80px);
    color: #fff;
    padding-top: 10px;
    }

 
}

.level{
    color: rgb(113, 199, 213);
    font-size: 24px;
    padding-top: 20px;
    padding-left: 20px;
    margin-bottom: 40px;
    button{
    float: right;
    margin-right: 20px;
    width: 120px;
    padding: 12px;
    }
}
</style>
<template>
  <div class="page">
    <div class="bg">
      <div class="content">
        <div class="level">访问等级:7</div>
        <div v-for="(value, name, index) in $store.state.chat" :key="index" class="chat-item" @click="goDetail(name)">
          <div class="icon" :class="hasChat(name)?'has-chat':''">
            <img src="../assets/chat-icon.png" alt="" />
          </div>
          <div class="msg">
            <div class="name">{{ name == 'public'?'Eleven':name }}</div>
            <div class="text">{{ value.chatList.length !== 0?value.chatList[value.chatList.length-1].msg:'' }}</div>
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
  computed: {
    hasChat() {
      return (grounp) => {
        let length = 0;
        length += this.$store.state.chat[grounp].chatList.filter((elem) => {
          return !elem.seed;
        }).length;
        if (this.$store.state.replyChat[grounp] && this.$store.state.replyChat[grounp].chat) {
          length++;
        }
        if (this.$store.state.hasAnswer[grounp]) {
          length++;
        }
        return length;
      }
    },
  },
  methods: {
    push() {
      this.$router.push("/script/register/" + this.input);
    },
    goDetail(name) {
      this.$store.state.chatDetailModel = true;
      this.$store.state.chatDetailShowName = name;
      if (this.$store.state.chat[name]) {
        this.$store.state.chat[name].chatList.map(e => {
          e.seed = true;
        });
      }
      this.$store.state.chat = Object.assign({}, this.$store.state.chat);
    },
  },
};
</script>

<style lang="less" scoped>
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
  margin-bottom: 20px;

  .icon {
    &.has-chat {
      position: relative;
      &::before {
        content: "";
        position: absolute;
        width: 10px;
        height: 10px;
        background-color: rgb(194, 9, 9);
        border-radius: 50%;
        z-index: 1;
        right: 5px;
        top: 5px;
      }
    }
    img {
      width: 50px;
      padding: 10px;
    }
  }

  .msg {
    border-bottom: 1px solid rgba(93, 110, 112, 1);
    width: calc(100% - 80px);
  }

  .name {
    color: rgb(113, 199, 213);
    margin-bottom: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .text {
    color: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.level {
  color: rgb(113, 199, 213);
  font-size: 24px;
  padding-top: 20px;
  padding-left: 20px;
  margin-bottom: 20px;
}
</style>
<template>
  <div>
    <ul class="process">
      <li @click="push" :class="hasChat?'has-chat':''">
        <router-link :to="{ path: '/chat/' + this.$route.params.id }">
          聊天
        </router-link>
      </li>
      <li @click="push">
        <router-link @click="push" :to="{ path: '/event/' + this.$route.params.id }">
          事件
        </router-link>
      </li>
      <li @click="push">
        <router-link @click="push" :to="{ path: '/thread/' + this.$route.params.id }">
          线索
        </router-link>
      </li>
      <li @click="push">
        <router-link @click="push" :to="{ path: '/others/' + this.$route.params.id }">
          专家团
        </router-link>
      </li>
    </ul>
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
      let length = 0;
      for (let key in this.$store.state.chat) {
        length += this.$store.state.chat[key].chatList.filter((elem) => {
          return !elem.seed;
        }).length
      }
      for (let key in this.$store.state.chat) {
        if (this.$store.state.replyChat[key] && this.$store.state.replyChat[key].chat) {
          length++;
        }
      }
      for (let key in this.$store.state.hasAnswer) {
        if (this.$store.state.hasAnswer[key]) {
          length++;
        }
      }
      return length;
    },
  },
  methods: {
    push() {
      this.$store.state.chatDetailModel = false;
    },
  },
};
</script>

<style lang="less" scoped>
div {
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;
}

.process {
  overflow: hidden;
  display: flex;
  margin: 0 auto;
  max-width: 750px;
  li {
    width: 25%;
    line-height: 50px;
    text-align: center;
    list-style: none;
    cursor: pointer;
    position: relative;
    a {
      display: block;
      border: 1px solid rgba(93, 110, 112, 1);
      text-decoration: none;
       color: rgb(93, 110, 112);
    }
  }
}

::v-deep {
  .router-link-active {
    background: rgba(113, 199, 213, 1);
    color: #fff;
  }
}
.has-chat {
  &::before {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: rgb(194, 9, 9);
    border-radius: 50%;
    z-index: 1;
    right: 2px;
    top: 2px;
  }
}
</style>
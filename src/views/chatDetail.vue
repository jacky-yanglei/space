<template>
  <div class="page">
    <div class="bg">
      <div class="content">
        <div class="level">{{ $store.state.chatDetailShowName === 'public'?'Eleven':$store.state.chatDetailShowName }}</div>
        <div class="contact" :style="chatBoxHeight" ref="contact">
          <template v-for="(item, index) in $store.state.chat[$store.state.chatDetailShowName].chatList">
            <div :key="index" class="msg" v-if="item.msg" :class="(typeof item.speaker === 'object' && item.speaker.id === $store.state.userInfo.id)?'right':'left'">
              <div v-if="item.speaker === 'eleven'" class="icon" @click="showDialog">
                <img src="../assets/chat-icon.png" alt=""/>
              </div>
              <div class="icon" v-else>
                <img :src="item.speaker.img" alt=""/>
              </div>
              <div class="text" :class="(typeof item.speaker === 'object' && item.speaker.id !== $store.state.userInfo.id)?'player-text':''">
                <div>
                  {{ item.msg }}
                </div>
              </div>
            </div>
            <template v-if="item.img">
              <div v-for="(img, i) in imgList(item.img)" :key="index + '-' + 'img-' + i" class="msg" :class="(typeof item.speaker === 'object' && item.speaker.id === $store.state.userInfo.id)?'right':'left'">
                <div v-if="item.speaker === 'eleven'" class="icon" @click="showDialog">
                  <img src="../assets/chat-icon.png" alt=""/>
                </div>
                <div class="icon" v-else>
                  <img :src="item.speaker.img" alt=""/>
                </div>
                <div class="text" :class="(typeof item.speaker === 'object' && item.speaker.id !== $store.state.userInfo.id)?'player-text':''">
                  <div class="img" @click="viewImg('data:image/png;base64,' + img)">
                    <img :src="'data:image/png;base64,' + img" alt="">
                  </div>
                </div>
              </div>
            </template>
            <template v-if="item.video">
              <div v-for="(video, i) in imgList(item.video)" :key="index + '-' + 'video-' + i" class="msg" :class="(typeof item.speaker === 'object' && item.speaker.id === $store.state.userInfo.id)?'right':'left'">
                <div v-if="item.speaker === 'eleven'" class="icon" @click="showDialog">
                  <img src="../assets/chat-icon.png" alt=""/>
                </div>
                <div class="icon" v-else>
                  <img :src="item.speaker.img" alt=""/>
                </div>
                <div class="text" @click="openVideo(item.video)" :class="(typeof item.speaker === 'object' && item.speaker.id !== $store.state.userInfo.id)?'player-text':''">
                  <div class="img">
                    <img :src="'data:image/jpg;base64,' + item.pre_video_img" alt=""/>
                  </div>
                </div>
              </div>
            </template>
          </template>
        </div>
        <div class="reply-box" v-if="hasReply">
          <div v-if="$store.state.replyChat[$store.state.chatDetailShowName].chat && ($store.state.replyChat[$store.state.chatDetailShowName].chat.type === 'wait_ready')" class="text">所有探员准备就绪后开启下一环节</div>
          <div :class="$store.state.replyChat[$store.state.chatDetailShowName].chat && ($store.state.replyChat[$store.state.chatDetailShowName].chat.type === 'wait_ready')?'wait-ready':''" @click="setReplay($store.state.replyChat[$store.state.chatDetailShowName])">{{ $store.state.replyChat[$store.state.chatDetailShowName].chat?$store.state.replyChat[$store.state.chatDetailShowName].chat.msg:'' }}</div>
        </div>
        <div class="send-box" v-if="$store.state.hasAnswer[$store.state.chatDetailShowName]">
          <el-input v-model="input" placeholder="请输入你的答案" :disabled="!$store.state.hasAnswer[$store.state.chatDetailShowName]"></el-input>
          <el-button @click="sendMsg()">发送</el-button>
        </div>
      </div>
    </div>
    <!-- <el-dialog
      :custom-class="'chat-detail-dialog'"
      width="100%"
      title="喂金狗粮"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :append-to-body="true"
      :modal="false"
      >
    <div class="modal-content">
          <img src="../assets/chat-icon.png" alt="" />
          <p>
            剩余金狗粮数量：5
          </p>
          <p>
            已喂金狗粮数量：3
          </p>
    </div>
    <span slot="footer" class="dialog-footer">
      <div class="btn">
        投喂一颗金狗粮
      </div>
    </span>
    </el-dialog> -->
    <banner></banner>
  </div>
</template>
<script>
import banner from './banner.vue'
export default {
  components: {
    banner
  },
  computed: {
    chatBoxHeight() {
      let defaultHeight = 'calc(100vh - 53px - 130px)';
      let height = defaultHeight;
      if (this.hasReply) {
        height = 'calc(100vh - 53px - 220px)'
      } else if (!this.$store.state.hasAnswer[this.$store.state.chatDetailShowName] && !this.hasReply) {
        height = 'calc(100vh - 53px - 70px)';
      }
      return {
        height,
      }
    },
    hasReply() {
      if (this.$store.state.replyChat[this.$store.state.chatDetailShowName] && this.$store.state.replyChat[this.$store.state.chatDetailShowName].chat) {
        this.$nextTick(() => {
          this.chatBoxBottom();
        });
        return true;
      }
      return false;
    },
    imgList() {
      return function(img) {
        return img.split(',');
      }
    }
  },
  data() {
    return {
      input: "",
      dialogVisible: false,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.chatBoxBottom();
    });
  },
  methods: {
    // 打开表情包 图片
    viewImg(base64) {
      this.$store.state.imgView = true;
      this.$store.state.imgViewBase64 = base64;
    },
    // 打开观看视频
    openVideo(url) {
      this.$store.state.chatVideoModal = true;
      this.$store.state.chatVideoUrl = url;
    },
    showDialog(){
      this.dialogVisible = true
    },
    // 聊天框滚动到最底部
    chatBoxBottom() {
      let dom = this.$refs.contact;
      dom.scrollTop = dom.scrollHeight;
    },
    setReplay(data) {
      if (data.chat.type === 'wait_ready') {
        this.input = '';
        this.$store.state.webSocket.sendObjMsg({op: 'event_finish', data: {id: data.chat.id.toString(), value: ''}});
        data.chat = null;
      } else {
        this.input = '';
        this.$store.state.webSocket.sendObjMsg({op: 'event_finish', data: {"id": data.chat.id, "value": {'chat_id': data.chat.chat_id, "send_group": data.chat.group}}});
        data.chat = null;
      }
      this.$nextTick(() => {
        this.chatBoxBottom();
      });
    },
    sendMsg() {
      if (this.input === '') {
        this.$message({message: "请输入内容", type: 'error'});
        return;
      }
      if (this.$store.state.hasAnswer[this.$store.state.chatDetailShowName]) {
        let data = this.$store.state.hasAnswer[this.$store.state.chatDetailShowName];
        this.$store.state.webSocket.sendObjMsg({op: 'event_finish', data: {"id": data.id, "value": {"answer": this.input,"send_group": this.$store.state.chatDetailShowName}}});
        this.input = '';
      }
    }
  },
  watch: {
    "$store.state.chat": {
      handler(value) {
        if (this.$store.state.chatDetailShowName) {
          if (value[this.$store.state.chatDetailShowName]) {
            value[this.$store.state.chatDetailShowName].chatList.map(e => {
              e.seed = true;
            });
          }
        }
        setTimeout(() => {
          this.chatBoxBottom();
        }, 2)
      }
    },
    "$store.state.hasAnswer": {
      handler(value) {
        this.$nextTick(() => {
          if (!value[this.$store.state.chatDetailShowName]) {
            this.input = '';
          }
        });
      }
    },
  }
};
</script>

<style lang="less" scoped>

.page {
  background-image: url("../assets/watch.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 200px;
  height: calc(100vh - 52px);
}
.bg {
  backdrop-filter: blur(4px);
  height: calc(100vh - 52px);
  backdrop-filter: blur(4px);
  background: rgba(113, 199, 213, 0.12);
  min-height: 100%;
  position: relative;
}
.content {
  min-height: 100%;
}

::v-deep{
  .chat-detail-dialog{
    background-color: rgb(4, 10, 9);
  }
  .chat-detail-dialog .el-dialog__header{
    padding: 20px 20px 10px;
  }
  .chat-detail-dialog .el-dialog__body{
    padding: 30px 20px;
  }
  .el-dialog__title{
    color: #71c7d5;
  }
}

.contact {
  padding: 0 24px;
  height: calc(100vh - 53px - 130px);
  overflow-y: auto;
  font-size: 16px;
  line-height: 32px;
  * {
    font-family: auto !important;;
  }
  .msg {
    display: flex;
    margin-bottom: 20px;
    .icon {
      > img {
        width: 100%;
      }
      flex: 0 0 48px;
    }
    .text {
      color: #fff;
      min-width: 200px;
      padding: 10px;
      border-radius: 10px;
      .img {
        img {
          max-width: 200px;
        }
      }
    }
  }
  .left {
    .icon {
      margin-right: 10px;
    }
    .text {
      color: rgb(113, 199, 213);
      border: 1px solid rgba(113, 199, 213, 1);
      &.player-text {
        background-color: rgba(113, 199, 213, 0.3);
      }
    }
  }

  .right {
    .icon {
      margin-left: 10px;
    }
    flex-direction: row-reverse;
    .text {
      background: rgba(113, 199, 213, 1);
      color: #000;
    }
  }
}

.level {
  color: rgb(113, 199, 213);
  font-size: 24px;
  padding-top: 20px;
  padding-left: 20px;
  margin-bottom: 20px;
}
.reply-box {
  * {
    font-family: auto;
  }
  position: absolute;
  bottom: 3px;
  height: 150px;
  width: 100%;
  background-color: rgb(4, 10, 9);
  left: 0;
  z-index: 10;
  border-top: 1px solid rgba(93, 110, 112, 1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > div.text {
    color: white;
    font-size: 16px;
    margin-bottom: 10px;
  }
  > div:not(.text) {
    text-align: center;
    cursor: pointer;
    font-size: 16px;
    width: 320px;
    max-height: 200px;
    overflow-y: auto;
    padding: 10px 10px;
    border-radius: 8px;
    border: 3px solid rgba(211, 249, 255, 1);
    color: rgb(255, 255, 255);
    box-sizing: border-box;
    background: linear-gradient(147.39deg, rgba(0, 161, 196, 1) 30.76%, rgba(113, 199, 213, 1) 91.4%), rgba(113, 199, 213, 1);
    &.wait-ready {
      background: rgba(240,16,83,0.15);
      border: 3px solid rgba(240,16,83,0.65);
      color: #F01053;
    }
  }
}

.send-box {
  position: absolute;
  bottom: 3px;
  width: 100%;
  display: flex;
  padding: 10px;
  z-index: 5;
  button {
    font-family: auto;
  }
  ::v-deep {
    .el-input {
      height: 40px;
      border-radius: 4px;
      input {
        font-family: auto;
      }
      

      input {
        font-size: 16px;
        background-image: none !important;
        color: #fff;
        border: 1px solid rgba(93, 110, 112, 1);
        background: rgba(113, 199, 213, 0.24);
      }
    }
    .el-button {
      margin-left: 10px;
      background: rgba(113, 199, 213, 1);
      color: #fff;
      * {
        font-family: auto;
        font-size: 16px;
      }
    }
  }
}
</style>
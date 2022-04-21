<template>
    <div>
        <el-dialog
        :custom-class="'dialog'"
        title=""
        :destroy-on-close="true"
        :visible.sync="$store.state.forceTextModel"
        :close-on-click-modal="false"
        @close="close()"
        :modal-append-to-body="false"
        :show-close="false"
        :fullscreen="true">
        <div class="page">
            <div class="context">
                <div class="content">
                  <div class="title">{{ title }}</div>
                  <div v-html="contentHtml(contentData)"></div>
                </div>
                <div class="footer">
                  <div class="btn finish" v-if="finish">
                    <button>请等待其他玩家阅读完成</button>
                  </div>
                  <div class="btn" v-if="!finish">
                    <button @click="end()">阅读完成</button>
                  </div>
                </div>
            </div>
        </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
      return {
        finish: false,
      }
    },
    computed: {
      title() {
        if (this.$store.state.forceText) {
          return this.$store.state.forceText.data.title;
        }
        return "";
      },
      contentHtml() {
        return (data) => {
          let str = data.replace(/\n/g, '<br/>')
          return str;
        }
      },
      contentData() {
        if (this.$store.state.forceText) {
          return this.$store.state.forceText.data.content
        }
        return '';
      }
    },
    mounted() {
    },
    methods: {
      close() {
        this.finish = false;
      },
      end() {
        this.finish = true;
        this.$store.state.webSocket.sendObjMsg({op: 'event_finish', data: {id: this.$store.state.forceText.id.toString(), value: ''}});
        // this.$store.state.webSocket.sendObjMsg({op: 'event_finish', data: ''})
      }
    }
}
</script>
<style lang="less" scoped>
.page {
  background-image: url("../assets/watch.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 200px;
  height: 100vh;
  overflow-y: auto;
}

.context {
  backdrop-filter: blur(4px);
  background: rgba(113, 199, 213, 0.12);
  overflow: hidden;
  min-height: 100%;
  position: relative;
  .footer {
    position: absolute;
    height: 50px;
    bottom: 20px;
    width: 100%;
    .finish button {
      opacity: 0.5;
      position: relative;
      background-image: url('../assets/exchange/btn-bg-gery.png');
    }
  }
}
.content {
    overflow-y: auto;
    height: calc(100vh - 80px);
    color: white;
    padding: 20px 16px;
    font-size: 15px;
    line-height: 1.5;
    .title {
      font-size: 50px;
      line-height: 1.1;
      color: rgba(113, 199, 213, 1);
      margin-bottom: 20px;
    }
}
::v-deep{
    .el-dialog__header {
        padding: 0;
    }
    .el-dialog__body {
        padding: 0;
    }
    .dialog{
        background-color: rgb(4, 10, 9);
        max-width: 750px;
    }
    .el-dialog__title{
        color: #71c7d5;
    }
}
</style>
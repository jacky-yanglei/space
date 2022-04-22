<template>
    <div>
        <el-dialog
        :custom-class="'dialog'"
        title=""
        :destroy-on-close="true"
        :visible.sync="$store.state.chatVideoModal"
        :close-on-click-modal="false"
        :modal-append-to-body="false"
        :show-close="true"
        :fullscreen="true">
        <div class="page">
            <div class="context">
                <div class="close" @click="close()">关闭视频</div>
                <div class="content" v-if="$store.state.chatVideoUrl">
                    <video 
                    width="100%"
                    height="100%"
                    @ended="end"
                    webkit-playsinline="true" 
                    x-webkit-airplay="true"  
                    playsinline="true" 
                    x5-video-player-type="h5" 
                    x5-video-player-fullscreen="true" 
                    preload="auto" 
                    controls
                    >
                     <source :src="$store.state.chatVideoUrl?$store.state.chatVideoUrl:''" type="video/mp4" />
                    </video>
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
      }
    },
    mounted() {
      // console.log(this);
    },
    methods: {
      end() {
        // this.$store.state.webSocket.sendObjMsg({op: 'event_finish', data: {id: this.$store.state.videoEvent.id.toString(), value: ''}});
      },
      close() {
        this.$store.state.chatVideoModal = false;
        this.$store.state.chatVideoUrl = null;
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
  height: 100vh;
  position: relative;
  .content {
    height: 100vh;
  }
  .close {
    color: #ffffff;
    cursor: pointer;
    text-align: right;
    position: absolute;
    height: 40px;
    display: flex;
    align-items: center;
    right: 20px;
    top: 20px;
    z-index: 1111;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    padding: 10px;
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
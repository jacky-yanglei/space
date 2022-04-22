<template>
    <div>
        <el-dialog
        :custom-class="'dialog'"
        title=""
        :destroy-on-close="true"
        :visible.sync="$store.state.imgView"
        :close-on-click-modal="false"
        @close="close()"
        :modal-append-to-body="false"
        :show-close="false"
        :fullscreen="true">
        <div class="page">
            <div class="context">
                <div class="close" @click="close()">关闭</div>
                <div class="img-block">
                  <img v-if="$store.state.imgViewBase64" :src="$store.state.imgViewBase64" alt="">
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
    computed: {
      
    },
    mounted() {
    },
    methods: {
      close() {
          this.$store.state.imgView = false;
          this.$store.state.imgViewBase64 = '';
      },
      end() {
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
  .img-block {
    width: 100%;
    overflow: auto;
    min-height: 100vh;
    display: flex;
    align-items: center;
    img {
      width: 100%;
      // height: 100vh;
      vertical-align: middle;
    }
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
<template>
    <div>
        <el-dialog
        :custom-class="'dialog'"
        title=""
        :destroy-on-close="true"
        :visible.sync="$store.state.firstScreen"
        :close-on-click-modal="false"
        :modal-append-to-body="false"
        :show-close="false"
        :fullscreen="true">
        <div class="page">
            <div class="context">
                请等待DM开始游戏
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
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  .footer {
    position: absolute;
    height: 50px;
    bottom: 20px;
    width: 100%;
    .finish button {
      opacity: 0.8;
    }
  }
}
.content {
    overflow-y: auto;
    height: calc(100vh - 80px);
    color: white;
    padding: 20px 16px;
    .title {
      font-size: 24px;
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
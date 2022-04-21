<template>
    <div>
        <el-dialog
        :custom-class="'chat-dialog'"
        title=""
        :destroy-on-close="true"
        :visible.sync="$store.state.chatDetailModel"
        :close-on-click-modal="false"
        :modal-append-to-body="false"
        :show-close="false"
        :modal="false"
        @closed="closed"
        :fullscreen="true">
        <div class="page">
            <div class="context">
                <div class="content">
                    <chatDetail v-if="$store.state.chatDetailShowName"></chatDetail>
                </div>
            </div>
        </div>
        </el-dialog>
    </div>
</template>
<script>
import chatDetail from '../views/chatDetail.vue'
export default {
  components: {
    chatDetail
  },
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
    end() {
    },
    closed() {
      this.$store.state.chatDetailShowName = null;
    }
  }
}
</script>
<style lang="less" scoped>
.content {
    overflow-y: auto;
}
::v-deep{
    .el-dialog__header {
        padding: 0;
    }
    .el-dialog__body {
        padding: 0;
    }
    .chat-dialog{
        background-color: rgb(4, 10, 9);
        max-width: 750px;
    }
    .el-dialog__title{
        color: #71c7d5;
    }
}
</style>
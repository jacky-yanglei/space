<template>
    <div>
        <el-dialog
        :custom-class="'dialog'"
        title=""
        :destroy-on-close="true"
        :visible.sync="$store.state.currentSceneStatus"
        :close-on-click-modal="false"
        :modal-append-to-body="false"
        :show-close="false"
        @closed="dialogClosed()"
        :fullscreen="true">
        <div class="page">
            <div ref="position" class="position-img" @click="collet($event)">
              <img :src="$store.state.currentColletScene?'data:image/png;base64,' + $store.state.currentColletScene.img:''" alt="">
            </div>
            <div class="back-icon" @click="doClose()">
            </div>
            <el-dialog
              width="100%"
              :custom-class="'trade-dialog'"
              title=""
              :show-close="false"
              :destroy-on-close="true"
              :close-on-click-modal="false"
              :visible.sync="innerVisible"
              append-to-body>
              <div>
                <div class="data">
                  <img v-if="trace && trace.img" :src="'data:image/png;base64,' + trace.img" alt="">
                  <div class="text" v-html="trace?trace.introduction:''"></div>
                </div>
                <div class="confrim">
                  <div @click="closeTrace()">{{ trace&&trace.can_collect ? "搜集" : "确定"}}</div>
                </div>
              </div>
            </el-dialog>
        </div>
        </el-dialog>
    </div>
</template>
<script>
// import { EventBus } from '../eventBus/eventBus.js'
export default {
    data() {
      return {
        loop: false,
        innerVisible: false,
        trace: null,
      }
    },
    computed: {
      contentHtml() {
        return (data) => {
          let str = data.replace(/\n/g, '<br/>')
          return str;
        }
      },
    },
    create() {
    },
    mounted() {
      // EventBus.$on('collectTrace', (data) => {
      //   this.showTrace(data.send_group, data.id);
      // });
    },
    methods: {
      collet(target) {
        if (this.loop) {
          return;
        }
        this.loop = true;
        setTimeout(() => {
          this.loop = false;
        }, 500);
        let x = target.offsetX;
        let y = target.offsetY;
        console.log([x/this.$refs.position.clientWidth * 100, y/this.$refs.position.clientHeight * 100]);
        this.decidePosition(x/this.$refs.position.clientWidth * 100, y/this.$refs.position.clientHeight * 100);
      },
      closeTrace() {
        if (this.trace.can_collect) {
          this.$store.state.webSocket.sendObjMsg({op: 'collect_trace', data: this.trace.id});
        }
        this.innerVisible = false;
      },
      // 展示线索
      showTrace(group, id) {
        if (this.$store.state.currentColletScene.send_group === group) {
          let traceList = this.$store.state.currentColletScene.trace_list;
          for (let i = 0; i < traceList.length; i++) {
            if(id === traceList[i].id) {
              this.trace = traceList[i];
              this.innerVisible = true;
            }
          }
        }
      },
      // 判断点击区域是否是线索对应位置
      decidePosition(x, y) {
        let traceList = this.$store.state.currentColletScene.trace_list;
        console.log(this.$store.state.currentColletScene);
        for (let i = 0; i < traceList.length; i++) {
          let pos = traceList[i].pos;
          if (typeof pos === 'string') {
            pos = JSON.parse(pos)
          }
          let bool = this.searchPosition([x, y], pos);
          if (bool) {
            this.trace = traceList[i];
            this.innerVisible = true;
            break;
            // if (!traceList[i].id) {
            //   let id = traceList[i].id;
            //   this.$store.state.webSocket.sendObjMsg({op: 'collect_trace', data: id});
            //   break;
            // } else {
              
            // }
          }
        }
      },
      // 搜索位置
      searchPosition (traget, pos) {
        if (traget[0] < pos[1] && traget[0] > pos[0] && traget[1] < pos[3] && traget[1] > pos[2]) {
          return true;
        }
        return false;
      },
      
      doClose() {
        // this.showTrace('家庭', '3');
        // this.showTrace('学校', '1');
        this.$store.state.currentSceneStatus = false;
      },
      dialogClosed() {
        this.$store.state.currentColletScene = null;
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
.position-img {
  width: 100vw;
  position: relative;
  img {
    vertical-align: middle;
    width: 100%;
  }
}
.back-icon {
  position: fixed;
  z-index: 100000000;
  top: 50px;
  right: 16px;
  width: 48px;
  height: 48px;
  background-image: url('../assets/chat-icon.png');
  background-size: 100%;
  cursor: pointer;
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
    .trade-dialog {
      background-color: rgba(4, 10, 9, 0);
      text-align: center;
      .data {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        min-height: 300px;
      }
      img {
        width: 100%;
      }
      .el-dialog__body {
        padding: 20px;
      }
      .text {
        font-size: 20px;
        color: #72C7D3;
        margin-bottom: 20px;
        margin-top: 10px;
      }
      .confrim {
        > div {
          display: inline-block;
          text-align: center;
          cursor: pointer;
          font-size: 14px;
          width: 150px;
          max-height: 200px;
          overflow-y: auto;
          padding: 10px 10px;
          border-radius: 8px;
          border: 3px solid rgba(211, 249, 255, 1);
          color: rgb(255, 255, 255);
          box-sizing: border-box;
          background: linear-gradient(147.39deg, rgba(0, 161, 196, 1) 30.76%, rgba(113, 199, 213, 1) 91.4%), rgba(113, 199, 213, 1);
        }
      }
    }
}
</style>
<template>
  <div class="page">
    <ul class="process" style="visibility: hidden;">
      <li>第一幕</li>
      <li>第二幕</li>
      <li>第三幕</li>
      <li>第四幕</li>
    </ul>

    <div class="bg">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="线索发放" name="first">
          <div class="collection">
            <div class="sub-title">待发放线索卡</div>
            <div class="collection-list">
              <div v-if="noSendTrace.length === 0">无</div>
              <div class="collection-item" v-for="item in noSendTrace" :key="item.id">{{ item.trace.name }} <span @click="doSendTrace(item.id)">发放</span></div>
              <!-- <div class="collection-item">1 号线索 <span>发放</span></div>
              <div class="collection-item">2 号线索 <span>发放</span></div> -->
            </div>

            <div class="sub-title">已发放线索卡</div>
            <div class="collection-list issued">
              <div v-if="sendTrace.length === 0">无</div>
              <div class="collection-item" v-for="item in sendTrace" :key="item.id">{{ item.trace.name }} <span>已发放</span></div>
              <!-- <div class="collection-item">1 号线索 <span>已发放</span></div>
              <div class="collection-item">2 号线索 <span>已发放</span></div> -->
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="DM控制" name="second">
          <div class="control">
            <!-- <div class="current-step">当前第三章</div>
            <div class="step-tips">
              已有7/12名玩家完成了该幕的文字阅读，
              DM可自行决定点击下方按钮开始这一幕 的探案游戏。
            </div> -->
            
            <div class="btn">
              <button v-if="!eventId" class="disabled">{{ eventName }}</button>
              <button v-else @click="waitDm()">{{ eventName }}</button>
              <div v-if="timer.total_time" style="text-align: center;color: #fff;">
                {{ '倒计时:' + timerTotal + '秒' }}
              </div>
            </div>
            

            <div style="display: none;">
              <div class="branch">路线分支（3个分支）</div>
              <div class="branch-table">
                <table>
                  <tr>
                    <td></td>
                    <td>完成</td>
                    <td>未完成</td>
                  </tr>
                  <tr>
                    <td>医院</td>
                    <td>5</td>
                    <td>3</td>
                  </tr>
                  <tr>
                    <td>学校</td>
                    <td>10</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <td>工地</td>
                    <td>1</td>
                    <td>2</td>
                  </tr>
                </table>
              </div>
            </div>

            <div class="time-mamage">时间管理（预计{{ time.total }}分钟）</div>
            <div class="time-step">
              <ul>
                <li :class="process(time.current, time.total) >= 10?'active':''"></li>
                <li :class="process(time.current, time.total) >= 20?'active':''"></li>
                <li :class="process(time.current, time.total) >= 30?'active':''"></li>
                <li :class="process(time.current, time.total) >= 40?'active':''"></li>
                <li :class="process(time.current, time.total) >= 50?'active':''"></li>
                <li :class="process(time.current, time.total) >= 60?'active':''"></li>
                <li :class="process(time.current, time.total) >= 70?'active':''"></li>
                <li :class="process(time.current, time.total) >= 80?'active':''"></li>
                <li :class="process(time.current, time.total) >= 90?'active':''"></li>
                <li :class="process(time.current, time.total) >= 100?'active':''"></li>
              </ul>
            </div>
            <div class="used">
              <span>已用时间：{{ time.current }}分钟</span>
              <span v-if="time.total - time.current >= 0">剩余时间：{{ time.total - time.current }}分钟</span>
              <span v-else>已超时：{{ time.current - time.total }}分钟</span>
            </div>
            <div class="btn">
              <button @click="closeRoom()">关闭房间</button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="房间二维码" name="third">
          <div class="code-content">
            <div class="code">
              <a class="img" ref="qrcode"></a>
            </div>
            <div class="player">
              <div
                class="palyer-item"
                v-for="(item, index) in joiner"
                :key="index"
              >
                <div class="player-info">
                  <div class="name">
                    <img :src="item.img" alt="" /> <span>{{ item.user_name }}</span>
                  </div>
                  <div class="status" v-if="item.online">----在线</div>
                  <div v-else>----已离线</div>
                </div>
                <div class="delete">
                  <span @click="deletePlayer(item.id)">踢出</span>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import ws from "../assets/websoket";
import axios from 'axios';
export default {
  data() {
    return {
      activeName: "second",
      isInitCode: false,
      joiner: [],
      eventId: null,
      eventName: '游戏中',
      timer: {  // wait_dm的计时器
        start_time: 0,
        current_time: 0,
        total_time: 0,
        timer: 0,
      },
      traceList: [],
      time: {
        total: 60,
        current: 0,
      },
      timerTimeout: null,
    };
  },
  computed: {
    process() {
      return (time, total) => {
        return Math.floor(time/total * 100);
      }
    },
    // 已发放线索
    sendTrace() {
      return this.traceList.filter(elem => elem.is_send);
    },
    // 可发放线索
    noSendTrace() {
      return this.traceList.filter(elem => !elem.is_send)
    },
    timerTotal() {
      return this.timer.total_time - (this.timer.current_time - this.timer.start_time) - this.timer.timer;
    },
  },
  created() {
    
  },
  mounted() {
    this.initWs();
    // this.$alert('12132', '提示', {
    //   customClass: 'space-message-box',
    //   confirmButtonText: '确定',
    //   type: 'warning',
    //   callback: action => {
    //     console.log(action);
    //   }
    // });
  },
  beforeDestroy() {
    clearTimeout(this.timerTimeout);
  },
  methods: {
    // 踢出玩家
    deletePlayer(id) {
      this.$confirm('此操作将把玩家踢出房间, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        ws.send(JSON.stringify({op: 'drop_player', data: id}))
      }).catch(() => {      
      });
    },

    // 发放线索
    doSendTrace(id) {
      console.log(id);
      ws.send(JSON.stringify({op: "send_trace", data: id.toString()}))
      // ws.send(JSON.stringify({op: "event_finish", data: {id: this.eventId, value: ''}}));
    },
    // wai
    waitDm() {
      if (this.eventId) {
        ws.send(JSON.stringify({op: "event_finish", data: {id: this.eventId, value: ''}}));
        this.eventId = null;
        this.eventName = '游戏中';
        this.timer = {
          start_time: 0,
          current_time: 0,
          total_time: 0,
          timer: 0,
        }
        if(this.timerTimeout) {
          clearTimeout(this.timerTimeout);
        }
      }
    },
    handleClick() {
      if (this.activeName == "third" && !this.isInitCode) {
        this.initCode();
        this.isInitCode = true;
      }
    },
    doTimer() {
      this.timerTimeout = setTimeout(() => {
        if (this.timerTotal <= 0) {
          if(this.timerTimeout) {
            clearTimeout(this.timerTimeout);
          }
          return;
        }
        this.timer.timer++;
        this.doTimer();
      }, 1000);
    },
    initWs() {
      ws.focusClose = false;
      this.reloadWs();
      ws.reloadCallback = () => {
        this.reloadWs();
      };
      // localStorage.setItem(
      //   "playerInfo",
      //   JSON.stringify({
      //     roomId: this.$route.params.roomid,
      //     role: "admin",
      //     phone: "",
      //   })
      // );
      // if (ws.status) {
      //   ws.send(
      //     JSON.stringify({
      //       op: "dm_auth",
      //       data: "Bearer " + localStorage.getItem("token"),
      //     })
      //   );
        
      //   this.postGetRoomInfo();
      //   ws.onmessage((e) => {
      //     this.onmessage(e);
      //   });
      // } else {
      //   this.reloadWs();
      // }
      // ws.reloadCallback = () => {
      //   this.reloadWs();
      // };
    },
    reloadWs() {
      ws.reload(
        this.$route.params.roomid,
        () => {
          this.postGetRoomInfo();
          ws.onmessage((e) => {
            this.onmessage(e);
          });
        },
        true
      );
    },
    onmessage(e) {
      if (e.op == "room_info") {
        this.joiner = e.data.players.filter((elem) => {
          return !elem.is_dm
        });
      }
      else if (e.op === 'wait_dm') {
        if (e.data.id == 1) {
          ws.send(JSON.stringify({op: 'event_finish', data: {id: '1', value: ''}}));
          return;
        }
        this.eventId = e.data.id;
        this.eventName = e.data.data;
        if (e.data.total_time) {
          this.timer = {
            start_time: e.data.start_time,
            current_time: e.data.current_time,
            total_time: e.data.total_time,
            timer: 0,
          }
          this.doTimer();
        }
      }
      else if (e.op === 'dm_trace') {
        this.traceList = e.data
      }
      else if (e.op === 'time_manage') {
        this.time = e.data;
      }
      else if (e.op === 'need_send_trace') {
        this.$alert(e.data.text, '提示', {
          confirmButtonText: '确定',
          type: 'warning',
          callback: action => {
            console.log(action);
          }
        });
      }
    },
    postGetRoomInfo() {
      ws.send(JSON.stringify({op: "get_room_info", data: "" }));
    },
    initCode() {
      // eslint-disable-next-line no-undef
      new QRCode(this.$refs.qrcode, {
        text:
          location.origin +
          process.env.VUE_APP_Redirect +
          "/playerLogin/" +
          this.$route.params.roomid,
        width: 240,
        height: 240,
        colorDark: "#000000",
        colorLight: "#ffffff",
        // eslint-disable-next-line no-undef
        correctLevel: QRCode.CorrectLevel.H,
      });
    },
    closeRoom() {
      this.$confirm(`注意，您确定要开启关闭房间吗？房间信息都将丢失，请慎重关闭房间`, '提示', {
          confirmButtonText: '确定关闭',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
          this.deleteRoom();
      }).catch(() => {
          
      });
    },
    deleteRoom() {
      axios.put(
          process.env.VUE_APP_BASE_URL+ 'room/' + this.$route.params.roomid + '/',
          {
          },
          {
              headers: {
                  Authorization: 'Bearer ' + localStorage.getItem('token')
              }
          }
      ).then(({data}) => {
          if(data.status === 200) {
            ws.focusClose = true;
            ws.WebSocket.close();
            this.$message({message: '房间已关闭', type: 'success'});
            this.$router.replace("/home");
          } else {
            this.$message({message: data.message, type: 'error'});
          }
      }).catch(() => {
          this.$message({message: '网络异常，关闭失败', type: 'error'});
      })
    }
  },
};
</script>
<style lang="less">
.dialog {
  max-width: 500px;
}
</style>

<style lang="less" scoped>
.bg {
  background-image: url("../assets/watch.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 200px;
}
.page {
  max-width: 750px;
  margin: 0 auto;
  background-color: #000;

  ::v-deep {
    .el-tabs__nav-wrap.is-scrollable {
      padding: 0px;
    }
    .el-tabs__nav {
      width: 100%;
    }
    .el-tabs__item {
      border: 2px solid rgba(93, 110, 112, 1);
      background-color: transparent;
      width: 33%;
      color: rgba(119, 181, 189, 1);
      text-align: center;
      &.is-active {
        color: #fff;
      }
    }
    .el-tabs__content {
      max-width: 90%;
      margin: auto;
      background: rgba(113, 199, 213, 0.12);
      min-height: calc(100vh - 100px);
      backdrop-filter: blur(4px);
    }
  }

  .code {
    height: 100%;
    box-sizing: border-box;
    text-align: center;
    margin-top: 40px;

    > .img {
      width: 250px;
      height: 250px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      border-radius: 6px;
      background-image: url(../assets/code-bg.png);
      padding: 5px;
      background-size: 100% 100%;
    }
  }

  .code-content {
    // width: 250px;
    margin: auto;
    .player {
      margin-top: 30px;
    }

    .palyer-item {
      padding: 0 10px;
      margin-top: 10px;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      .player-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: 50px;
        flex: 0 0 100%;
      }
      .delete {
        position: absolute;
        top: 0;
        right: 10px;
        height: 100%;
        display: flex;
        align-items: center;
        > span {
          cursor: pointer;
          color: red;
        }
      }
      .name {
        display: flex;
        align-items: center;
        img {
          width: 40px;
          margin-right: 5px;
        }
        span {
          padding-bottom: 6px;
          display: inline-block;
          max-width: 100px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .status {
        // float: right;
        color: rgb(98, 239, 171);
      }
      
    }
  }
}

.process {
  overflow: hidden;
  margin-bottom: 10px;
  li {
    float: left;
    width: 25%;
    line-height: 50px;
    text-align: center;
    color: #fff;
    list-style: none;
    border-right: 2px solid rgba(113, 199, 213, 1);
    box-sizing: border-box;
    background: rgba(113, 199, 213, 0.35);
  }
}

.collection {
  width: 300px;
  margin: auto;
  .sub-title {
    margin-top: 20px;
    color: rgba(113, 199, 213, 1);
    font-size: 18px;
    font-weight: bold;
  }
  .collection-list {
    color: white;
    .collection-item {
      margin: 10px 0;
      border-radius: 8px;
      padding: 10px 30px;
      background-image: url(../assets/input-group.png);
      background-size: 100% 100%;
      span {
        float: right;
        position: relative;
        top: -10px;
        width: 90px;
        text-align: center;
        right: -30px;
        line-height: 38px;
        cursor: pointer;
      }
    }
    &.issued .collection-item {
      color: rgba(119, 181, 189, 1);
      span {
        cursor: default;
      }
    }
  }
}

.control {
  width: 80%;
  margin: auto;
  .current-step {
    font-size: 24px;
    color: #fff;
    margin: 20px auto;
  }
  .step-tips {
    color: rgba(113, 199, 213, 1);
  }
  .btn {
    margin: 30px 0px;
  }
  .btn button {
    background-image: none;
    text-align: center;
    cursor: pointer;
    border-radius: 16px;
    border: 3px solid rgba(211, 249, 255, 1);
    color: rgb(255, 255, 255);
    box-sizing: border-box;
    background: linear-gradient(147.39deg, rgba(0, 161, 196, 1) 30.76%, rgba(113, 199, 213, 1) 91.4%), rgba(113, 199, 213, 1);
  }
  .branch {
    color: rgba(113, 199, 213, 1);
    margin: 10px auto;
  }
  .branch-table {
    table {
      color: rgba(113, 199, 213, 1);
      border-collapse: collapse;
      margin: 10px auto;
      width: 100%;
      text-align: center;
      border-top: 1px solid rgba(113, 199, 213, 1);
      border-left: 1px solid rgba(113, 199, 213, 1);

      td {
        border-right: 1px solid rgba(113, 199, 213, 1);
        border-bottom: 1px solid rgba(113, 199, 213, 1);
        line-height: 30px;
      }
    }
  }
  .disabled {
    opacity: 0.2;
  }
  .time-mamage {
    color: rgba(113, 199, 213, 1);
    margin-bottom: 20px;
    margin-top: 20px;
  }
  .used {
    margin-top: 20px;
    span {
      display: inline-block;
      margin-right: 5px;
      color: #fff;
    }
  }
  .time-step {
    ul {
      border: 2px solid rgba(113, 199, 213, 1);
      padding: 5px;
      overflow: hidden;
      display: flex;
      li {
        list-style: none;
        background: rgba(113, 199, 213, 0.1);
        height: 30px;
        margin: 0px 5px;
        width: 10%;
      }
      li.active {
        background: rgba(113, 199, 213, 1);
      }
    }
  }
}

::v-deep {
  .space-message-box {
    background-color: transparent;
  }
}
</style>
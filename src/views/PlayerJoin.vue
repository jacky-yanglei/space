<template>
  <div class="page">
    <div class="title"><img src="../assets/exchange/title.png" alt="" /></div>
    <div>
      <!-- <img src="../assets/exchange/code-box.png" alt=""> -->
      <div class="code">
        <a class="img" ref="qrcode"></a>
        <div class="collect-count">已连接{{ joiner.length }}名探员...</div>
        <div class="start-game">
          <!-- <img @click="startGame()" src="../assets/exchange/play-game.png" alt=""> -->
          <button v-if="joiner.length" @click="startGame()">开始游戏</button>
          <button v-else style="opacity: 0.8;">请等待探员连接</button>
        </div>
      </div>
      <!-- <div class="lun">
                <img src="../assets/exchange/code-lun.png" alt="">
            </div> -->
    </div>
    <!-- <div>
            <img src="../assets/exchange/player-join-text.png" alt="">
        </div> -->
    <!-- <div>{{ joined.length }}/9</div> -->
    <!-- <div>9人本</div> -->
    <!-- <div class="online">
            <div class="join" v-for="item in joined" :key="item">{{ item }}</div>
            <div class="no-join" v-for="item in noJoined" :key="item">{{ item }}</div>
        </div> -->
  </div>
</template>
<script>
import ws from "../assets/websoket";
export default {
  data() {
    return {
      roomInfo: {},
      joiner:[],
      clickStart: false,
    };
  },
  computed: {
    // joined: function () {
    //   if (!this.roomInfo.joined) {
    //     return [];
    //   }
    //   let data = this.roomInfo.joined.concat();
    //   var index = data.indexOf("admin");
    //   if (index > -1) {
    //     data.splice(index, 1);
    //   }
    //   return data;
    // },
    // noJoined() {
    //   let arr = [
    //     "帅帅",
    //     "宝宝",
    //     "玛玛",
    //     "觉觉",
    //     "臭臭",
    //     "霸霸",
    //     "野野",
    //     "蒂蒂",
    //     "莎莎",
    //   ];
    //   return arr.filter((item) => this.joined.indexOf(item) == -1);
    // },
  },
  created() {
    // let playerInfo = JSON.parse(localStorage.getItem('playerInfo')??'{}');
    // if (playerInfo.role !== 'admin') {
    //     localStorage.removeItem('playerInfo');
    //     setTimeout(() => {
    //         location.href = '/tsmfront/';
    //     }, 10);
    // }
  },
  mounted() {
    this.initWs();
  
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
  methods: {
    initWs() {
      localStorage.setItem(
        "playerInfo",
        JSON.stringify({
          roomId: this.$route.params.roomid,
          role: "admin",
          phone: "",
        })
      );
      this.reloadWs();
      // if (ws.status) {
      //   ws.send(
      //     JSON.stringify({
      //       // data_type: "reconnect",
      //       // data: {
      //       //   name: "admin",
      //       //   phone: "",
      //       //   check_token: localStorage.getItem("token"),
      //       // },
      //       "op":"dm_auth","data":'Bearer ' + localStorage.getItem("token")
      //     })
      //   );
      //   this.postGetRoomInfo();
      //   ws.onmessage((e) => {
      //     this.onmessage(e);
      //   });
      // } else {
      //   this.reloadWs();
      // }
      ws.reloadCallback = () => {
        this.reloadWs();
      };
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
      if(e.op == 'room_info'){
        this.joiner = e.data.players.filter((elem) => {
          return !elem.is_dm
        })
      }

      if (e.data_type === "init" || e.data_type === "reconnect") {
        if (e.success) {
          sessionStorage.setItem("role", "admin");
        } else {
          this.$message({ message: e.message, type: "error" });
        }
      }
      if (e.data_type === "room_info") {
        if (e.success) {
          this.roomInfo = e.data;
        }
      }
      if (e.data_type === "check_token") {
        if (!e.success) {
          this.$alert(`${e.message}`, "提示", {
            type: "error",
            confirmButtonText: "确定",
            callback: () => {
              ws.focusClose = true;
              ws.WebSocket.close();
              localStorage.removeItem("playerInfo");
              localStorage.removeItem("token");
              setTimeout(() => {
                location.href = "/tsmfront/";
              }, 10);
            },
          });
        }
      }
    },
    postGetRoomInfo() {
    },
    startGame() {
      if (this.clickStart) {
        return;
      }
      this.clickStart = true
      ws.status = false;
      ws.focusClose = true;
      ws.WebSocket.onclose = () => {
        this.clickStart = false;
        this.$router.push("/controlCenter/" + this.$route.params.roomid);
      }
      ws.WebSocket.close();
    },
  },
};
</script>
<style lang="less" scoped>
.page {
  max-width: 750px;
  margin: 0 auto;
  min-height: 100vh;
  background-image: url("../assets/exchange/bg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-color: #272828;
  color: #fff;
  text-align: center;

  .title {
    padding-top: 60px;
    text-align: center;
  }

  .start-game {
  margin-top: 50px;
    button {
      background-image: url("../assets/exchange/btn-bg.png");
      height: 40px;
      width: 280px;
      margin: auto;
      background-color: transparent;
      border: none;
      color: white;
    }
  }

  .collect-count{
    margin:20px auto;
    color: rgb(113, 199, 213);
    font-size: 18px;
  }

  .code {
    height: 100%;
    box-sizing: border-box;
    
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

  > div {
    &:first-child {
      // padding-top: 50px;
      > img {
        width: 200px;
      }
      position: relative;
      z-index: 1;

      .lun {
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        // display: flex;
        // align-items: center;
        // justify-content: center;
        padding-top: 15px;
        height: 100%;
        box-sizing: border-box;
        z-index: -1;
        > img {
          width: 120px;
          animation: turn 10s linear infinite;
        }
      }
    }
    &:nth-child(2) {
      margin-top: 20px;
    }
    &:nth-child(3) {
      margin-top: 10px;
    }
    &:last-child {
      margin-top: 50px;
    }
    &.online {
      margin: 10px auto 0;
      max-width: 300px;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      > div {
        flex: 0 0 33.33%;
      }
    }
    .join {
      color: rgb(92, 252, 0);
    }
    .no-join {
      color: red;
    }
  }
}
@keyframes turn {
  0% {
    -webkit-transform: rotate(0deg);
  }
  25% {
    -webkit-transform: rotate(90deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
  }
  75% {
    -webkit-transform: rotate(270deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
</style>
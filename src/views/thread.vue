<template>
  <div class="page">
    <div class="bg">
      <div class="content">
        <div class="level">
          <div>
            <!-- 案发现场-学校 -->
          </div>
          <div class="continu" @click="continu()">继续搜证</div>
        </div>
        <div class="scroll">
          <div v-for="(item, index) in collectedTrace" :key="index" class="chat-item">
            <img :src="'data:image/png;base64,' + item.img" alt="" />
            <div class="msg">
              {{ item.name }}
            </div>
          </div>
          <!-- <div class="chat-item">
            <img src="../assets/chat-icon.png" alt="" />
            <div class="msg">
            噼里啪啦红墨水
            </div>
          </div> -->
        </div>
      </div>
    </div>
    <el-dialog
      :custom-class="'chat-detail-dialog'"
      width="100%"
      title="选择你想去的搜证现场"
      :destroy-on-close="true"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      >
    <div class="modal-content">
      <div class="continu" v-for="(item, key) in $store.state.colletScene" :key="key" @click="openScene(item)">{{ key }}</div>
    </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false
    };
  },
  computed: {
    // 已收集到的线索列表
    collectedTrace() {
      // console.log(this.$store.state.collectedTrace);
      // console.log(this.$store.state.colletScene);
      let list = [];
      for (let item in this.$store.state.collectedTrace) {
        if (this.$store.state.colletScene[item]) {
          let ed = this.$store.state.collectedTrace[item]; // 这个分组下已收集线索列表
          let all = this.$store.state.colletScene[item].trace_list;  // 这个分组下所有的线索
          for (let i = 0;i < ed.length; i++) {
            for (let j = 0; j < all.length; j++) {
              if (all[j].id === ed[i]) { // 如果id相等 已收集线索加入
                list.push(all[j]);
                break;
              }
            }
          }
        }
      }
      return list;
    }
  },
  methods: {
    push() {
      this.$router.push("/script/register/" + this.input);
    },
    continu() {
      let length = 0;
      for (let key in this.$store.state.colletScene) {
        console.log(key);
        length++;
      }
      if (length) {
        this.dialogVisible = true;
      } else {
        this.$message({message: '当前没有可以搜证的现场', type: 'error'})
      }
    },
    openScene(data) {
      console.log(data);
      this.dialogVisible = false;
      this.$nextTick(() => {
        this.$store.state.currentColletScene = data;
        this.$store.state.currentSceneStatus = true;
      });
    }
  },
};
</script>

<style lang="less"  scoped>
.bg {
  background-image: url("../assets/watch.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 200px;
  height: calc(100vh - 52px);
}

.content {
  backdrop-filter: blur(4px);
  background: rgba(113, 199, 213, 0.12);
  height: 100%;
  box-sizing: border-box;
  overflow-y: hidden;
  .scroll {
    height: calc(100% - 83px);
    overflow-y: auto;
  }
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
    div.continu {
      margin: 0 auto 20px;
      text-align: center;
      cursor: pointer;
      font-size: 16px;
      width: 300px;
      padding: 10px 10px;
      border-radius: 8px;
      border: 3px solid rgba(211, 249, 255, 1);
      color: rgb(255, 255, 255);
      box-sizing: border-box;
      background: linear-gradient(147.39deg, rgba(0, 161, 196, 1) 30.76%, rgba(113, 199, 213, 1) 91.4%), rgba(113, 199, 213, 1);
    }
  }
  .el-dialog__title{
    color: #71c7d5;
  }
}

.chat-item {
  display: flex;
  border: 1px solid rgba(113, 199, 213, 1);
  max-width: 90%;
  margin: auto;
  margin-bottom: 20px;
  border-radius: 12px;

  img {
    width: 50px;
    padding: 10px;
  }

  .msg{
    width: calc(100% - 80px);
    color: #fff;
    line-height: 70px;
    }

 
}

.level{
    color: rgb(113, 199, 213);
    font-size: 24px;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 83px;
    div.continu {
      text-align: center;
      cursor: pointer;
      font-size: 16px;
      width: 150px;
      // max-height: 200px;
      padding: 10px 10px;
      border-radius: 8px;
      border: 3px solid rgba(211, 249, 255, 1);
      color: rgb(255, 255, 255);
      box-sizing: border-box;
      background: linear-gradient(147.39deg, rgba(0, 161, 196, 1) 30.76%, rgba(113, 199, 213, 1) 91.4%), rgba(113, 199, 213, 1);
    }
}
</style>
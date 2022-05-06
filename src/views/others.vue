<template>
  <div class="page">
    <div class="bg">
      <div class="content">
        <div class="level">
          专家团
        </div>
        <div class="scroll">
          <div class="chat-item" v-for="(item,index) in list" :key="index" @click="showMsg(item)">
            {{item.title}}
          </div>
        </div>
      </div>
    </div>

    <!-- <banner></banner> -->
  </div>
</template>
<script>
// import banner from "./banner.vue";
import axios from 'axios';
export default {
  // components: { banner },
  data() {
    return {
      list: [],
    };
  },
  methods: {
    getData(){
      axios.get(
          process.env.VUE_APP_BASE_URL+ 'expert_article/'
      ).then(({data}) => {
          if(data.status === 200) {
              this.list = data.data
          } else {
              this.$message({message: data.message, type: 'error'});
          }
      }).catch(() => {
          this.$message({message: '获取列表失败', type: 'error'});
      })
    },
    showMsg(item){
        this.$alert(
          item.content,
          item.title, 
          {
            confirmButtonText: '关闭',
          }
        );
    }
  },
  created(){
    this.getData()
  }
};
</script>

<style lang="less"  scoped>
.bg {
  background-image: url("../assets/watch.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 200px;
  height: calc(100vh - 52px);
  overflow-y: auto;
}

.content {
  backdrop-filter: blur(4px);
  background: rgba(113, 199, 213, 0.12);
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 54px);
  .scroll {
    flex: 1;
    height: 1px;
    overflow: auto;
  }
}

.chat-item {
  border: 1px solid rgba(113, 199, 213, 1);
  max-width: 90%;
  margin: auto;
  margin-bottom: 20px;
  border-radius: 12px;
  padding: 20px 10px;
  text-align: center;
  color:#fff;
}

.level{
    color: rgb(113, 199, 213);
    font-size: 24px;
    padding-top: 20px;
    padding-left: 20px;
    margin-bottom: 40px;
    button{
    float: right;
    margin-right: 20px;
    width: 120px;
    padding: 12px;
    }
}
</style>
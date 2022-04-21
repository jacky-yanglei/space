<template>
    <div>
        <el-dialog
        :custom-class="'dialog'"
        title=""
        :destroy-on-close="true"
        :visible.sync="$store.state.forceChooseLine"
        :close-on-click-modal="false"
        :modal-append-to-body="false"
        :show-close="false"
        :fullscreen="true">
        <div class="page">
            <div class="context">
                <div class="content">
                    <div>{{ dec($store.state.forceChoose) }}</div>
                    <div class="place">
                        <div v-for="(item, index) in tabs($store.state.forceChoose)" :key="index">
                            <img :src="item.img?'data:image/jpg;base64,' + item.img:defaultImgUrl" alt="">
                            <div @click="end(item.id)">
                                <div class="choose-title">{{ item.id }}</div>
                            </div>
                            <div class="persons" @click="end(item.id)">
                                <div>
                                    <div v-for="iItem in persons($store.state.currentBranchStatus, item.id)" :key="iItem.id">
                                        <i class="avater" :style="{'background-image': 'url(' + iItem.img +')'}"></i>
                                        <span>{{ iItem.user_name }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
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
          defaultImgUrl: require('../assets/tabs_bg.png'),
      }
    },
    computed: {
        title() {
            return (data) => {
                if (data.data) {
                    return data.data.title;
                }
                return '';
            }
        },
        dec() {
            return (data) => {
                if (data.data) {    
                    return data.data.desc;
                }
                return '';
            }
        },
        persons() {
            return (data, key) => {
                if (data[key]) {
                    return data[key];
                }
                return [];
            }
        },
        tabs() {
            return (data) => {
                if (data.data) {
                    return data.data.data;
                }
                return [];
            }
        }
    },
    mounted() {
    },
    methods: {
      end(tab) {
        console.log(111)
        this.$store.state.webSocket.sendObjMsg({op: 'event_finish', data: {id: this.$store.state.forceChoose.id.toString(), value: tab}});
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
}
.content {
    overflow-y: auto;
    color: white;
    padding: 20px;
    .place {
        margin-top: 50px;
        > div {
            position: relative;
            margin: 20px auto 0;
            padding: 40px 20px 20px;
            width: 300px;
            // border: 1px solid rgba(113, 199, 213, 1);
            border-radius: 8px;
            background-image: url('../assets/branch_bg.png');
            background-repeat: no-repeat;
            background-size: 100%;
            // height: 167px;
            img {
                position: relative;
                z-index: 1;
                width: 100%;
                border-radius: 8px;
                overflow: hidden;
                border: 1px solid rgba(113, 199, 213, 1);
            }
            > div {
                position: absolute;
                width: 100%;
                height: 100%;
                z-index: 2;
                cursor: pointer;
                top: 0;
                left: 0;
                .choose-title {
                    position: absolute;
                    width: 50%;
                    height: 30px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    left: 0;
                    top: 0;
                }
            }
        }
        .persons {
            padding: 20px;
            padding-top: 50px;
            > div {
                max-height: 100%;
                overflow-y: auto;
                > div {
                    display: inline-flex;
                    width: 50%;
                    align-items: center;
                    font-size: 16px;
                    line-height: 16px;
                }
            }
            .avater {
                display: inline-block;
                width: 24px;
                height: 24px;
                background-color: red;
                border-radius: 50%;
                margin-right: 10px;
                background-size: cover;
            }
        }
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
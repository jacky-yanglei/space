<template>
    <div class="page" >
       <div class="title"><img src="../assets/exchange/title.png" alt=""></div>
        <div class="key">
            <!-- <img src="../assets/exchange/key.png" alt=""> -->
            <div>

              <div class="btn" v-if="!roomId">
                    <button @click="getCode()" >创建房间</button>
                </div>
                <div class="btn" v-if="roomId">
                    <button @click="backRoom()" >回到房间</button>
                </div>
              
                <!-- <div class="tips">
                    <div>
                        文字说明:
                    </div>
                    <p>1、DM创建好房间后，将二维码给玩家扫码</p>
                    <p>2、DM在游戏中可以接受玩家的入金和出金请求</p>
                    <p>3、完成游戏后，DM需要录入谁是MVP并告诉玩家MVP可以抽奖，其他玩家可以领取洽洽瓜子优惠券</p>
                </div> -->
            </div>
        </div>
  
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            // appJiang: null,
            // jiangList: [
            //     'https://s.vchangyi.com/s25',
            //     'https://s.vchangyi.com/s2I',
            //     'https://s.vchangyi.com/s2d'
            // ],
            roomId: null,
        }
    },
    computed: {
    },
    created() {
        // this.checkToken();
        // this.appJiang = JSON.parse(sessionStorage.getItem('jiang')??JSON.stringify([1,1,1]));
    },
    mounted() {
        this.roomId = this.$route.params.id;
    },
    methods: {
        checkToken() {
            axios.post(
                process.env.VUE_APP_BASE_URL+ 'script/check_login',
                {
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                }
            ).then(({data}) => {
                if(data.status === 200) {
                    if (data.data.last_room_id) {
                        this.roomId = data.data.last_room_id;
                    }
                    localStorage.setItem('token', data.data.new_token)
                    this.tokenStatusLoading = true;
                } else {
                    localStorage.removeItem('token');
                    this.$router.replace('/dmlogin');
                }
            }).catch(() => {
                this.checkToken();
            })
        },
        backRoom() {
            this.$router.push('/controlCenter/' + this.roomId)
        },
        // getJiang(index) {
        //     axios.post(
        //         process.env.VUE_APP_BASE_URL+ 'script/jiang/' + index + '/',
        //         {
        //         },
        //         {
        //             headers: {
        //                 Authorization: 'Bearer ' + localStorage.getItem('token')
        //             }
        //         }
        //     ).then(({data}) => {
        //         if(data.status === 200) {
        //             this.appJiang[index] = 0;
        //             sessionStorage.setItem('jiang', JSON.stringify(this.appJiang));
        //             setTimeout(() => {
        //                 location.href = this.jiangList[index];
        //             }, 10)
        //         } else {
        //             this.$message({message: data.message, type: 'error'});
        //         }
        //     }).catch(() => {
        //         this.$message({message: '网络错误', type: 'error'});
        //     })
            
        // },
        getCode() {
            // console.log('创建房间号并获取房间二维码');
            // this.$router.push('/playerJoin')

            this.$confirm(`注意，您确定要开启新房间？之前的房间信息都将丢失，请慎重创建新房间`, '提示', {
                confirmButtonText: '确定创建',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.createRoom();
            }).catch(() => {
                
            });
            
        },
        createRoom() {
            // 创建房间并获取房间号
            axios.post(
                process.env.VUE_APP_BASE_URL+ 'room/',
                {
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                }
            ).then(({data}) => {
                if(data.status === 200) {
                    this.$router.push('/playerJoin/' + data.data.id)
                } else {
                    if (data.status === 401) {
                        this.$router.push('/dmlogin/')
                    }
                    this.$message({message: data.message, type: 'error'});
                }
            }).catch(() => {
                this.$message({message: '网络异常，创建失败', type: 'error'});
            })
        }
    }
}
</script>

<style lang="less" scoped>
.page {
    max-width: 750px;
    margin: 0 auto;
    min-height: 100vh;
    background-image: url('../assets/exchange/bg.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-color: #272828;
    color: #fff;
    position: relative;
    .jiang {
        position: absolute;
        top: 20%;
        right: 10px;
    }
    .banner {
        text-align: center;
        img {
            max-width: 240px;
        }
    }

     .title {
        padding-top: 60px;
        text-align: center;
    }

    .key {
        margin-top: 40px;
        text-align: center;
        > img {
            width: 100%;
            max-width: 400px;
            vertical-align: middle;
        }
        > div {
            width: 100%;
            max-width: 400px;
            margin: -5px auto 0;
            // background-color: #CCB480;
            padding-top: 100px;
            padding-bottom: 20px;
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
            .btn {
                margin-top: 40px;
                button{
                 background-image: url('../assets/exchange/btn-bg.png');
                 height: 40px;
                 width:280px;
                 margin: auto;
                 background-color: transparent;
                 border: none;
                 color: white;
                }
            }
            .tips {
                background-color: rgba(147, 102, 64, 0.15);
                border-radius: 8px;
                margin: 20px;
                color: #90681A;
                padding: 10px 40px;
                text-align: left;
            }
        }
    }
}
</style>
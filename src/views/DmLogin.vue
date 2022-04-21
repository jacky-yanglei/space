<template>
    <div class="page">
        <div class="title"><img src="../assets/exchange/title.png" alt=""></div>
        <div class="content">
      
            <div class="print">
                <div>
                    <div>登录密码</div>
                    <div>
                        <el-input v-model="password" placeholder="" show-password>
                        </el-input>
                    </div>
                    <div class="error-text" v-if="postStatus && !password">密码不能为空</div>
                </div>
                <div class="btn">
                    <!-- <img @click="post()" src="../assets/exchange/login.png" alt=""> -->
                    <button @click="post()">登录</button>
                </div>
            </div>
        
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import ws from '../assets/websoket';
export default {
    data() {
        return {
            postStatus: false,
            name: '',
            password: ''
        }
    },
    created() {
        // if (localStorage.getItem('token')) {
        //     this.$router.replace('/home');
        // }
    },
    methods: {
        post() {
            this.postStatus = true;
            if (!this.valid()) {
                return;
            }
            if(ws.status) {
                ws.focusClose = true;
                ws.WebSocket.close();
            }
            axios.post(
                process.env.VUE_APP_BASE_URL+ 'user/login/?user_id='+this.$route.params.id+'&password='+this.password
            ).then(({data}) => {
                if(data.status === 200) {
                    this.$message({message: '登录成功', type: 'success'});
                    localStorage.setItem('token', data.data.token)
                    if (data.data.last_room_id) {
                        this.$router.push('/home/' + data.data.last_room_id)
                    } else {
                        this.$router.push('/home');
                    }
                } else {
                    this.$message({message: data.message, type: 'error'});
                }
            }).catch(() => {
                this.$message({message: '登录失败', type: 'error'});
            })
        },
        valid() {
            if (
                !this.password
            ) {
                return false;
            }
            return true;
        }
    }
}
</script>

<style lang="less" scoped>
.page {
    min-height: 100vh;
    max-width: 750px;
    margin: 0 auto;
    background-image: url('../assets/exchange/bg.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-color: #272828;
    padding: 0 15px;
    &::v-deep input{
        border-radius: 4px;
        border: 1px solid rgba(113, 199, 213, 1);
        box-sizing: border-box;
        background: rgba(12, 28, 31, 1);
        color: #fff;
    }
    .error-text {
        color: red;
        font-size: 14px;
    }
    .title {
        padding-top: 60px;
        text-align: center;
    }
    .content {
        max-width: 300px;
        margin: 0 auto;
        .header {
            margin: 0 -15px;
        }
        .footer {
            margin: 0 -15px;
        }
        .print {
            padding-top: 120px;
            box-sizing: border-box;
            color: #fff;
            > div {
                margin-bottom: 10px;
            }
            .btn {
                margin-top: 140px;
                text-align: center;
               
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
        }
        img {
            width: 100%;
            vertical-align: middle;
        }
    }
}
</style>
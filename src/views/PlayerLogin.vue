<template>
    <div class="page">
        <div>
            <a class="btn" v-if="!hasCode" :href="`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_userinfo#wechat_redirect`">
                微信授权
            </a>
        </div>
    </div>
</template>

<script>
// import Websocket from '../ws/ws.js';
export default {
    data() {
        return {
            appid: 'wx8eb3e82f3f175d71', // 正式
            // appid: 'wx79041d8625ec9aa8', // 测试
        }
    },
    computed: {
        hasCode() {
            return this.GetQueryString('code')
        },
        redirectUri() {
            return location.href;
        }
    },
    created() {
    },
    mounted() {
        this.initPage();
    },
    methods: {
        GetQueryString(name) {
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r!=null)return  unescape(r[2]); return null;
        },
        initPage() {
            if (this.hasCode) {
                this.$router.replace('/player/' + this.$route.params.id + '?code=' + this.hasCode);
            }
            // let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8eb3e82f3f175d71&redirect_uri=https://wx.tmgxbxwl.cn/tsm/api/wx/login/&response_type=code&scope=snsapi_userinfo#wechat_redirect'
            // axios.get(url).then(res=>{
            //    if(res.status == 200){
            //         let token = res.data;
            //         localStorage.setItem('playerToken', token)
            //         this.post()
            //    }else{
            //     this.$message({message: res.message, type: 'error'});
            //    }
            // })
            // let ws = new Websocket(this.$route.params.id, this);
            // console.log(ws);
        },
    }
}
</script>

<style lang="less" scoped>
.page {
    min-height: 100vh;
    max-width: 750px;
    margin: 0 auto;
    background-image: url('../assets/exchange/bg.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-color: #272828;
    padding: 0 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    .tips {
        font-size: 14px;
        margin-top: 10px;
    }
    .el-select {
        width: 100%;
    }
    .error-text {
        color: red;
        font-size: 14px;
    }
    &::v-deep input{
        font-size: 16px;
        background-color: #301802;
        border-radius: 25px;
        color: #fff;
        border: 1px solid #301802;
    }
    .title {
        padding-top: 20px;
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
            background-color: #CCB480;
            margin: -20px 0 -30px;
            padding: 30px 16px 30px;
            box-sizing: border-box;
            > div {
                margin-bottom: 10px;
            }
            .btn {
                margin-top: 20px;
                text-align: center;
                img {
                    width: auto;
                    cursor: pointer;
                }
            }
        }
        img {
            width: 100%;
            vertical-align: middle;
        }
    }
    .btn {
        display: inline-block;
        background-image: url('../assets/exchange/btn-bg.png');
        height: 40px;
        width: 280px;
        margin: auto;
        background-color: transparent;
        border: none;
        color: white;
        text-decoration: none;
        line-height: 40px;
    }
}
</style>
<template>
    <div class="page">
        <div><img src="../assets/active.png" alt=""></div>
        <div class="success">激活成功</div>
        <div class="login">
            <router-link to="/login"><el-button type="primary" round>去登录</el-button></router-link>
        </div>
        <div class="gery">若需修改信息请联系客服：</div>
        <div><a class="gery" :href="'tel:' + phone">{{phone}}</a></div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            phone: '18011364407'
        }
    },
    methods: {

    }
}
</script>

<style lang="less" scoped>
    .page {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        // justify-content: center;
        padding-top: 50px;
        box-sizing: border-box;
        .success {
            margin-top: 20px;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
        }
        .login {
            width: 100%;
            text-align: center;
            margin-bottom: 20px;
            .el-button--primary {
                background-color: #3030E0;
                border: none;
                width: 100%;
                max-width: 400px;
                margin-top: 20px
            }
        }
        .gery {
            font-size: 14px;
            color: #5D69B8;
        }
    }
</style>

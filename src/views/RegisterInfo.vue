<template>
    <div class="page">
        <div class="content">
            <div>
                <div>登录名</div>
                <div><el-input v-model="name" placeholder=""></el-input></div>
                <div v-if="post && !name" class="error-text">登录名不能为空</div>
            </div>
            <div>
                <div>密码</div>
                <div><el-input v-model="password" placeholder="" show-password></el-input></div>
                <div v-if="post && !password" class="error-text">密码不能为空</div>
            </div>
            <div>
                <div>确认密码</div>
                <div><el-input v-model="confirmPassword" placeholder="" show-password></el-input></div>
                <div v-if="post && !confirmPassword" class="error-text">确认密码不能为空</div>
                <div v-if="post && (!!password&&!!confirmPassword) && confirmPassword !== password" class="error-text">两次密码不一致</div>
            </div>
            <div>
                <div>店名</div>
                <div><el-input v-model="storeName" placeholder=""></el-input></div>
                <div v-if="post && !storeName" class="error-text">店名不能为空</div>
            </div>
            <div>
                <div>电话</div>
                <div><el-input v-model="phoneNum" placeholder=""></el-input></div>
                <div v-if="post && !phoneNum" class="error-text">电话不能为空</div>
            </div>
            <div>
                <div>地址</div>
                <div><el-input v-model="address" placeholder=""></el-input></div>
                <div v-if="post && !address" class="error-text">地址不能为空</div>
            </div>
        </div>
        <div class="content text-center">
            <el-button type="primary" @click="activate" round>立即激活</el-button>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            name: '',
            password: '',
            confirmPassword: '',
            storeName: '',
            phoneNum: '',
            address: '',
            post: false,
        }
    },
    created() {
        // axios.post(process.env.VUE_APP_BASE_URL + 'script/check_register/' + this.$route.params.id).then(({data}) => {
        //     if (data.data) {
        //     this.$router.push('/')
        //     } else {
        //     this.$router.push('/registerInfo/' + this.$route.params.id)
        //     }
        // });
    },
    methods: {
        activate() {
            this.post = true;
            if (!this.valid()) {
                return;
            }
            
            axios.post(
                process.env.VUE_APP_BASE_URL+ 'script/register/' + this.$route.params.id,
                {
                    "name": this.name,
                    "store_name": this.storeName,
                    "phone": this.phoneNum,
                    "address": this.address,
                    "password": this.password,
                }
            ).then(({data}) => {
                if(data.status === 200) {
                    this.$router.push('/ActiveSuccess');
                } else {
                    this.$message('注册失败');
                }
            }).catch(() => {
                this.$message('注册失败');
            })
        },
        valid() {
            if (
                !this.password
                ||
                !this.storeName
                ||
                !this.name
                ||
                !this.address
                ||
                !this.phoneNum
                ||
                !this.confirmPassword
            ) {
                return false;
            }
            if (this.password !== this.confirmPassword) {
                return false;
            }
            return true;
        }
    }
}
</script>
<style scoped lang="less">
    .page {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        padding: 50px 0;
        box-sizing: border-box;
        .avater {
            width: 80px;
            margin-bottom: 30px;
        }
        .text-center {
            text-align: center;
        }
        .content {
            width: 80%;
            max-width: 400px;
            > div {
                margin-bottom: 20px;
                > div:first-child {
                    color: #5D69B8;
                    font-size: 14px;
                    margin-bottom: 8px;
                }
            }
            .el-input {
                background-color: #F7F7F9;
                border-radius: 16px;
                ::v-deep .el-input__inner {
                    background-color: #F7F7F9;
                    border-radius: 16px;
                    border: none;
                }
            }
            .error-text {
                color: #f56c6c;
                margin-top: 5px;
            }
        }
        .el-button--primary {
            background-color: #3030E0;
            border: none;
            width: 100%;
            max-width: 400px;
            margin-top: 20px;
        }
    }
</style>
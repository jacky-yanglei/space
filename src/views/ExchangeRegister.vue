<template>
    <div class="page">
     <div class="title"><img src="../assets/exchange/title.png" alt=""></div>
        <div class="content">
         
            <div class="print">

             <div>
                    <div>店名</div>
                    <div>
                        <el-input v-model="store"></el-input>
                    </div>
                    <div class="error-text" v-if="postStatus && !store">店名不能为空</div>
                </div>
              
              
                  <div>
                    <div>地址</div>
                    <div>
                        <el-input v-model="address">
                        </el-input>
                    </div>
                    <div class="error-text" v-if="postStatus && !address">地址不能为空</div>
                </div>
                

                  <div>
                    <div>手机号</div>
                    <div>
                        <el-input v-model="phone">
                        </el-input>
                    </div>
                    <div class="error-text" v-if="postStatus && !phone">手机号不能为空</div>
                </div>

                <div>
                    <div>密码</div>
                    <div>
                        <el-input v-model="password" placeholder="" show-password>
                        </el-input>
                    </div>
                    <div class="error-text" v-if="postStatus && !password">密码不能为空</div>
                </div>

                <div>
                    <div>确认密码</div>
                    <div>
                        <el-input v-model="confirmPassword" placeholder="" show-password>
                        </el-input>
                    </div>
                    <div class="error-text" v-if="postStatus && !confirmPassword">确认密码不能为空</div>
                    <div class="error-text" v-if="postStatus && (!!confirmPassword && !!password) && confirmPassword != password">两次密码不一致</div>
                </div>
               
            
                <div class="btn">
                    <button @click="post()">注册</button>
                </div>
            </div>
          
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            password: '',
            confirmPassword: '',
            store: '',
            phone: '',
            address: '',
            postStatus: false,
        }
    },
    created(){  
        this.checkRegister()
    },
    methods: {
        post() {
            this.postStatus = true;
            if (!this.valid()) {
                return;
            }
             this.register()
         
        },

        // 检测是否已注册
        checkRegister(){
              axios.post(
                process.env.VUE_APP_BASE_URL+ 'user/check_register/' + this.$route.params.id+'/'
            ).then(({data}) => {
                if(data.data) {
                    this.$message({message: '账号已注册,请直接登录', type: 'warning'});
                    this.$router.push('/dmlogin/'+this.$route.params.id);
                }
            }).catch(() => {
                this.$message({message: '查询注册信息失败', type: 'error'});
            })
        },
        // 注册
        register(){
            axios.put(
                process.env.VUE_APP_BASE_URL+ 'user/' + this.$route.params.id + '/',
                {
                    "email":'',
                    "store_name": this.store,
                    "phone": this.phone,
                    "address": this.address,
                    "password": this.password,
                }
            ).then(({data}) => {
                if(data.status === 200) {
                    this.$message({message: '注册成功', type: 'success'});
                    this.$router.push('/dmlogin/' + this.$route.params.id);
                } else {
                    this.$message(
                        {
                            message: data.message,
                            type: 'error'
                        }
                    );
                }
            }).catch(() => {
                this.$message({message: '注册失败', type: 'error'});
            })
        },
        valid() {
            if (
                !this.password
                ||
                !this.store
                ||
                !this.address
                ||
                !this.phone
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

<style lang="less" scoped>
.page {
    min-height: 100vh;
    max-width: 750px;
    margin: 0 auto;
    background-image: url('../assets/exchange/bg.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-color: #272828;
    padding: 0 15px 50px;
    &::v-deep input{
        border-radius: 4px;
        border: 1px solid rgba(113, 199, 213, 1);
        box-sizing: border-box;
        background: rgba(12, 28, 31, 1);
        color: #fff;
    }
    .title {
        padding-top: 60px;
        text-align: center;
    }
    .content {
        max-width: 300px;
        margin: 0 auto;

        .error-text {
            color: red;
            font-size: 14px;
        }
        .header {
            margin: 0 -15px;
        }
        .footer {
            margin: 0 -15px;
        }
        .print {
            padding: 30px 16px 30px;
            box-sizing: border-box;
            color:#fff;
            > div {
                margin-bottom: 20px;
            }
        }
        img {
            width: 100%;
            vertical-align: middle;
        }
        .btn {
            margin-top: 40px;
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
}
</style>
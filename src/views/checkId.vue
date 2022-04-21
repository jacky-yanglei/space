<template>
    <div class="check">
        <div>请输入ID：</div>
        <div><el-input v-model="input" placeholder="请输入内容"></el-input></div>
         <el-button @click="push">跳转</el-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            input: ''
        }
    },
    methods: {
        push() {
            this.$router.push('/script/register/' + this.input)
        }
    }
}
</script>

<style lang="less" scoped>
.check {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

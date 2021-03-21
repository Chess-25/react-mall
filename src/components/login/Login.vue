<template>
  <div class="login">
    <div class="close" @click="closeClick">
      <img src="../../assets/close_btn.png"/>
    </div>
    <div>
      <img class="vip" src="../../assets/login_title.png"/>
    </div>
    <div class="import">
      <div>
        <span>账号</span><input type="text" placeholder="手机号/会员号/证件号" name="phone">
      </div>
      <div class="password">
        <span>密码</span><input type="text" placeholder="请输入密码">
      </div>
    </div>
    <a-checkbox class="a-checkbox" >
      我已经阅读并同意<a>《隐私政策》</a>还不是会员？去注册
    </a-checkbox>
    <div>
      <img @click="Login" class="login_btn" src="../../assets/login_btn.png"/>
    </div>
  </div>
</template>

<script>
export default {
    name: "Login",
    components:{
    },
    methods:{
      Login(){
        this.$emit('loginsuccess');
      },
      closeClick(){
        this.$emit('closeLogin');
      }
    }
}
</script>

<style scoped>
  .close{
    position: absolute;
    top: -35px;
    right: 0px;
  }
  .close img{
    height: 25px;
  }
  .login{
    background-color: aliceblue;
    border-radius: 7px;
    width: 340px;
    height: 270px;
    margin: 0 auto;
  }
  .vip{
    width: 100%;
    height: 100%;
  }
  .a-checkbox{
    position: relative;
    top: 45px;
    font-size: 13px;
  }
  .login_btn{
    position: relative;
    top: 65px;
    width: 45%;
    height: 45%;
  }
  .import{
    position: relative;
    top: 30px;
    bottom: 10px;
  }
  .import input{
    position: relative;
    height: 40px;
    width: 240px;
    border-radius: 20px;
    border: 0.3px solid black;
  }
  .import span{
    position: relative;
    left: -10px;
    font-size: 18px;
  }
  .password{
    position: relative;
    top: 8px;
  }
</style>>

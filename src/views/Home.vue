<template>
  <div class="home">
    <div>
      <img class="logo" src="../assets/logo.png"/>
    </div>
    <div >
      <img class="home_start_txt" src="../assets/home_start_txt.png"/>
      <div class="lu">
        <h1 class="zero">0</h1>
        <h2 class="d">里程</h2>
      </div>
    </div>

    <div class="heart_bg">
      <img class="img" src="../assets/heart_bg.jpg"/>
    </div>
    <div @click="clickLogin">
      <img class="home_start_btn" src="../assets/home_start_btn.png"/>
      <!-- <button class="">11</button> -->
    </div>
    <div class="home_start">
      <img class="home_rule_btn" src="../assets/home_rule_btn.png"/>
      <!-- <button class="">11</button> -->
    </div>
    <Login  class="login" 
            v-show="isLogin"
            @closeLogin="closeLogin"
            @loginsuccess="loginsuccess"/>
    <Success class="success" 
              v-show="isSuccess"
              @closeSuccess="closeSuccess"/>
    <div class="div1">
      <!-- <img class="home_rule_btn" src="../assets/home_rule_btn.png"/> -->
      <!-- <button class="">11</button> -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from "../components/login/Login";
import Success from "../components/success/Success"

export default {
  name: "Home",
  data(){
    return{
      isLogin:false,
      isSuccess:false
    }
  },
  components: {
    Login,
    Success

  },
  methods:{
    clickLogin(){
      this.isLogin = !this.isLogin
    },
    closeLogin(){
      this.isLogin = false
    },
    loginsuccess(){
      this.isLogin = false;
      this.isSuccess = true;
    },
    closeSuccess(){
      this.isSuccess = false;
    }
  }
};
</script>
<style scoped>
  body{
    text-align: center;
  }
  .home{
    width: 100%;
    height: 100%;
    background-image: url("../assets/bg.png");
    background-size: cover;
    text-align: center;

  }
  .logo{
    width:70%;
    height: 70%;
    padding: 50px 50px 50px 50px;
    margin: 0 auto;
    /* background-image: url("../assets/logo.png"); */
  }
  .home_start_txt{
    height: 50%;
    width: 50%;
    margin: 0 auto;
  }
  .lu{
    position:absolute;
    top:290px;
    left: 167px;
  }
  .zero{
    color: white;
    font-size: 70px;
  }
  .d{
    position: relative;
    top: -40px;
    color: white;
  }
  .heart_bg{
    padding: 20px 20px;
  }
  .heart_bg image{
    height: 60%;
    width: 60%;
    /* background-image: url("../assets/heart_bg.jpg"); */
  }
  .click{
    background-image: url("../assets/home_start_btn.png");
  }
  .img{
    width: 270px;
    height: 270px;
  }
  .home_start_btn{
    position: relative;
    top: 20px;
    height: 60%;
    width: 60%;
  }
  .home_rule_btn{
    position: relative;
    top: 35px;
    height: 60%;
    width: 60%;
  }
  .login{
    position: absolute;
    top: 200px;
    left: 17px;
    z-index: 9;
    margin: 0 auto;
  }
  .success{
    width: 340px;
    height: 140px;
    position: absolute;
    top: 250px;
    left: 17px;
    z-index: 9;
    margin: 0 auto;
    background-color: #ffe4e1;
    
  }
  .div1{
    height: 150px;
  }

</style>

<template>
  <div>
    <div class="close" @click="closeClick">
      <img src="../../assets/close_btn.png"/>
    </div>
    <div class="success">登录成功！</div>
    <div class="start">马上开启心跳里程吧！</div>
  </div>
</template>

<script>
export default {
  name:"Success",
  methods:{
    closeClick(){
      this.$emit('closeSuccess');
    }
  }
}
</script>

<style scoped>
  .close{
    position: absolute;
    top: -45px;
    right: 0px;
  }
  .close img{
     height: 25px;
  }
  .success{
    position: relative;
    top: 40px;
    color: hotpink;
    font-size: 22px;
  }
  .start{
     position: relative;
    top: 40px;
  }
</style>>

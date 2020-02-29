<template>
  <div class="monitor_container">
    <div class="header">
      <span class="title">设备监控平台</span>
    </div>

    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.monitor_container {
  width: 100%;
  height: 100%;
  background: url(../../assets/img/bg/7.png) no-repeat;
  background-size: 100% 100%;
  position: relative;
  overflow: hidden;
}
.header {
  width: 100%;
  height: 80px;
  background: url("../../assets/img/bg/8.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
}
.header span {
  color: #fff;
  font-size: 25px;
  position: absolute;
  top: 50%;
  margin-top: -10px;
  left: 9%;
}
.title {
  color: #fff;
  font-size: 18px;
  position: relative;
  margin-bottom: 20px;
  font-weight: bold;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
</style>
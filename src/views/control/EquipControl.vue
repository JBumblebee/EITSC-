
<template>
  <div>
    <el-radio-group v-model="radio">
      <el-radio :label="1">备选项</el-radio>
      <el-radio :label="2">备选项</el-radio>
      <el-radio :label="3">备选项</el-radio>
    </el-radio-group>
  </div>
</template>

<script>
export default {
  name: "equipControl",
  data() {
    return {
      radio: 1.0
    };
  }
};
</script>

<style scoped>
</style>
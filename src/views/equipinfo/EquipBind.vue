<template>
  <div class="block">
    <el-cascader
      v-model="searchList.place"
      size="medium"
      style="width:160px"
      :options="buildings"
      :props="{ checkStrictly: true }"
      clearable
      placeholder="请选择位置"
    ></el-cascader>
    <button @click="find">筛选</button>
  </div>
</template>


<script>
export default {
  data() {
    return {
      buildings: [
        {
          value: "教一",
          label: "教一",
          children: [
            {
              value: "课室101",
              label: "课室101"
            },
            {
              value: "课室102",
              label: "课室102"
            }
          ]
        },
        {
          value: "教二",
          label: "教二",
          children: [
            {
              value: "课室101",
              label: "课室101"
            },
            {
              value: "课室102",
              label: "课室102"
            },
            {
              value: "课室103",
              label: "课室103"
            }
          ]
        }
      ],
      searchList: {
        place: []
      }
    };
  },
  methods: {
    find() {
      console.log(this.searchList.place);
    }
  }
};
</script>

<style scoped>
</style>

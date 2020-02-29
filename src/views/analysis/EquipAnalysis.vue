<template>
  <div class="equipAnalysis_container">
    <div class="block">
      <el-date-picker
        v-model="value2"
        align="right"
        type="date"
        placeholder="选择日期"
        size="medium"
        style="width:160px;margin-right:20px;"
        :picker-options="pickerOptions"
      ></el-date-picker>
      <el-button icon="el-icon-search" type="primary" size="small" @click="find()">筛选</el-button>
    </div>
    <el-row type="flex" justify="space-between">
      <el-col :span="11">
        <p class="title">设备使用频率</p>
        <el-row>
          <el-col :span="6">
            <el-tag size="small" effect="dark" type="warning" style="font-size:14px">空调</el-tag>
          </el-col>
          <el-col :span="18">
            <el-progress
              :text-inside="true"
              status="warning"
              :stroke-width="24"
              :percentage="useage[0].air"
            ></el-progress>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-tag size="small" effect="dark" type="danger" style="font-size:14px">电脑</el-tag>
          </el-col>
          <el-col :span="18">
            <el-progress
              :text-inside="true"
              status="exception"
              :stroke-width="24"
              :percentage="useage[1].computer"
            ></el-progress>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-tag size="small" effect="dark" type="info" style="font-size:14px">窗帘</el-tag>
          </el-col>
          <el-col :span="18">
            <el-progress
              :text-inside="true"
              color="#909399"
              :stroke-width="24"
              :percentage="useage[3].curtain"
            ></el-progress>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-tag size="small" effect="dark" type="success" style="font-size:14px">投影仪</el-tag>
          </el-col>
          <el-col :span="18">
            <el-progress
              :text-inside="true"
              status="success"
              :stroke-width="24"
              :percentage="useage[2].projector"
            ></el-progress>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-tag size="small" effect="dark" style="font-size:14px">智能灯</el-tag>
          </el-col>
          <el-col :span="18">
            <el-progress
              :text-inside="true"
              color="bluesky"
              :stroke-width="24"
              :percentage="useage[4].lamp"
            ></el-progress>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="11">
        <p class="title">设备状态监控</p>
        <div id="myChart2" style="height:230px;"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="15">
        <el-table
          :data="tableData"
          style="width: 100%"
          max-height="300"
        >
          <el-table-column prop="date" label="日期" width="180"></el-table-column>
          <el-table-column prop="name" label="设备种类" width="180"></el-table-column>
          <el-table-column prop="total" label="总数量" width="180"></el-table-column>
          <el-table-column prop="useage" label="使用率"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      useage: [
        { air: 30 },
        { computer: 45 },
        { projector: 65 },
        { curtain: 75 },
        { lamp: 85 }
      ],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      value2: "",
      myChart2: "",
      equip_state: { good: 100, bad: 10 },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          total:100,
          useage: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          total:100,
          useage: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          total:100,
          useage: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          total:100,
          useage: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          total:100,
          useage: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    };
  },
  mounted() {
    this.init2();
    window.onresize = () => {
      this.myChart2.resize();
    };
  },
  methods: {
    find() {
      alert(this.value2);
    },
    init2() {
      this.myChart2 = this.$echarts.init(document.getElementById("myChart2"));
      this.myChart2.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          left: -5,
          top: 0,
          data: ["故障", "正常"],
          textStyle: {
            color: "#000"
          }
        },
        series: [
          {
            name: "设备状态",
            type: "pie",
            radius: ["20%", "70%"],
            center: ["50%", "50%"],
            color: ["#e72325", "#98e002", "#2ca3fd"],
            label: {
              normal: {
                formatter: "{b}\n{d}%"
              }
            },
            data: [
              {
                value: this.equip_state.bad,
                name: "故障"
              },
              {
                value: this.equip_state.good,
                name: "正常",
                selected: true
              }
            ]
          }
        ]
      });
    }
  }
};
</script>

<style scoped>
.equipAnalysis_container {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.block {
  margin:20px 0;
}
.title {
  font-size: 18px;
  position: relative;
  margin-bottom: 20px;
  font-weight: bold;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
.el-row {
  margin-bottom: 20px;
}
</style>
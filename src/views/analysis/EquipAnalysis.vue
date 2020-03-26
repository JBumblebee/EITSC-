<template>
  <div class="equipAnalysis_container">
    <div class="block">
      <el-date-picker
        v-model="value"
        align="right"
        type="date"
        placeholder="选择日期"
        size="medium"
        style="width:160px;margin-right:20px;"
        :picker-options="pickerOptions"
      ></el-date-picker>
      <el-button icon="el-icon-search" type="primary" size="small" @click="search(value)">筛选</el-button>
    </div>
    <el-row type="flex" justify="space-between">
      <el-col :span="11">
        <p class="title">设备使用频率</p>
        <el-row v-for="(item,index) in equip" :key="index">
          <el-col :span="6">
            <el-tag
              size="small"
              effect="dark"
              :type="item.type"
              style="font-size:14px"
            >{{item.name}}</el-tag>
          </el-col>
          <el-col :span="18">
            <el-progress
              :text-inside="true"
              :color="item.color"
              :stroke-width="24"
              :percentage="item.usage"
            ></el-progress>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="11">
        <p class="title">设备状态监控</p>
        <div id="myChart" style="height:230px;"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-table :data="equip" style="width: 100%" max-height="300">
          <el-table-column label="日期" width="160" >{{date}}</el-table-column>
          <el-table-column prop="name" label="设备种类" width="160" align="center"></el-table-column>
          <el-table-column prop="total" label="总数量" width="160" align="center"></el-table-column>
          <el-table-column prop="usage" label="使用率" align="center"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
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
      equip: [],
      equip_bad: 0,
      equip_good: 0,
      value: "",
      myChart: "",
      date: ""
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  mounted() {
    this.init();
    this.equipInit();
    window.onresize = () => {
      this.myChart.resize();
    };
  },
  methods: {
    search(value) {
      if (value) {
        var d = new Date(value);
        var YYYY = d.getFullYear();
        var MM = d.getMonth() + 1;
        var DD = d.getDate();
        var date = YYYY + "-" + MM + "-" + DD;
        this.date = date;
        this.$axios
          .post("/api/analysis/init", {
            date,
            secret_key: this.user.secret_key
          })
          .then(res => {
            this.equip = res.data[0].equip;
            var allTotal = 0;
            this.equip.forEach(item => {
              allTotal += item.total;
            });
            this.equip_bad = res.data[0].errNum;
            this.equip_good = allTotal - res.data[0].errNum;
            this.init();
          })
          .catch(err => {
            this.$message.error("抱歉，没有该天的数据");
          });
      } else {
        this.equipInit();
      }
    },
    init() {
      this.myChart = this.$echarts.init(document.getElementById("myChart"));
      this.myChart.setOption({
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
            radius: ["10%", "70%"],
            center: ["50%", "50%"],
            color: ["#e72325", "#98e002", "#2ca3fd"],
            label: {
              normal: {
                formatter: "{b}\n{d}%"
              }
            },
            data: [
              {
                value: this.equip_bad,
                name: "故障"
              },
              {
                value: this.equip_good,
                name: "正常",
                selected: true
              }
            ]
          }
        ]
      });
    },
    equipInit() {
      var d = new Date();
      var YYYY = d.getFullYear();
      var MM = d.getMonth() + 1;
      var DD = d.getDate();
      var date = YYYY + "-" + MM + "-" + DD;
      this.date = date;
      this.$axios
        .post("/api/analysis/init", { date, secret_key: this.user.secret_key })
        .then(res => {
          this.equip = res.data[0].equip;
          var allTotal = 0;
          this.equip.forEach(item => {
            allTotal += item.total;
          });
          this.equip_bad = res.data[0].errNum;
          this.equip_good = allTotal - res.data[0].errNum;
        })
        .catch(err => {
          this.$message.warning("没有今天的数据!");
          this.equip = [
            {
              name: "空调",
              total: 0,
              usage: 0,
              type: "danger",
              color: "#f56c6c"
            },
            {
              name: "电脑",
              total: 0,
              usage: 0,
              type: "warning",
              color: "#e6a23c"
            },
            {
              name: "窗帘",
              total: 0,
              usage: 0,
              type: "success",
              color: "#5cb87a"
            },
            {
              name: "投影仪",
              total: 0,
              usage: 0,
              type: "primary",
              color: "#1989fa"
            },
            {
              name: "智能灯",
              total: 0,
              usage: 0,
              type: "info",
              color: "#6f7ad3"
            }
          ];
          this.equip_bad = 0;
          this.equip_good = 0;
          this.init();
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
  margin: 20px 0;
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
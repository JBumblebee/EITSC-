<template>
  <el-row class="menu_page">
    <el-col>
      <el-menu
        mode="vertical"
        background-color="#324057"
        text-color="#fff"
        active-text-color="#409eff"
        class="el-menu-vertical-demo"
      >
        <router-link to="/home">
          <el-menu-item index="0">
            <i class="fa fa-margin fa-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
        </router-link>
        <template v-for="item in items">
          <el-submenu v-if="item.children" :index="item.path" :key="item.path">
            <template slot="title">
              <i :class="'fa fa-margin '+item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </template>
            <router-link v-for="(citem,cindex) in item.children" :to="citem.path" :key="cindex">
              <el-menu-item :index="citem.path">
                <span slot="title">{{citem.name}}</span>
              </el-menu-item>
            </router-link>
          </el-submenu>
        </template>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: "leftmenu",
  data() {
    return {
      items: [
        {
          icon: "fa-unlock",
          name: "设备管理",
          path: "equip",
          children: [
            { path: "equipList", name: "设备信息" },
            { path: "epuipBind", name: "设备绑定" }
          ]
        },
        {
          icon: "fa-th-large",
          name: "场景管理",
          path: "scene",
          children: [
            { path: "scenemManage", name: "场景设置" },
            { path: "warningManage", name: "预警设置" },
            { path: "sceneControl", name: "场景控制" }
          ]
        },
        {
          icon: "fa-hand-o-right",
          name: "控制管理",
          path: "control",
          children: [{ path: "equipControl", name: "设备控制" }]
        },
        {
          icon: "fa-refresh fa-spin",
          name: "监控管理",
          path: "monitor",
          children: [
            { path: "electricMonitor", name: "用电监控" },
            { path: "electricMonitor", name: "设备监控" },
            { path: "electricMonitor", name: "环境监控" }
          ]
        },
        {
          icon: "fa-bar-chart",
          name: "统计分析",
          path: "analysis",
          children: [{ path: "electricanalysis", name: "用电量统计" }]
        },
        {
          icon: "fa-cog",
          name: "信息管理",
          path: "info",
          children: [
            { path: "infoshow", name: "个人信息" },
            { path: "userList", name: "用户管理" }
          ]
        }
      ]
    };
  }
};
</script>
<style scoped>
.menu_page {
  position: fixed;
  top: 71px;
  left: 0;
  min-height: 100%;
  background-color: #324057;
  z-index: 99;
}
.el-menu {
  border: none;
}
.fa-margin {
  margin-right: 5px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  width: 35px;
}
.el-submenu .el-menu-item {
  min-width: 180px;
}
.hiddenDropdown,
.hiddenDropname {
  display: none;
}
a {
  text-decoration: none;
}
</style>

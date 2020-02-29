import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Nofind from './views/404'
import Login from './views/Login'
import Home from './views/Home'
import EquipList from './views/equipinfo/EquipList'
import SceneManage from './views/scene/SceneManage'
import WarningManage from './views/scene/WarningManage'
import SceneControl from './views/scene/SceneControl'
import EquipControl from './views/control/EquipControl'
import EnvironmentMonitor from './views/monitor/EnvironmentMonitor'
import ElectricAnalysis from './views/analysis/ElectricAnalysis'
import EquipAnalysis from './views/analysis/EquipAnalysis'
import EnvironmentAnalysis from './views/analysis/EnvironmentAnalysis'
import InfoShow from './views/user/InfoShow'
import UserList from './views/user/UserList'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '*', name: '/404', component: Nofind },
    { path: '/', redirect: '/index' },
    { path: '/login', name: 'login', component: Login },
    {
      path: '/index',
      component: Index,
      children: [
        { path: '', component: Home },
        { path: '/home', name: 'home', component: Home },
        { path: '/equipList', name: 'equipList', component: EquipList },
        { path: '/sceneManage', name: 'sceneManage', component: SceneManage },
        { path: '/warningManage', name: 'warningManage', component: WarningManage },
        { path: '/sceneControl', name: 'sceneControl', component: SceneControl },
        { path: '/equipControl', name: 'equipControl', component: EquipControl },
        { path: '/environmentMonitor', name: 'environmentMonitor', component: EnvironmentMonitor },
        { path: '/electricAnalysis', name: 'electricAnalysis', component: ElectricAnalysis },
        { path: '/equipAnalysis', name: 'equipAnalysis', component: EquipAnalysis },
        { path: '/environmentAnalysis', name: 'environmentAnalysis', component: EnvironmentAnalysis },
        { path: '/infoShow', name: 'infoShow', component: InfoShow },
        { path: '/userList', name: 'userList', component: UserList },
      ]
    }
  ]
})

// 添加路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.eleToken ? true : false;
  if (to.path == "/login") {
    next();
  } else {
    isLogin ? next() : next("/login");
  }
})

export default router;
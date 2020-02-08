import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
// import Register from './views/Register'
import Nofind from './views/404'
import Login from './views/Login'
import Home from './views/Home'
// import FoundList from './views/FoundList'
import EquipList from './views/equipinfo/EquipList'
// import EquipBind from './views/equipinfo/EquipBind'
import SceneManage from './views/scene/SceneManage'
import WarningManage from './views/scene/WarningManage'
import SceneControl from './views/scene/SceneControl'
import EquipControl from './views/control/EquipControl'
import ElectricMonitor from './views/monitor/ElectricMonitor'
import EquipMonitor from './views/monitor/EquipMonitor'
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
    // { path: '/register', name: 'register', component: Register },
    { path: '/login', name: 'login', component: Login },
    {
      path: '/index',
      component: Index,
      children: [
        { path: '', component: Home },
        { path: '/home', name: 'home', component: Home },
        // { path: '/foundlist', name: 'foundlist', component: FoundList }
        { path: '/equipList', name: 'equipList', component: EquipList },
        // { path: '/equipBind', name: 'equipBind', component: EquipBind },
        { path: '/scenemManage', name: 'scenemManage', component: SceneManage },
        { path: '/warningManage', name: 'warningManage', component: WarningManage },
        { path: '/sceneControl', name: 'sceneControl', component: SceneControl },
        { path: '/equipControl', name: 'equipControl', component: EquipControl },
        { path: '/electricMonitor', name: 'electricMonitor', component: ElectricMonitor },
        { path: '/environmentMonitor', name: 'environmentMonitor', component: EnvironmentMonitor },
        { path: '/equipMonitor', name: 'equipMonitor', component: EquipMonitor },
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
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'el-icon-s-home' }
    }]
  }, 
  {
    path:'/apply',
    component:Layout,
    redirect:'/apply/startWork',
    name:'apply',
    meta:{title:'申请',icon:'el-icon-s-cooperation'},
    children:[
      {
        path: 'startWork',
        name: 'startWork',
        component: () => import('@/views/apply/startWork'),
        meta: { title: '开工申请', icon: '' }
      },
      {
        path: 'endWork',
        name: 'endWork',
        component: () => import('@/views/apply/endWork'),
        meta: { title: '收工申请', icon: '' }
      },
      {
        path: 'applyList',
        name: 'applyList',
        component: () => import('@/views/apply/applyList'),
        meta: { title: '申请列表', icon: '' }
      },
    ]
  },
  {
    path:'/approval',
    component:Layout,
    redirect:'/approval/approvalStart',
    name:'approval',
    meta:{title:'审批',icon:'任务'},
    children:[
      {
        path: 'approvalStart',
        name: 'approvalStart',
        component: () => import('@/views/approval/approvalStart'),
        meta: { title: '开工审批', icon: '' }
      },
      {
        path: 'approvalEnd',
        name: 'approvalEnd',
        component: () => import('@/views/approval/approvalEnd'),
        meta: { title: '收工审批', icon: '' }
      },
      {
        path: 'approvalList',
        name: 'approvalList',
        component: () => import('@/views/approval/approvalList'),
        meta: { title: '审批列表', icon: '' }
      },
    ]
  },
  {
    path: '/statistics',
    component: Layout,
    redirect: '/statistics',
    children: [{
      path: 'statistics',
      name: 'statistics',
      component: () => import('@/views/statistics/index'),
      meta: { title: '统计列表', icon: '评分报告' }
    }]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
    ],
  },
  {
    path: '/content/:contentId(.*)', // will match anything starting with `/user-` and put it under `$route.params.afterUser`
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Content',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "content" */ '@/views/Content.vue'),
      },
    ],
  },
  {
    path: '/news', // will match anything starting with `/user-` and put it under `$route.params.afterUser`
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'News',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "news" */ '@/views/News.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router

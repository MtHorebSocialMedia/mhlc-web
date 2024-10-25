// Composables
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import { logEvent } from '../utils/auditService';

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Root',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
    ],
  },
  {
    path: '/home',
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
    path: '/content/:contentId(.*)',
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
    path: '/news',
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
  {
    path: '/news/:newsId',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'NewsEntry',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "newsEntry" */ '@/views/NewsEntry.vue'),
      },
    ],
  },
  {
    path: '/blog-posts',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Blogs',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "blogs" */ '@/views/Blogs.vue'),
      },
    ],
  },
  {
    path: '/blog-posts/:blogId',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'BlogPost',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "blogPost" */ '@/views/BlogPost.vue'),
      },
    ],
  },
  {
    path: '/contact',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Contact',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "contact" */ '@/views/Contact.vue'),
      },
    ],
  },
  {
    path: '/live-streams',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/live-streams',
        name: 'LiveStreams',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "live-streams" */ '@/views/LiveStreams.vue'),
      },
    ],
  },
  {
    path: '/newsletter',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/newsletter',
        name: 'Newsletter',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "newsletter-signup" */ '@/views/NewsletterSignup.vue'),
      },
    ],
  },
  {
    path: '/donate',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/donate',
        name: 'Donate',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "donate" */ '@/views/Donate.vue'),
      },
    ],
  },
  {
    path: '/donate/paypal-complete',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/donate/paypal-complete',
        name: 'DonatePaypalComplete',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "donate-paypal-complete" */ '@/views/DonatePaypalComplete.vue'),
      },
    ],
  },
  {
    path: '/leaders',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/leaders',
        name: 'Leaders',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "leaders" */ '@/views/Leaders.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: import.meta.env.MODE === 'production' ? createWebHistory(process.env.BASE_URL) : createWebHashHistory(),
  routes,
});

router.afterEach((to) => {
  logEvent({ uri: to.fullPath, type: 'route' });
});

export default router

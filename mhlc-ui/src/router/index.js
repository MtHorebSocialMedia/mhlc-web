// Composables
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import { logEvent } from '@/utils/auditService';
import { isAuthenticated, addErrorCallback } from '@/utils/httpUtils';

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
  {
    path: '/login',
    component: () => import('@/layouts/default/Admin.vue'),
    children: [
      {
        path: '/login',
        name: 'Login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
      },
    ],
  },
  {
    path: '/logout',
    component: () => import('@/layouts/default/Admin.vue'),
    children: [
      {
        path: '/logout',
        name: 'Logout',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "logout" */ '@/views/Logout.vue'),
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('@/layouts/default/Admin.vue'),
    children: [
      {
        path: '/admin',
        name: 'Admin',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "admin" */ '@/views/Admin.vue'),
      },
    ],
  },
  {
    path: '/analytics',
    component: () => import('@/layouts/default/Admin.vue'),
    children: [
      {
        path: '/analytics',
        name: 'Analytics',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "analytics" */ '@/views/Analytics.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/:pathMatch(.*)',
        name: 'NotFound',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "notFound" */ '@/views/NotFound.vue'),
      },
    ],
  }
]

const router = createRouter({
  history: import.meta.env.MODE === 'production' ? createWebHistory(process.env.BASE_URL) : createWebHashHistory(),
  routes,
});

// Add an http error callback to redirect any unauthenticated/unauthorized
// requests to the login page
addErrorCallback(401, () => {
  router.replace('/logout');
});
addErrorCallback(403, () => {
  router.replace('/logout');
});

const securePaths = ['/admin', '/analytics'];

router.beforeEach(async (to) => {
  // if this is a secured page, make sure the user is authenticated
  if (!isAuthenticated() && securePaths.includes(to.path)) {
    // redirect the user to the login page
    return { name: 'Login' }
  }
});

router.afterEach((to) => {
  logEvent({ uri: to.fullPath, type: 'route' });
});

export default router

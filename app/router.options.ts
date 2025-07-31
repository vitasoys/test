import type { RouterConfig } from '@nuxt/schema'

export default {
  routes: (_routes) => [
    {
      path: "/",
      component: () => import("~/pages/index.vue"),
      meta: { layout: false }
    },
    {
      path: "/lists",
      component: () => import("~/pages/lists.vue"),
    },
    {
      path: "/news/:id",
      component: () => import("~/pages/news.vue"),
    }
  ],
} satisfies RouterConfig

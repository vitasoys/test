// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["nuxt-windicss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // 移除不存在的 api 配置
        },
      },
    },
  },
  app: {
    baseURL: process.env.BASE_URL || '/zjztest/',
  },
  // 启用 ISR (Incremental Static Regeneration)
  nitro: {
    output: {
      dir: process.env.NUXT_ENVIRONMENT === 'development' ? 'dist' : 'release',
      publicDir: process.env.NUXT_ENVIRONMENT === 'development' ? 'dist' : 'release'
    },
    // ISR 配置
    prerender: {
      routes: ['/lists'],
      ignore: ['/admin']
    }
  },
  // 根据环境变量设置不同的输出目录
  hooks: {
    'build:done': () => {
      const env = process.env.NUXT_ENVIRONMENT || process.env.NODE_ENV;
      if (env === 'development') {
        console.log('测试环境构建完成', env);
      } else if (env === 'production') {
        console.log('正式环境构建完成', env);
      } else {
        console.log('未知环境:', env);
      }
    }
  }
});
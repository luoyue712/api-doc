import {defineConfig} from 'vite';
import {groupIconVitePlugin, localIconLoader} from 'vitepress-plugin-group-icons'
import {
  GitChangelog,
  GitChangelogMarkdownSection,
} from '@nolebase/vitepress-plugin-git-changelog/vite'
import {
  PageProperties,
  PagePropertiesMarkdownSection
} from '@nolebase/vitepress-plugin-page-properties/vite';
import {ConfigEnv, loadEnv} from "vitepress";
import VueDevTools from 'vite-plugin-vue-devtools'
import { AnnouncementPlugin } from 'vitepress-plugin-announcement'

export default defineConfig(({mode}: ConfigEnv) => {
  loadEnv(mode, process.cwd());
  return {
    optimizeDeps: {
      exclude: [
        '@nolebase/*',
        'vitepress',
      ],
    },
    ssr: {
      noExternal: [
        '@nolebase/*',
        'virtual:pwa-register'
      ],
    },
    plugins: [
      VueDevTools({
        launchEditor: 'webstorm'
      }),
      groupIconVitePlugin({
        customIcon: {
          json: localIconLoader(import.meta.url, './public/svg/json.svg')
        },
      }),
      GitChangelog({
        // 填写在此处填写您的仓库链接
        repoURL: 'https://github.com/luoyue712/api-doc',
      }),
      GitChangelogMarkdownSection({
        exclude: (id) => id.endsWith('index.md'),
        sections: {
          // 禁用页面历史
          disableChangelog: false,
          // 禁用贡献者
          disableContributors: true,
        },
      }),
      PageProperties(),
      PagePropertiesMarkdownSection({
        excludes: [
          'index.md',
        ],
      }),
      AnnouncementPlugin({
        title: '公告',
        body: [
          { type: 'text', content: '0元服务器首选啪啪云计算' },
          // {
          //   type: 'image',
          //   src: 'https://cdn.upyun.sugarat.top/mdImg/sugar/85c9554d023be2fcc5aab94effeef033',
          //   style: 'display: inline-block;width:46%;padding-right:6px'
          // },
          // {
          //   type: 'image',
          //   src: 'https://cdn.upyun.sugarat.top/mdImg/sugar/54eacf3e730af9c1e3542a4800a422ea',
          //   style: 'display: inline-block;width:46%;padding-left:6px'
          // }
        ],
        footer: [
          {
            type: 'button',
            content: '点击进入',
            link: 'https://www.ppyjs.cn',
            props: {
              type: 'primary'
            }
          },
          // {
          //   type: 'button',
          //   content: '主题',
          //   link: 'https://link',
          //   props: {
          //     type: 'success'
          //   }
          // },
        ],
      })
    ],
    server: {
      open: true
    },
    // https://cn.vitejs.dev/config/shared-options.html#publicdir
    publicDir: "../public", // 指定 public 目录路径
    build: {
      chunkSizeWarningLimit: 1000, // 设置为 1 MB
      rollupOptions: {
        external: ['oh-my-live2d'],
      }
    }
  }
});

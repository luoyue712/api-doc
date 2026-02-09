// https://vitepress.dev/guide/custom-theme
import giscusTalk from 'vitepress-plugin-comment-with-giscus'
import {type Theme, useData, useRoute} from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from './layout/index.vue'

// @ts-ignore
import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client'
// @ts-ignore
import {NolebaseGitChangelogPlugin} from '@nolebase/vitepress-plugin-git-changelog/client'
import {
  InjectionKey,
  LayoutMode,
  type Options as InjectionKeyOptions,
  SpotlightStyle
  // @ts-ignore
} from '@nolebase/vitepress-plugin-enhanced-readabilities/client'
import {
  type DynamicProperty,
  NolebasePagePropertiesPlugin,
  type Options
  // @ts-ignore
} from '@nolebase/vitepress-plugin-page-properties/client'
import 'virtual:group-icons.css'
import '@shikijs/vitepress-twoslash/style.css'
import '@nolebase/vitepress-plugin-git-changelog/client/style.css'
import '@nolebase/vitepress-plugin-page-properties/client/style.css'

export default {
  extends: DefaultTheme,
  Layout,
  setup() {
    // Get frontmatter and route
    const {frontmatter} = useData();
    const route = useRoute();
    // giscus配置
    giscusTalk({
        repo: 'luoyue712/api-doc', //仓库
        repoId: 'R_kgDONdDcpg', //仓库ID
        category: 'Announcements', // 讨论分类
        categoryId: 'DIC_kwDONdDcps4CnEHS', //讨论分类ID
        mapping: 'title',
        inputPosition: 'bottom',
        loading: 'lazy',
        lang: 'zh-CN',
      },
      {
        frontmatter, route
      },
      //默认值为true，表示已启用，此参数可以忽略；
      //如果为false，则表示未启用
      //您可以使用“comment:true”序言在页面上单独启用它
      true
    );
  },
  enhanceApp({app}) {
    app.use(TwoslashFloatingVue)
      .use(NolebaseGitChangelogPlugin)
      .use(NolebasePagePropertiesPlugin(), {
        properties: {
          'zh-CN': [
            {
              key: 'tags',
              type: 'tags',
              title: '标签',
            },
            {
              key: 'progress',
              type: 'progress',
              title: '开发进度',
            },
            {
              key: 'wordCount',
              type: 'dynamic',
              title: '字数',
              options: {
                type: 'wordsCount',
              },
            },
            {
              key: 'readingTime',
              type: 'dynamic',
              title: '阅读时间',
              options: {
                type: 'readingTime',
                dateFnsLocaleName: 'zhCN',
              },
            },
          ],
        },
      } as Options<DynamicProperty>)
      .provide(InjectionKey, {
        layoutSwitch: {
          disableHelp: true,
          defaultMode: LayoutMode.Original,
          contentLayoutMaxWidth: {
            defaultMaxWidth: 100
          },
        },
        spotlight: {
          defaultToggle: true,
          defaultStyle: SpotlightStyle.Aside
        }
      } as InjectionKeyOptions)
  },
} satisfies Theme

import {onMounted} from "vue"
import type {Models} from "oh-my-live2d/dist/modules/models";
import type {Oml2dEvents, Oml2dMethods, Oml2dProperties} from "oh-my-live2d";
import axios from "axios";
import modelsData from './live2d-models.json';
import {ModelOptions} from "oh-my-live2d/dist/types/options/model";

type Oml2d = Oml2dProperties & Oml2dMethods & Oml2dEvents & {
  models: InstanceType<typeof Models>;
}

/**
 * oh-my-live2d
 */
export default () => {
  onMounted(async () => {
      if ('Live2D' in window) {
        document.getElementById('oml2d-stage')?.remove()
      }
      // @ts-ignore
      const {loadOml2d} = import.meta.env.DEV ? await import('oh-my-live2d') : window.OML2D
      let models: ModelOptions[]
      try {
        models = (await axios.get('https://api.vkeys.cn/system/info/live2d')).data.data || modelsData
      } catch (e) {
        models = modelsData as ModelOptions[]
      }
      loadOml2d({
        mobileDisplay: true,
        initialStatus: 'active',
        dockedPosition: 'right',
        menus: {
          disable: false,
          items: [
            {
              id: 'Rest',
              icon: 'icon-rest',
              title: '休息',
              onClick(oml2d: Oml2d) {
                oml2d.statusBarOpen(oml2d.options.statusBar?.restMessage); // 展示状态条
                oml2d.clearTips(); // 清除当前提示框内容, 并停止空闲消息播放器

                // 为状态条绑定点击事件
                oml2d.setStatusBarClickEvent(() => {
                  void oml2d.statusBarClose(); // 关闭状态条
                  void oml2d.stageSlideIn(); // 舞台滑入
                  oml2d.statusBarClearEvents(); // 清除所有事件
                });

                void oml2d.stageSlideOut(); // 舞台滑出
              }
            },
            {
              id: 'SwitchModelClothes',
              icon: 'icon-skin',
              title: '切换衣服',
              onClick: async (oml2d: Oml2d) => {
                if (models[oml2d.modelIndex]?.name === 'ATRI') {
                  const result = await oml2d.models.model?.expression()
                  oml2d.tipsMessage(result ? '衣服切换成功~' : '没有可用衣服哦~', 5000, 3);
                } else {
                  await oml2d.loadNextModelClothes();
                }
              }
            },
            // {
            //   id: 'face',
            //   icon: 'icon-Expression-2',
            //   title: '更换表情',
            //   onClick: async (oml2d: Oml2d) => {
            //     const result = await oml2d.models.model?.expression()
            //     oml2d.tipsMessage(result ? '表情切换~' : '没有可用表情哦~', 5000, 3);
            //   }
            // },
            {
              id: 'SwitchModel',
              icon: 'icon-switch',
              title: '切换模型',
              onClick(oml2d: Oml2d): void {
                void oml2d.loadNextModel();
              }
            }
          ],
        },
        models
      })
    }
  )
}

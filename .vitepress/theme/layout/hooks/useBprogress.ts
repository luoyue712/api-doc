import {BProgress} from "@bprogress/core";
import {useRouter} from "vitepress";
import "@bprogress/core/css"

export default () => {

  const router = useRouter();

  BProgress.configure({
    easing: "ease-in-out",
    showSpinner: false,
    speed: 100,
    trickleSpeed: 100,
    positionUsing: "width",
  })
  router.onBeforeRouteChange = () => {
    BProgress.start() // 开始进度条
  }
  router.onAfterRouteChange = () => {
    BProgress.done() // 停止进度条
  }
}

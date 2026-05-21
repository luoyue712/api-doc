import {onBeforeMount} from 'vue'
import {useWebNotification} from '@vueuse/core'
import {registerSW} from 'virtual:pwa-register'

const intervalMS = 60 * 1000;

const {isSupported, show} = useWebNotification({
  requestPermissions: true
})

const showNotification = (title: string) => {
  if (isSupported) {
    return show({
      title,
      icon: './images/pwa-512x512.png',
      dir: 'auto',
      renotify: true,
      tag: 'pwa-update'
    })
  }
}

export default () => {
  if (!isSupported) {
    console.error('Service Worker is not supported in this browser.')
  }

  onBeforeMount(() => {
    registerSW({
      immediate: true,
      onOfflineReady: () => showNotification('网页已完成更新，您可以在断网后依然可以访问页面！'),
      onNeedRefresh: () => showNotification('检测到页面有更新，正在为您自动更新！'),
      onRegisteredSW(swUrl: string, r) {
        if (!r) return
        r.addEventListener('updatefound', () => {
          showNotification('检测到页面有更新，正在为您自动更新！')
        })
        setInterval(async () => {
          if (r.installing || !navigator) return;

          if ('connection' in navigator && !navigator.onLine) return;

          const {status} = await fetch(swUrl, {
            cache: 'no-store',
            headers: {
              cache: 'no-store',
              'cache-control': 'no-cache',
            },
          });
          if (status === 200) await r.update()
        }, intervalMS);
      },
      onRegisterError(e) {
        console.error('Service Worker registration error!', e)
      },
    })
  })
}

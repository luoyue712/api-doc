/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@bprogress/core/css'

declare module 'oh-my-live2d/dist/modules/models' {
  export class Models {
    model?: { expression(): boolean | Promise<boolean> }
    readonly modelIndex: number
    readonly modelClothesIndex: number
    loadNextModelClothes(): void
    loadNextModel(): void
  }
}

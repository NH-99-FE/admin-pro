import { createPinia } from 'pinia'
import piniaPersistedState from 'pinia-plugin-persistedstate'

const pinia = createPinia()
// 使用 piniaPersistedState 插件
pinia.use(piniaPersistedState)
export default pinia

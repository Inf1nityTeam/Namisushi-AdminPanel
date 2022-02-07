import {createApp} from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import SvgIcon from "@/app/common/baseWrapper/SvgIcon";

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.component('svg-icon', SvgIcon)

app.mount('#app')

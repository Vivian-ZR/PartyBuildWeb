import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store'
import VueQuillEditor from 'vue-quill-editor'
import BaiduMap from 'vue-baidu-map'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'


import './assets/styles/reset.css'
import './assets/styles/border.css'
import './assets/css/iconfont.css'


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
Vue.use(VueAxios, axios);
Vue.use(VueQuillEditor);

Vue.use(BaiduMap, {
  ak: 'AOnqzpvIPCm4QLk3zXotYudCGd8jddp3'
})
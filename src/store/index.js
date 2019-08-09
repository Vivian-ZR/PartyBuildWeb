import Vue from 'vue'
import Vuex from 'vuex'

// 使用vuex
Vue.use(Vuex)

const store = new Vuex.Store({

  // 全局变量
  state: {
    status: localStorage.getItem('status') || false,
    user: localStorage.getItem('user') || ''
  },

  // 修改全局变量必须通过mutations中的方法
  mutations: {
    login (state, payload) {
      state.status = payload[0];
      state.user = payload[1];
      localStorage.setItem('status', true);
      localStorage.setItem('user', JSON.stringify(payload[1]));   
    },
    logout (state) {
      state.status = false;
      localStorage.clear();
    }
  },

  // 异步方法用actions
  // actions不能直接修改全局变量，需要调用commit方法来触发mutation中的方法
  // actions: {
  //   login (context, payload) {
  //       context.commit('login', payload)
  //   },
  //   logout (context) {
  //       context.commit('logout')
  //   }
  // }
})

export default store
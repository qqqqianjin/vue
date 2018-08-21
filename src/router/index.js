import Vue from 'vue'
import Router from 'vue-router'
import vuex from 'vuex'
import goods from '@/components/goods/goods'
import ratings from '@/components/ratings/ratings'
import sellers from '@/components/seller/sellers'
// import '@/src/common/stylusindex.styl'
Vue.use(Router)
Vue.use(vuex)

const store = new vuex.Store({
  state:{
    selectType_count:2,
    onlyContent_Flag:false
  }
})
export default new Router({
	linkActiveClass:'active',
  store,
  routes: [
  	{
      	path: '/',
      	name: 'goods',
      	component: goods
    },
    {
      	path: '/goods',
      	name: 'goods',
      	component: goods
    },
    {
    	path:'/ratings',
    	name:'ratings',
    	component: ratings
    },
    {
    	path:'/sellers',
    	name:'sellers',
    	component: sellers
    }
  ]
})

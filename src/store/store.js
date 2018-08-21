import vue from 'vue'
import vuex from 'vuex'

vue.use(vuex);

const store = new vuex.Store({
	state:{
			selectType_count:2,
			onlyContent_Flag:false
		},
	mutations: {

	}
})

export default store
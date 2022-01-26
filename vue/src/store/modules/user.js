const state = {
    user:'',
}
const mutations = {
    SET_USER:(state,name)=>{
        state.user = name
    }
}
const actions = {
    setUSER({commit},name) {
        commit('SET_USER',name)
    }
}

export  default  {
    namespaced:true, //在不同页面中引入getter、actions、mutations时，需要加上所属的模块名
    state,
    mutations,
    actions
}
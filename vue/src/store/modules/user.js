const state = {
    user:'',
}
const mutations = {
    SET_USER:(state,user)=>{
        state.user = user
    }
}
const actions = {
    setUSER({commit},user) {
        commit('SET_USER',user)
    }
}

export  default  {
    namespaced:true, //在不同页面中引入getter、actions、mutations时，需要加上所属的模块名
    state,
    mutations,
    actions
}
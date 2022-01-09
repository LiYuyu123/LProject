const state = {
    rid:'',
}
const mutations = {
    SET_RID:(state,rid)=>{
        state.rid = rid
    }
}
const actions = {
    setRid({commit},rid) {
        commit('SET_RID',rid)
    }
}

export  default  {
    namespaced:true, //在不同页面中引入getter、actions、mutations时，需要加上所属的模块名
    state,
    mutations,
    actions
}
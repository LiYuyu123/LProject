import {createRouter, createWebHistory} from 'vue-router'
import * as cookies from "../assets/cookies";
/**
 * Note: 路由配置项
 *
 * hidden: true                     // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true                 // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                  // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                  // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                  // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect             // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'               // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * query: '{"id": 1, "name": "ry"}' // 访问路由的默认传递参数
 * meta : {
    noCache: true                   // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'                  // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'                // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false               // 如果设置为false，则不会在breadcrumb面包屑中显示
    activeMenu: '/system/user'      // 当路由设置了该属性，则会高亮相对应的侧边栏。
  }
 */
const routes = [
    {
        path: '/home',
        hidden: true,
        component: () => import('../layout/Layout.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login'),
    },
    {
        path: "/404",
        component: () => import("../views/404"),
    },
    {path: "/:pathMatch(.*)*", redirect: "/404"}, //错误页面重定象
]


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})


router.beforeEach((to, from, next) => {
    if (to.name !== 'login') {
        const token = cookies.getToken();
        if(!token){
            next({ name: "login",  query: { from: to.name  }}) //失败是给route 传个query:{from},就跳转到name为from的页面
        }else {
            next()
        }
        next({ name: "login",  query: { from: to.name  }})
    }else {
        next()
    }

    // if (to.name !== "Login") {
    //   const token = cookies.getToken();
    //   if (!token) {
    //     next({ name: "Login", query: { from: to.name } });
    //   } else {
    //     next();
    //     // 验证token有效性，并且请求用户信息。
    //     getUserInfo({ data: { token: token } })
    //       .then((msg) => {
    //         cookies.setToken(msg.token);
    //         // 存储rid至vuex
    //         store.dispatch("user/setRid", msg.rid);
    //         NProgress.done();
    //         next();
    //       })
    //       .catch(() => {
    //         next({ name: "Login", query: { from: to.name } });
    //       });
    //   }
    // } else {
    //   next();
    // }
});
export default router

import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import DetailSignInView from './views/DetailSignInView.vue'

Vue.use(Router)

var router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: DetailSignInView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
      meta: {
        authRequired: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const now_auth = Vue.cookie.get('Authorization');
  // 로그인된상태에서 Login 페이지로 접근하려할 시

  if ( to.name == 'login' ) {

    if (now_auth !== null) {

      if ( from.path == '/' ) {
        // 로그인한 사용자가 처음부터 /login으로 접근하려 하려는 경우
        router.push({
          path: '/'
        })
      }
    }
  }

  // authRequired는 Login을 필요로 하는 페이지 모두 Redirect 시킨다.
  if (to.matched.some(record => record.meta.authRequired)) {
    // 로그인이 되어있지 않다면 login 페이지로 리다이렉트

    if (now_auth === null) {
      router.push({
        path: '/login',
        query: {
          nextUrl: to.fullPath
        }
      })
    } else {
      router.push({
        path: '/'
      })
    }
  }

  // 정상 페이지 출력
  next();
});

export default router;

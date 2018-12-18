import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import DetailSignView from './views/DetailSignView.vue'
import JoinStoreView from './views/JoinStoreView.vue'
import EventView from './views/EventView.vue'
import CustomerCenter from './views/CustomerCenter.vue'
import MyBox from './views/MyBox.vue'
import Card from './views/Card.vue'
import Cash from './views/Cash.vue'

import DetailSignIn from '@/components/sign/DetailSignIn.vue'
import DetailSignUp from '@/components/sign/DetailSignUp.vue'
import DetailSignUpStep1 from '@/components/sign/DetailSignUpStep1.vue'
import DetailSignUpStep2 from '@/components/sign/DetailSignUpStep2.vue'
import DetailSignUpStep3 from '@/components/sign/DetailSignUpStep3.vue'

import MyBoxHome from '@/components/mybox/MyBoxHome.vue'
import MyBoxEditStep1 from '@/components/mybox/MyBoxEditStep1.vue'
import MyBoxEditStep2 from '@/components/mybox/MyBoxEditStep2.vue'
import PasswordEdit from '@/components/mybox/PasswordEdit.vue'
import MyBoxInquiry from '@/components/mybox/MyBoxInquiry.vue'

import HappyJoinStore from '@/components/joinStore/HappyJoinStore.vue'
import Store from '@/components/joinStore/Store.vue'
import StoreDetail from '@/components/joinStore/StoreDetail.vue'

import NowEvent from '@/components/event/NowEvent.vue'
import PreEvent from '@/components/event/PreEvent.vue'
import WinnerEvent from '@/components/event/WinnerEvent.vue'

import FAQ from '@/components/cscenter/FAQ.vue'
import CSCenterNotice from '@/components/cscenter/CSCenterNotice.vue'

import GiftCardBuyInfo from '@/components/giftcard/GiftCardBuyInfo'
import AfterPurchase from '@/components/common/AfterPurchase.vue'

import GiftCardCharge from '@/components/cash/pay.vue'

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
      path: '/sign',
      component: DetailSignView,
      children: [
        {
          path: 'in',
          name: 'login',
          component: DetailSignIn,
          meta: {
            authCantAccess: true
          }
        },
        {
          path: 'up',
          name: 'signup',
          component: DetailSignUp,
          meta: {
            authCantAccess: true
          }
        },
        {
          path: 'up/step1',
          name: 'signup/step1',
          component: DetailSignUpStep1,
          meta: {
            authCantAccess: true
          }
        },
        {
          path: 'up/step2',
          name: 'signup/step2',
          component: DetailSignUpStep2,
          meta: {
            authCantAccess: true
          }
        },
        {
          path: 'up/step3',
          name: 'signup/step3',
          component: DetailSignUpStep3,
          meta: {
            authCantAccess: true
          }
        },
      ],
    },
    {
      path: '/mybox',
      name: 'mybox',
      component: MyBox,
      meta: {
        authRequired: true
      },
      children: [
        {
          path: 'home',
          name: 'mybox/home',
          component: MyBoxHome
        },
        {
          path: 'editstep1',
          name: 'mybox/editstep1',
          component: MyBoxEditStep1
        },
        {
          path: 'editstep2',
          name: 'mybox/editstep2',
          component: MyBoxEditStep2
        },
        {
          path: 'passwordEdit',
          name: 'mybox/passwordEdit',
          component: PasswordEdit
        },
        {
          path: 'inquiry',
          name: 'mybox/inquiry',
          component: MyBoxInquiry
        }
      ]
    },
    {
      path: '/sitemap',
      name: 'sitemap',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/SiteMap.vue'),
      meta: {
        authRequired: true
      }
    },
    {
      path: '/store',
      component: JoinStoreView,
      children: [
        {
          path: 'happyShopStore',
          name: 'happyShopStore',
          component: HappyJoinStore,
          children: [
            {
              path: ':id',
              name:'happyJoinStoreDetail',
              component: StoreDetail,
            }
          ]
        },
        {
          path: 'onlineStore',
          component: Store
        },
        {
          path: 'offlineStore',
          component: Store
        }
      ]
    },
    {
      path: '/card',
      component: Card,
      children: [
        {
          path: 'giftCardBuyInfo',
          name: 'giftCardBuyInfo',
          component: GiftCardBuyInfo,
        },
      ],
      meta: {
        authRequired: true
      }
    },
    {
      path: '/cash',
      component: Cash,
      children: [
        {
          path: 'giftCardCharge',
          name: 'giftCardCharge',
          component: GiftCardCharge
        }
      ]
    },
    {
      path: '/complete',
      name: 'purchase_complete',
      component: AfterPurchase,
    },
    {
      path: '/event',
      component: EventView,
      children: [
        {
          path: 'now',
          name: 'nowEvent',
          component: NowEvent
        },
        {
          path: 'pre',
          name: 'preEvent',
          component: PreEvent
        },
        {
          path: 'winner',
          name: 'winnerEvent',
          component: WinnerEvent
        }
      ]
    },
    {
      path: '/customer',
      component: CustomerCenter,
      children: [
        {
          path: 'faq',
          name: 'faq',
          component: FAQ
        },
        {
          path: 'inquiry',
          name: 'inquiry'
        },
        {
          path: 'cscenter',
          name: 'cscenter'
        },
        {
          path: 'notice',
          name: 'notice',
          component: CSCenterNotice,
        },
        {
          path: 'pcsecure',
          name: 'pcsecure'
        },
        {
          path: 'outergiftcard',
          name: 'outergiftcard'
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const now_auth = Vue.cookie.get('Authorization');
  // 로그인된상태에서 Login 페이지로 접근하려할 시

  if (to.matched.some(record => record.meta.authCantAccess)) {

    if (now_auth !== null) {

      if ( from.path === '/' ) {
        next(from.fullPath);
        return false;
      } else {
        next(from.fullPath);
        return false;
      }
    }
  }

  // authRequired는 Login을 필요로 하는 페이지 모두 Redirect 시킨다.
  if (to.matched.some(record => record.meta.authRequired)) {
    // 로그인이 되어있지 않다면 login 페이지로 리다이렉트

    if (now_auth === null) {
      router.push({
        name: 'login',
        query: {
          nextUrl: to.fullPath
        }
      })
    }
  }

  // 정상 페이지 출력
  next();
});

export default router;

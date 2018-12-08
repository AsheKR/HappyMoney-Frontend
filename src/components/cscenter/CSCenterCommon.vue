<template>
  <div class="csCenterCommon">
    <div class="csCenter__menu">
      <div class="csCenter__menu--title"><span class="csIcon csIconbanner"></span><span>고객센터</span></div>
      <router-link :to="{ name: 'faq' }" style="border-left: 1px solid #666;"><div class="csCenter__menu--item"><span>FAQ</span></div></router-link>
      <router-link :to="{ name: 'inquiry' }"><div class="csCenter__menu--item"><span>1:1문의</span></div></router-link>
      <router-link :to="{ name: 'cscenter' }"><div class="csCenter__menu--item"><span>고객상담센터</span></div></router-link>
      <router-link :to="{ name: 'notice' }"><div class="csCenter__menu--item"><span>공지사항</span></div></router-link>
      <router-link :to="{ name: 'pcsecure' }"><div class="csCenter__menu--item"><span>PC보안가이드</span></div></router-link>
      <router-link :to="{ name: 'outergiftcard' }"><div class="csCenter__menu--item"><span>외부상품권</span></div></router-link>
    </div>
    <div class="csCenter__titleWrap">
      <div class="csCenter__title">
        <div class="csCenter__title__main">
          <span class="csCenter__title__main--title">{{ csList[nowCS].name }}</span>
          <span class="csCenter__title__main--desc">{{ csList[nowCS].desc }}</span>
        </div>
        <div class="csCenter__title__inputForm" v-if="csList[nowCS].input">
          <div class="csCenter__searchForm--form">
            <span>
              <span class="csCenter__searchForm--form--inputbox"><input type="text" v-model="vsearchItem" placeholder="검색어를 입력하세요"></span>
              <span class="csCenter__searchForm--form--button" @click="setSearchItem()">조회</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      csList: {
        'faq': {
          name: 'FAQ(자주묻는 질문)',
          desc: '',
          input: false
        },
        'inquiry': {
          name: '',
          desc: '',
          input: false
        },
        'cscenter': {
          name: '고객상담센터',
          desc: '해피머니 고객님을 위한 상담센터 안내입니다.',
          input: false
        },
        'notice': {
          name: '공지사항',
          desc: '해피머니에서 전하는 새로운 소식을 확인하세요.',
          input: true
        },
        'pcsecure': {
          name: 'PC보안가이드',
          desc: 'PC보안 및 점검방법과 최근 보안소식을 알려드립니다.',
          input: false
        },
        'outergiftcard': {
          name: '상품권 구매 확인 및 발송',
          desc: '해피머니 제휴 온라인 사이트에서 구매한 상품권 및 충전권을 확인 및 재발송을 하실 수 있습니다.',
          input: false
        },
      },
      nowCS: undefined,
    }
  },
  watch: {
    '$route.path': function() {
      this.changeNowCS();
    }
  },
  methods: {
    changeNowCS() {
      this.nowCS = this.$route.name;
    }
  },
  created() {
    this.changeNowCS();
  }
}
</script>

<style lang="scss">

 .csCenterCommon {
   margin-bottom: 50px;

   > .csCenter__menu {
     font-weight: bold;
     background-color: #454763;
     display: flex;
     align-items: center;

     > div {
       padding: 15px 15px;;
     }

     > .csCenter__menu--title {
       color: #bcd63f;
       font-size: 1.2em;
       display: flex;
     }

     > a {
       padding: 0 15px;

       > .csCenter__menu--item {
         color: white;
         font-size: 0.85em;
       }
     }
   }

   > .csCenter__titleWrap {
     height: 160px;
     border-bottom: 1px solid #e8e8e8;
     background: #f8f8f8;
     display: flex;
     align-items: center;

     > .csCenter__title {
       max-width: 1200px;
       display: flex;

       > .csCenter__title__main {
         padding-left: 30px;

         > span {
           text-align: left;
           display: block;
         }

         > .csCenter__title__main--title {
           font-size: 1.3em;
         }

         > .csCenter__title__main--desc {
           font-size: 0.8em;
           color: #777;
         }
       }

       > .csCenter__title__inputForm {
         padding-left: 50px;
         > .csCenter__searchForm--form {
           margin-left: auto;

           > span {
             display: grid;
             grid-template-columns: 3fr 1fr;
             align-items: center;

             > .csCenter__searchForm--form--inputbox {
               height: 100%;
               background-color: white;
               border: 1px solid black;
               text-align: left;
               display: flex;
               padding-left: 20px;

               > input {
                 border: none;
               }
             }

             > .csCenter__searchForm--form--button {
               padding: 12px 35px;
               border: 1px solid #454545;
               background-color: #4f4f4f;
               color: #fff;
             }
           }
         }
       }
     }
   }

 }

</style>

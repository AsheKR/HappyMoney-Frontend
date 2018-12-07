<template>
  <div class="happyJoinStore">
    <div class="happyJoinStores" v-if="show">
      <div class="happyJoinStore_desc">
        * 해피머니는 통신판매 중개자로서 판매(서비스)되는 모든 재화나 용역에 대해서는 아래의 매장에서 책임하에 운영되고 있습니다.
      </div>
      <div class="happyJoinStoreWrap" v-for="shopStore in shopStores" :key="shopStore.id" v-if="shopStore.usepoint_set.length">
        <div class="happyJoinStore_title">
          <p>{{ shopStore.name }}몰</p>
        </div>
        <div class="happyJoinStore_content">
          <div class="happyJoinStore_detail" v-for="point in shopStore.usepoint_set" :key="point.id">
            <div class="happyJoinStoreimage">
              <img :src="point.shop_image" alt="">
            </div>
            <router-link :to="{ name: 'happyJoinStoreDetail', params: { id: point.id } }">
              <div class="happyJoinStore_detail__text">
                <p>이용안내 ></p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <router-view :hostname="hostname"/>
  </div>
</template>

<script>
export default {
  props: ['hostname'],
  data() {
    return {
      shopStores: undefined,
      show: false
    }
  },
  watch: {
    '$route.path': function() {
      this.routeCheck();
    },
  },
  methods: {
    getAPIUsePointLists() {
      const url = this.hostname + '/apis/use-point/import';
      this.$http.get(url).then(
        response => {
          if (response.status == '200') {
            this.shopStores = response.data;
            this.show = !this.show;
          }
        },
        error => {
          console.log(error);
        });
    },
    getAPIUsePointDetail() {
      console.log("Detail");
    },
    routeCheck() {
      if ('id' in this.$route.params) {
        // Detail 페이지로 넘어옴
        this.show = false;
      } else {
        this.getAPIUsePointLists();
      }
    }
  },
  created() {
    this.routeCheck();
  }
}
</script>

<style lang="scss">
  .happyJoinStore {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;

    > .happyJoinStores {

      > .happyJoinStore_desc {
        margin-top: 50px;
        color: rgb(243, 89, 35);
        font-size: 0.8em;
        width: 100%;
        text-align: left;
      }

      > .happyJoinStoreWrap {

        > .happyJoinStore_title {
          box-sizing: content-box;
          margin: 30px 0;
          padding-left: 21px;
          border-color: rgb(84, 84, 84);
          background-color: rgb(102, 102, 102);
          color: white;
          display: flex;
          align-items: center;

          > p {
            font-weight: bold;
          }
        }

        > .happyJoinStore_content {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          grid-gap: 20px;

          > .happyJoinStore_detail {
            padding: 15px 0 0;
            border: 1px solid #ddd;

            > .happyJoinStoreimage {
              padding: 0 20px;
            }

            > a {
              > .happyJoinStore_detail__text {
                border-top: 1px solid #ddd;
                background-color: #eee;
                cursor: pointer;

                > p {
                  display: block;
                  padding: 5px 30px 10px;
                  margin: 0;
                  font-size: 0.8em;
                  font-weight: bold;
                }
              }
            }
          }
        }
      }
    }
  }

  @media only screen and (max-width: 900px) {
    .happyJoinStore_content {
      grid-template-columns: repeat(3, 1fr) !important;
      grid-gap: 10px !important;
    }
  }
</style>

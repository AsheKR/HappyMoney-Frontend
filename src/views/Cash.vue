<template>
  <div class="cash">
    <Breadcrumb />
    <Balance :userInfo="userInfo"/>
    <div class="content">
      <router-view :hostname="hostname"/>
    </div>
  </div>
</template>

<script>
import Balance from '@/components/common/Balance.vue'
import Breadcrumb from '@/components/common/Breadcrumb.vue'

export default {
  data() {
    return {
      userInfo: undefined,
      hostname: require('@/assets/js/variable.js').hostname
    }
  },
  components: {
    Balance,
    Breadcrumb
  },
  methods: {
    getAPIUserProfileInfo() {
      const url = this.hostname + '/apis/members/get/';
      const Authorization = this.$cookie.get('Authorization');
      this.$http.get(url, {headers: {'Authorization': Authorization}}).then(
        response => {
          if (response.status == '200') {
            this.userInfo = response.data;
            this.userShow = true;
          }
        },
        error => {
          console.log(error);
        });
    },
  },
  created() {
    this.getAPIUserProfileInfo()
  }
}
</script>

<style lang="scss">

  .cash {

    > .content {
      margin: auto;
      max-width: 1500px;
    }
  }

</style>

<template>
  <div v-if="show" class="breadcrumb" :style="{ 'background-image': 'url('+require('@/assets/css/images/common/bgSubTl.png')+')'}">
    <h2>{{ title }}</h2>
    <div class="breadcrumb_desc">
      <p>홈 > &nbsp;</p>
      <p>{{ title }} > &nbsp;</p>
      <p>{{ subtitle }}</p>
    </div>
  </div>
</template>

<script>
  import { EventBus } from './EventBus.js';
  export default {

    data() {
      return {
        title: '',
        subtitle: '',
        menus: '',
        show: false
      }
    },
    created() {

      EventBus.$once('CreateBreadCrumb', (parentMenus) => {
        const pathTitle = this.$route.path.split('/')[1]
        const pathSubTitle = this.$route.path.split('/')[2]
        this.menus = parentMenus;

        for (var menu in this.menus) {
            if (pathTitle in this.menus[menu].title) {
              this.title = this.menus[menu].title[pathTitle];
            }

            if (pathSubTitle in this.menus[menu].subTitle) {
              this.subtitle = this.menus[menu].subTitle[pathSubTitle];
            }
        }

        this.show = true;
      })
    }
  }
</script>

<style lang="scss">
.breadcrumb {
  height: 160px;
  text-align: center;
  border-bottom: 1px solid #e8e8e8;
  background: #f8f8f8 50% 50% no-repeat;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > h2 {
    margin: 0;
    font-size: 2.0em;
  }

  > .breadcrumb_desc {
    display: flex;

    > p {
      color: #666;
      margin: 0;

      &:last-child {
        color: #000;
        text-decoration: underline;
      }
    }
  }
}
</style>

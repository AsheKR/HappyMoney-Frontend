<template>
  <div id="notice">
    <div class="notice_section_wrap">
      <span class="notice_section notice_section1">
        <span class="ico notice"></span>
        <h2>공지사항</h2>
      </span>
      <span class="notice_section notice_section2">
        <transition :name="transitionName" mode="out-in">
          <div class="recent_notice_list" :key="current" v-if="show" @click="routeNotice(recent_notice[current].id)">
            <span class="recent_notice_title">{{ NoticeLimited(recent_notice[current].title) }}</span>
            <span class="recent_notice_date">{{ recent_notice[current].created_at }}</span>
          </div>
        </transition>
      </span>
      <span class="notice_section notice_section3">
        <div class="btn btn-prev" aria-label="Previous slide" @click="slide(-1)">
          <span class="ico bx-prev"></span>
        </div>
        <div class="btn btn-stop" aria-label="Stop Slide" @click="intervalChange()">
          <span class="ico bx-stop" v-if="interval_value !== undefined"></span>
          <span class="ico bx-start" v-else></span>
        </div>
        <div class="btn btn-next" aria-label="Next slide" @click="slide(1)">
          <span class="ico bx-next"></span>
        </div>
      </span>
      <span class="notice_section notice_section4">
        <router-link :to="{ name: 'notice' }">더보기 +</router-link>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['hostname'],
    data() {
      return {
        recent_notice: [],
        current: 0,
        direction: 1,
        transitionName: "fade",
        show: false,
        interval_value: undefined
      }
    },
    methods: {
      routeNotice(id) {
        this.$router.push({
          name: 'notice',
          params: {
            'id': id
          }
        })
      },
      slide(dir) {
        this.direction = dir;
        dir === 1
          ? (this.transitionName = "slide-next")
          : (this.transitionName = "slide-prev");
        var len = this.recent_notice.length;
        this.current = (this.current + dir % len + len) % len;
      },
      intervalChange() {
        if (this.interval_value !== undefined) {
          clearInterval(this.interval_value);
          this.interval_value = undefined;
        } else {
          this.interval_value = setInterval(() => {this.slide(1) }, 5000)
        }
      },
      NoticeLimited(str) {
        var h = 40;
        if (window.innerWidth < 800) {
          h=24;
        }
        if ( str.length > h ) {
          return str.substring(0, h) + '...'
        } else {
          return str
        }
      }
    },
    created() {
      const url = this.hostname + '/apis/posts/notice/';
      this.$http.get(url).then(
        response => {
          if (response.status == '200') {
            this.recent_notice = response.data.results;
          }
          this.show = !this.show;
          this.interval_value = setInterval(() => { this.slide(1) }, 5000);
        },
        error => {

        });
    },
  }
</script>

<style lang="scss" scoped>

  /* FADE IN */
  .fade-enter-active {
    transition: opacity 1s;
  }
  .fade-enter {
    opacity: 0;
  }

  /* GO TO NEXT SLIDE */
  .slide-next-enter-active,
  .slide-next-leave-active {
    transition: transform 0.3s ease-in-out;
  }
  .slide-next-enter {
    transform: translateY(100%);
  }
  .slide-next-leave-to {
    transform: translateY(-100%);
  }

  /* GO TO PREVIOUS SLIDE */
  .slide-prev-enter-active,
  .slide-prev-leave-active {
    transition: transform 0.3s ease-in-out;
  }

  .slide-prev-enter {
    transform: translateY(-100%);
  }
  .slide-prev-leave-to {
    transform: translateY(100%);
  }

  #notice {
    box-sizing: content-box;
    background-color: #595d88;
    padding: 10px 0;

    .btn {
      cursor: pointer;
    }

    > div.notice_section_wrap {
      max-width: 1200px;
      margin: auto;
      display: grid;
      grid-auto-flow: column;
      align-items: center;

      > span.notice_section {
        display: block;

        &.notice_section1 {

          > span {
            vertical-align: middle;
          }
          > h2 {
            display: inline-block;
            font-size: 0.8em;
            border-right: 1px solid #fff;
            padding-right: 15px;
            color: #7ae8ff;
          }
        }

        &.notice_section2 {
          padding-left: 15px;
          display: flex;
          justify-content: flex-start;
          overflow: hidden;

          > .recent_notice_list {
            color: #fff;
            font-size: 0.8em;
            cursor: pointer;
            display: flex;
            align-items: center;
            width: 100%;

            > .recent_notice_date {
              margin-left: auto;
            }
          }
        }

        &.notice_section4 {
          margin-left: 10px;
          font-size: 0.8em;
          > a{
            color: #7ae8ff;

            &:hover {
              color: #ff9d7a;
            }
          }
        }
      }
    }

  }

  @media only screen and (max-width: 800px) {
    .notice_section1 {
      > span {
        display: none;
      }
    }

    .notice_section2 {
      margin-right: 5em !important;

      > .recent_notice_list {
        > .recent_notice_date {
          display: none;
        }
      }
    }
  }
</style>

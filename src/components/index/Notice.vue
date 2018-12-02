<template>
  <div id="notice">
    <span class="notice_section notice_section1">
      <span class="ico notice"></span>
      <h2>공지사항</h2>
    </span>
    <span class="notice_section notice_section2">
      <transition :name="transitionName" mode="out-in">
        <div class="recent_notice_list" :key="current" v-if="show">
          <span class="recent_notice_title">{{ NoticeLimited(recent_notice[current].title) }}</span>
          <span class="recent_notice_date">{{ recent_notice[current].created_at }}</span>
        </div>
      </transition>
    </span>
    <span class="notice_section notice_section3">
      <div class="btn btn-prev" aria-label="Previous slide" @click="slide(-1)">
        <span class="ico bx-prev"></span>
      </div>
      <div class="btn btn-next" aria-label="Stop Slide" @click="">
        <span class="ico bx-stop"></span>
      </div>
      <div class="btn btn-next" aria-label="Next slide" @click="slide(1)">
        <span class="ico bx-next"></span>
      </div>
    </span>
    <span class="notice_section notice_section4">
      <a href="#">더보기 +</a>
    </span>
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
        show: false
      }
    },
    methods: {
      slide(dir) {
        this.direction = dir;
        dir === 1
          ? (this.transitionName = "slide-next")
          : (this.transitionName = "slide-prev");
        var len = this.recent_notice.length;
        this.current = (this.current + dir % len + len) % len;
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
        },
        error => {
          console.log(error);
        });
    }
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
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    padding: 25px 0;

    .btn {
      cursor: pointer;
    }

    > span.notice_section {

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
        margin-right: 10em;

        > .recent_notice_list {
          color: #fff;
          font-size: 0.8em;

          > .recent_notice_date {
            margin-left: 10em;
          }
        }
      }

      &.notice_section4 {
        margin-left: 10px;
        font-size: 0.8em;
        > a{
          color: #7ae8ff;
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

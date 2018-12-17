<template>
  <div id="eventSection">
    <h2>해피머니 이벤트</h2>
    <p class="eventDesc">다양한 혜택이 가득한 해피머니 이벤트</p>
    <div class="eventList" v-if="show">
      <div v-for="event in eventsLimit" :key="event.id" class="eventWrap">
        <a href="#">
          <div class="eventContentWrap">
            <img :src="event.general_image" alt="">
            <div class="eventText">
              <div class="eventdim"></div>
              <span class="eventTitle">{{ EvenetTitleLimited(event.title) }}</span>
              <span class="eventDate">{{ event.start }} ~ {{ event.end }}</span>
            </div>
          </div>
        </a>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    props: ['events'],
    data() {
      return {
        windowWidth: 0,
        childEvents: [],
        show: false
      }
    },
    methods: {
      EvenetTitleLimited(str) {
        var h = 30;
        if (window.innerWidth < 800) {
          h = 20;
        }
        if ( str.length > h ) {
          return str.substring(0, h) + '...'
        } else {
          return str
        }
      }
    },
    watch: {
      events: function(newVal) {
        this.childEvents = newVal;
        this.show = !this.show;
      }
    },
    computed: {
      eventsLimit() {
        if (this.windowWidth < 800) {
          return this.childEvents.slice(0, 3);
        } else {
          return this.childEvents.slice(0, 3);
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        window.addEventListener('resize', () => {
          this.windowWidth = window.innerWidth;
        })
      })
    }
  }
</script>

<style lang="scss">
#eventSection {
  padding: 40px 0 70px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  margin: auto;

  img {
    width: 100%;
    object-fit: cover;
  }

  > h2 {
    margin: 0;
  }

  > p.eventDesc {
    margin: 5px 0 30px;
  }

  > .eventList {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 0.8rem;

    .eventWrap {
      background-color: #fff;
      border: 1px solid #e3e3e3;
      text-align: left;

      &:hover {
        .eventdim {
          display: block !important;
        }
      }

      > a{
        display: block;

        > .eventContentWrap {
          display: grid;

          .eventText {
            font-size: 0.87rem;
            padding: 10px 10px 0 15px;
            position: relative;

            > .eventdim {
              position: absolute;
              background-color: black;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              opacity: 0.3;
              z-index: 1;
              display: none;
            }

            > .eventTitle {
              display: block;
              font-size: 0.9em;
              font-weight: bold;
            }

            > .eventDate {
              display: block;
              padding: 10px 0 10px;
              font-size: 0.9em;
              color: #666;
            }
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 800px) {
  .eventList {
    grid-template-columns: repeat(1, 1fr) !important;
  }
}
</style>

<template>
  <div id="EventCarousel" v-if="show">
    <div id="slider">
      <transition-group :name="transitionName">
        <div :key="current" class="slide" :style="{ 'background-image': 'url('+childEvents[current].banner+')'}"></div>
      </transition-group>
      <div class="btn btn-prev" aria-label="Previous slide" @click="slide(-1)">
        &#10094;
      </div>
      <div class="btn btn-next" aria-label="Next slide" @click="slide(1)">
        &#10095;
      </div>
  </div>
  </div>
</template>
<script>
export default {
  props: ['events'],
  data() {
    return {
      childEvents: null,
      current: 0,
      direction: 1,
      transitionName: "fade",
      show: false
    }
  },
  watch: {
    events: function(newVal) {
      this.childEvents = [];
      newVal.forEach((e) => {
        if (e.banner != null) {
          this.childEvents.push(e);
        }
      });
      if (this.childEvents.length !== 0) {
        this.show = true;
        setInterval(() => { this.slide(1) }, 7000);
      }
    }
  },
  methods: {
    slide(dir) {
      this.direction = dir;
      dir === 1
        ? (this.transitionName = "slide-next")
        : (this.transitionName = "slide-prev");
      var len = this.childEvents.length;
      this.current = (this.current + dir % len + len) % len;
    }
  },
}
</script>

<style lang="css" scoped>

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
  transition: transform 0.5s ease-in-out;
}
.slide-next-enter {
  transform: translate(100%);
}
.slide-next-leave-to {
  transform: translate(-100%);
}

/* GO TO PREVIOUS SLIDE */
.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: transform 0.5s ease-in-out;
}
.slide-prev-enter {
  transform: translate(-100%);
}
.slide-prev-leave-to {
  transform: translate(100%);
}

#slider {
  width: 100%;
  height: 400px;
  position: relative;
}

.slide {
  width: 100%;
  height: 400px;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}

.btn {
  z-index: 10;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  position: absolute;
  top: calc(50% - 35px);
  left: 1%;
  transition: transform 0.3s ease-in-out;
  user-select: none;
}

.btn-next {
  left: auto;
  right: 1%;
}

.btn:hover {
  transform: scale(1.1);
}

</style>

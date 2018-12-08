<template>
  <div class="winnerEvent">
    <div class="winnerEvent__searchForm">
      <div class="winnerEvent__searchForm--title">
        <span>당첨자 발표 총<strong>{{ count }}</strong>건</span>
      </div>
      <div class="winnerEvent__searchForm--form">
        <span>
          <span class="winnerEvent__searchForm--form--inputbox"><input type="text" v-model="vsearchItem" placeholder="검색어를 입력하세요"></span>
          <span class="winnerEvent__searchForm--form--button" @click="setSearchItem()">조회</span>
        </span>
      </div>
    </div>
    <div class="winnerEvent__contentWrap">
      <div class="winnerEvent__content winnerEvent__content--desc">
        <div class="winnerEvent__content--numbering">
          <span> <strong>번호</strong> </span>
        </div>
        <div class="winnerEvent__content--title">
          <span> <strong>제목</strong> </span>
        </div>
        <div class="winnerEvent__content--date">
          <span> <strong>기간</strong> </span>
        </div>
      </div>
      <div class="winnerEvent__content" v-for="event in eventList" :key="event.id">
        <div class="winnerEvent__content--numbering">
          <span>{{ event.id }}</span>
        </div>
        <div class="winnerEvent__content--title">
          <span>{{ event.title }}</span>
        </div>
        <div class="winnerEvent__content--date">
          <span>{{ event.start }} ~ {{ event.end }}</span>
        </div>
      </div>
    </div>
    <div class="nowEvent__pagination">
      <a @click.prevent="getAPIEventList(pre)" v-if="pre"><</a>
      <a @click.prevent="getAPIEventList(page[1])" v-for="page in pageList" :class="{ active: page[2] }">
        <span v-if="page[1] == null">...</span>
        <span v-else>{{ page[1] }}</span>
      </a>
      <a @click.prevent="getAPIEventList(next)" v-if="next">></a>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss">

  .winnerEvent {
    margin-top: 25px;

    > .winnerEvent__searchForm {
      border: 1px solid #ddd;
      background-color: #f5f5f5;
      display: flex;
      align-items: center;
      padding: 30px;
      margin-bottom: 30px;

      > .winnerEvent__searchForm--title {
        font-weight: bold;

        strong {
          color: #f35923;
        }
      }

      > .winnerEvent__searchForm--form {
        margin-left: auto;

        > span {
          display: grid;
          grid-template-columns: 3fr 1fr;
          align-items: center;

          > .winnerEvent__searchForm--form--inputbox {
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

          > .winnerEvent__searchForm--form--button {
            padding: 12px 35px;
            border: 1px solid #454545;
            background-color: #4f4f4f;
            color: #fff;
          }
        }
      }
    }

    > .winnerEvent__contentWrap {
      display: grid;

      > .winnerEvent__content {
        display: grid;
        grid-template-columns: 1.5fr 8fr 3fr;
        border-bottom: 1px solid #eee;
        align-items: center;

        > div {
          padding: 20px 0;
          font-size: 0.9em;
        }

        &:first-child {
          border-top: 1px solid black;

          > div {
            color: black !important;
            text-align: center;
          }
        }

        > .winnerEvent__content--numbering {

        }

        > .winnerEvent__content--title {
          text-align: left;
          padding-left: 30px;
        }

        > .winnerEvent__content--date {

        }
      }
    }

    > .nowEvent__pagination {
      margin-top: 50px;

      > a {
        display: inline-block;
        padding: 7px 11px;
        background-color: white;
        border: 1px solid #ccc;
        cursor: pointer;

        &.active {
          background-color: black;
          color: white;
          border: 1px solid black;
        }
      }
    }

  }

</style>

<template>
  <div class="topMyBoxMenu">
    <div class="topMyBoxMenu__title">
      <span class="happyBoxIcon happyBoxTitleIcon"></span>
      <span>HappyBox</span>
    </div>
    <div class="topMyBoxMenu__item">
      <span>쿠폰북</span>
    </div>
    <div class="topMyBoxMenu__item">
      <span>스탬프</span>
    </div>
    <div class="topMyBoxMenu__item">
      <span>추천</span>
    </div>
    <div class="topMyBoxMenu__item">
      <span>핫딜</span>
    </div>
    <div class="topMyBoxMenu__item">
      <span>행복나눔</span>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
  .topMyBoxMenu {
    display: flex;
    align-items: center;
    background-color: #454763;

    > .topMyBoxMenu__title {
      display: flex;
      align-items: center;
      padding-left: 15px;
      padding-right: 15px;

      > span {
        font-weight: bold;
        color: #fec524;
        font-size: 1.2em;

        &:last-child {
          margin-left: 10px;
        }
      }
    }

    > .topMyBoxMenu__item {
      padding: 20px 0;

      &:nth-child(2) {

        > span {
          border-left: 1px solid #666;
        }
      }

      > span {
        font-size: 0.9em;
        color: #ddd;
        padding: 0 15px;
      }
    }
  }
</style>

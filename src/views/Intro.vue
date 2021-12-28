<template>
  <div id="intro">
    <div>
      <h1>
        <img src="~@/assets/img/intro/tit_01.png" alt="" />
        <img src="~@/assets/img/intro/landscape/tit_01.png" alt="" />
      </h1>
    </div>

    <div>
      <router-link to="/survey">
        <img src="~@/assets/img/intro/btn_start.png" alt="시작하기" />
      </router-link>

      <span>본 테스트는 생활습관에 대한 간단한 질문으로 나에게 필요한 보장을
      알아보는 테스트 입니다.<br>보험에 대한 자세한 내용은 교보생명 FP에게
      문의 바랍니다.</span>
    </div>

    <img src="~@/assets/img/intro/img_logo.png" alt="logo" />

    <button type="button" @click="onClickKakao()">공유하기</button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {

  },
  methods: {
    // 'Kakao' is not defined 뜨면 window.Kakao,Link
    onClickKakao(){
      window.Kakao.Link.sendCustom({
        templateId: 64601 ,
        templateArgs: {
          'title': '나에게 지금 필요한 것은?',
          'description': '제한된 시간 동안 간단한 질문에 답하여 필요한 부분을 살펴보세요.'
        }
      });
    },
  }
}
</script>

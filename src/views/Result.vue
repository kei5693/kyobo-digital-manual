<template>
  <div id="result" :class="{landScape : responsive}">
    <div class="inner">
      <div class="titleBox">
        <h2>
          <img src="~@/assets/img/result/img_title01.png" alt="나에게 지금 필요한 보장은?" />
          <img src="~@/assets/img/result/landscape/img_title01.png" alt="나에게 지금 필요한 보장은?" />
        </h2>
      </div>
      <div class="contentBox">
        <div class="inner">
          <div class="visualContents">
            <ul>
              <li>
                <h3>암보장</h3>
                <div>
                  <ul>
                    <li
                      v-for="(disease, index) in $store.state.diseaseData.slice(0, 5)"
                      :key="`disease${index}`"
                      :class="{on : disease.maxValue}"
                    >
                      <em>{{disease.title}}</em>
                      <div class="graph"><span :style="[responsive ? {height: scoreData[index]+'%'} : {width: scoreData[index]+'%'}]"></span></div>
                    </li>
                  </ul>
                </div>
              </li>

              <li :class="{on : $store.state.diseaseData[5].maxValue}">
                <h3>심/뇌혈관<br>질환 보장</h3>
                <div class="graph"><span :style="[responsive ? {height: scoreData[5]+'%'} : {width: scoreData[5]+'%'}]"></span></div>
              </li>

              <li :class="{on : $store.state.diseaseData[6].maxValue}">
                <h3>치매 보장</h3>
                <div class="graph"><span :style="[responsive ? {height: scoreData[6]+'%'} : {width: scoreData[6]+'%'}]"></span></div>
              </li>
            </ul>

            <div class="text">
              <p>위 막대그래프는 사용자의 답변을 반영하여 상대적으로 표현한 것으로 단순 참고용입니다.</p>
            </div>

            <div class="btnBox">
              <button type="button" @click="resetSurvey()">다시하기</button>
              <button type="button" @click="goToGuarantee()">왜 보장이<br>필요할까요?</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      scoreData: [],
      status: false,
      width: 0,
      height: 0,
      maxTotalScore: 0,
    }
  },
  mounted() {
    this.diseaseScore();
  },
  computed: {
    responsive(){
      var detectWidth = false;
      var winWidth = window.innerWidth;
      var winHeight = window.innerHeight;

      if(winWidth > winHeight && winWidth >= 1024){
        detectWidth = true
      }
      return detectWidth
    },
  },
  methods: {
    // store의 data를 최대 점수는 23점 기준으로 백분율 소숫점 2자릿수까지 계산
    diseaseScore(){
      var target = this.$store.state.diseaseData;
      var maxScore = 23;

      target.forEach(el => {
        // if(el.totalScore < 12){
        //   el.totalScore *= 2
        // }
        var calc = Number((el.totalScore / maxScore * 100).toFixed(2));
        this.scoreData.push(calc);
      });
      // data에서 최대값과 같은 인덱스를 뽑아서 store data의 값을 변경
      var max = Math.max(...this.scoreData);
      this.scoreData.forEach((el, index) => {
        if(el == max){
          this.maxTotalScore = this.$store.state.diseaseData[index].totalScore;
          this.$store.commit('detectMaxScore', index);
        }
      });
    },
    resetSurvey(){
      this.$router.push('/');
      this.$store.commit('resetSurvey');
    },
    goToGuarantee(){
      this.$router.push('/guarantee');
    }
  },
}
</script>
<template>
  <div id="result" class="guarantee">
    <div class="inner">
      <div class="titleBox">
        <h2>
          <img src="~@/assets/img/guarantee/img_title01.png" alt="" />
          <img src="~@/assets/img/guarantee/landscape/img_title01.png" alt="" />
          <!-- <span @click="onclickPopup(4)"><em>{{$store.state.timer}}</em>초</span> -->
          <span><em>{{$store.state.timer}}</em>초</span>
        </h2>
      </div>
      <div class="contentBox">
        <div class="inner">
          <div class="visualContents">
            <div class="guaranteePopup">
              <p>각 질병에 대해 자세히<br>알고 싶으시면 물음표를 터치해보세요!</p>
              <ul>
                <li
                  v-for="(disease, index) in diseaseData"
                  :key="`disease-${index}`"
                  @click="onclickPopup(index)"
                >
                  <img :src="require(`@/assets/img/guarantee/icon_disease0${index+1}.png`)" alt="" />
                  <span>{{disease.title}}</span>
                  <strong><span>{{calcStatistics[index]}}명</span> {{disease.text}}</strong>
                </li>
              </ul>
            </div>

            <p>
              <span>나에게 시급한 보장, 확인해 보셨나요?</span>
              무작정 서두르기 보다 꼼꼼히 확인하고<br>
              필요한 것부터 차근차근 준비해 보세요!
            </p>

            <div class="btnBox">
              <button type="button" @click="resetSurvey()">다시하기</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <transition name="layerPopupEnter" mode="out-in">
      <div id="layerPopup" v-show="popupOpen">
        <div class="inner">
          <div class="visual">
            <img
              v-for="(disease, index) in 5"
              :key="`disease-${index}`"
              :src="require(`@/assets/img/guarantee/img_popup${index+1}.png`)"
              :class="{on : currentPopup == index}"
              alt=""
            />
          </div>
          <div class="visual">
            <img
              v-for="(disease, index) in 5"
              :key="`disease-${index}`"
              :src="require(`@/assets/img/guarantee/landscape/img_popup${index+1}.png`)"
              :class="{on : currentPopup == index}"
              alt=""
            />
          </div>
          <button type="button" @click="popupClose()">닫기</button>
        </div>
      </div>
    </transition>

  </div>
</template>
<script>
export default {
  data(){
    return {
      diseaseData: [
        {
          title: '암환자',
          text: '발생'
        },
        {
          title: '심혈관질환으로',
          text: '사망'
        },
        {
          title: '뇌졸중 환자',
          text: '발생'
        },
        {
          title: '치매유병자',
          text: '발생'
        }
      ],
      popupOpen: false,
      currentPopup: 0,
    }
  },
  mounted() {
    
  },
  computed: {
    calcStatistics(){
      var result = [];
      var timer = this.$store.state.timer;
      var statisticsData = [0.57, 0.58, 0.47, 0.21];

      statisticsData.forEach(el => {
        var calc = Number((timer * el).toFixed(1));
        result.push(calc);
      });
      return result
    },
  },
  methods: {
    onclickPopup(value){
      this.currentPopup = value;
      this.popupOpen = true;
    },
    popupClose(){
      this.popupOpen = false;
    },
    resetSurvey(){
      this.$router.push('/');
      this.$store.commit('resetSurvey');
    },
  },
}
</script>
<template>
  <div id="survey">
    <div class="progressTimerBox">
      <div class="stepProgress">
        <ul>
          <li
            v-for="(el, index) in surveyData.length"
            :key="`el-${index}`"
            :class="{off : surveyStep > index, active : surveyStep == index}"
          ><span>{{index+1}}</span>
          </li>
        </ul>
      </div>
      <div class="timer">
        <div :class="{on : redAlert}">
          <span>0 : </span>
          <span>{{timer}}</span>
        </div>
      </div>
    </div>

    <div class="questionBox">
      <div
        v-for="(survey, index) in surveyData"
        :key="`survey-${index}`"
        :class="{on : surveyStep == index}"
      >
        <div class="visualBox">
          <img :src="require(`@/assets/img/survey/visual_q${index+1}.jpg`)" alt="" />
          <img :src="require(`@/assets/img/survey/landscape/visual_q${index+1}.jpg`)" alt="" />
          <div class="titleBox">
            <h2>
              <img src="~@/assets/img/survey/icon_question.png" alt="q" />
              <img :src="require(`@/assets/img/survey/tit_q${index+1}.png`)" alt="" />
            </h2>
          </div>
        </div>


        <div
          class="answerBox"
          :class="`list${survey.answer.length}`"
        >
          <button
            type="button"
            v-for="(answer, answerIdx) in survey.answer"
            :key="`answer-${answerIdx}`"
            :class="{on : answer.isSelected}"
            @click="onClickSurvey(index, answerIdx)"
            v-html="answer.title"
          >
          </button>
        </div>

        <div class="btnBox">
          <button type="button" @click="btnSurvey('prev')">이전</button>
          <button type="button" @click="btnSurvey('next', examine)">다음</button>
        </div>
      </div>
    </div>

    <transition name="layerPopupEnter" mode="out-in">
      <div id="layerTimeover" v-show="timeOver">
        <div class="inner">
          <img src="~@/assets/img/result/img_timeover01.png" alt="" />
          <img src="~@/assets/img/result/icon_timer.png" alt="" />
          <p>
            60초의 시간이 지났습니다.
            <strong>아래 버튼을 눌러 다시 시작해보세요.</strong>
          </p>
          <button type="button" @click="resetSurvey()">다시하기</button>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {

  },
  data(){
    return {
      surveyData: [
        {
          question: '나의 나이는?',
          duplicate : false,
          answer: [
            {
              title: '30대 이하',
              isSelected: false,
              applicable: false,
              diseasetype: [1,0,0,1,0,0,0],
            },
            {
              title: '40대',
              isSelected: false,
              applicable: false,
              diseasetype: [1,0,1,1,1,1,0],
            },
            {
              title: '50대',
              isSelected: false,
              applicable: false,
              diseasetype: [2,2,2,2,2,2,3],
            },
            {
              title: '60대 이상',
              isSelected: false,
              applicable: false,
              diseasetype: [3,3,4,3,3,3,4],
            },
          ]
        },
        {
          question: '나의 성별은?',
          duplicate : false,
          answer: [
            {
              title: '<em>남자</em>',
              isSelected: false,
              applicable: false,
              diseasetype: [2,2,2,2,2,1,1],
            },
            {
              title: '<em>여자</em>',
              isSelected: false,
              applicable: false,
              diseasetype: [1,1,1,1,1,2,3],
            },
          ]
        },
        {
          question: '나는 담배를 ㅇㅇㅇ다.',
          duplicate : false,
          answer: [
            {
              title: '피우고 있다',
              isSelected: false,
              applicable: false,
              diseasetype: [3,2,8,1,3,2,2],
            },
            {
              title: '끊은지 6개월 넘었다',
              isSelected: false,
              applicable: false,
              diseasetype: [1,0,3,0,2,0,1],
            },
            {
              title: '피우지 않는다',
              isSelected: false,
              applicable: false,
              diseasetype: [0,0,0,0,0,0,0],
            },
          ]
        },
        {
          question: '고기는 OOO 먹는게 좋다',
          duplicate : false,
          answer: [
            { 
              title: '숯불에 구워먹는게 좋다.<br>(직화구이)',
              isSelected: false,
              applicable: false,
              diseasetype: [2,1,3,3,1,2,0],
            },
            {
              title: '삶아서 담백하게 먹는게 좋다.<br>(수육)',
              isSelected: false,
              applicable: false,
              diseasetype: [0,0,0,0,0,0,-1],
            },
          ]
        },
        {
          question: '밥은 OOO 먹는게 최고지!',
          duplicate : false,
          answer: [
            {
              title: '흰 쌀밥',
              isSelected: false,
              applicable: false,
              diseasetype: [3,0,1,1,1,0,0],
            },
            {
              title: '잡곡밥',
              isSelected: false,
              applicable: false,
              diseasetype: [0,0,0,0,0,0,0],
            },
            {
              title: '검정콩밥',
              isSelected: false,
              applicable: false,
              diseasetype: [-1,-1,-1,-1,-1,-1,0],
            },
          ]
        },
        {
          question: '내가 평소 자주 먹는 음식은 OOO음식이다',
          duplicate : false,
          answer: [
            {
              title: '간이 충분히 베인',
              isSelected: false,
              applicable: false,
              diseasetype: [1,1,0,1,1,1,0],
            },
            {
              title: '얼큰하고 매운',
              isSelected: false,
              applicable: false,
              diseasetype: [2,2,0,3,1,3,0],
            },
            {
              title: '싱거워도 건강해보이는',
              isSelected: false,
              applicable: false,
              diseasetype: [0,0,0,-1,0,0,0],
            },
          ]
        },
        {
          question: '과일과 채소를 일주일에 3일 이상 챙겨먹는다',
          duplicate : false,
          answer: [
            {
              title: '<span>O</span>',
              isSelected: false,
              applicable: false,
              diseasetype: [1,0,0,2,0,0,1],
            },
            {
              title: '<span>X</span>',
              isSelected: false,
              applicable: false,
              diseasetype: [0,0,0,0,0,0,0],
            },
          ]
        },
        {
          question: '나는 일주일에 3일 이상 운동을 한다.',
          duplicate : false,
          answer: [
            {
              title: '<span>O</span>',
              isSelected: false,
              applicable: false,
              diseasetype: [1,1,1,1,1,2,2],
            },
            {
              title: '<span>X</span>',
              isSelected: false,
              applicable: false,
              diseasetype: [0,0,0,0,0,0,0],
            },
          ]
        },
        {
          question: '좋은 일이든 아니든 술이 빠지면 섭섭하다',
          duplicate : false,
          answer: [
            {
              title: '<span>O</span>',
              isSelected: false,
              applicable: false,
              diseasetype: [2,4,1,1,3,1,1],
            },
            {
              title: '<span>X</span>',
              isSelected: false,
              applicable: false,
              diseasetype: [0,0,0,0,0,0,0],
            },
          ]
        },
        {
          question: '나는 평소에 스트레스를',
          duplicate : false,
          answer: [
            {
              title: '담아두는 편이다',
              isSelected: false,
              applicable: false,
              diseasetype: [0,2,0,0,2,1,3],
            },
            {
              title: '바로바로 해소하는 편이다.',
              isSelected: false,
              applicable: false,
              diseasetype: [0,0,0,0,0,0,0],
            },
          ]
        },
        {
          question: '현재 내가 꾸준히 복용 중인 약은?<br>(중복선택 가능)',
          duplicate : true,
          answer: [
            {
              title: '비타민 등 영양제',
              isSelected: false,
              applicable: false,
              diseasetype: [-1,-1,-1,-1,-1,-1,-1],
            },
            {
              title: '감기약 등 질병치료를 위한 약',
              isSelected: false,
              applicable: false,
              diseasetype: [0,0,0,0,0,0,0],
            },
            {
              title: '혈압약 등 만성질환 관련 약',
              isSelected: false,
              applicable: false,
              diseasetype: [1,2,0,0,2,1,2],
            },
            {
              title: '없음',
              isSelected: false,
              applicable: true,
              diseasetype: [0,0,0,0,0,0,0],
            },
          ]
        },
        {
          question: '우리 가족 중에<br>(중복선택 가능)',
          duplicate : true,
          answer: [
            {
              title: '암환자가 있(었)다.',
              isSelected: false,
              applicable: false,
              diseasetype: [2,1,1,2,2,0,0],
            },
            {
              title: '뇌심혈관 환자가 있(었)다.',
              isSelected: false,
              applicable: false,
              diseasetype: [0,0,0,0,0,1,0],
            },
            {
              title: '치매환자가 있(었)다.',
              isSelected: false,
              applicable: false,
              diseasetype: [0,0,0,0,0,0,3],
            },
            {
              title: '해당사항 없음',
              isSelected: false,
              applicable: true,
              diseasetype: [0,0,0,0,0,0,0],
            },
          ]
        },
        {
          question: '거울 속 나의 체형을 본 나의 생각은',
          duplicate : false,
          answer: [
            {
              title: '살 좀 빼야 할 것 같은데?',
              isSelected: false,
              applicable: false,
              diseasetype: [0,2,0,2,2,3,2],
            },
            {
              title: '이 정도면 나쁘지 않은데?',
              isSelected: false,
              applicable: false,
              diseasetype: [0,0,0,0,0,0,0],
            },
          ]
        },
        {
          question: '하루종일 회사에서의 나는 주로 OOO일한다',
          duplicate : false,
          answer: [
            {
              title: '앉아서 일한다',
              isSelected: false,
              applicable: false,
              diseasetype: [0,0,1,1,0,1,0],
            },
            {
              title: '서서 일한다',
              isSelected: false,
              applicable: false,
              diseasetype: [0,0,0,0,0,0,0],
            },
          ]
        },
        {
          question: `주기적으로 '건강검진 대상자' 안내를 받으면 나는 OOO한다.`,
          duplicate : false,
          answer: [
            {
              title: '시간을 내서라도 꼭 받는다',
              isSelected: false,
              applicable: false,
              diseasetype: [0,0,0,0,0,0,0],
            },
            {
              title: '바쁘고 귀찮아서 잘 받지 않는다',
              isSelected: false,
              applicable: false,
              diseasetype: [1,1,1,1,0,1,0],
            },
          ]
        },
      ],
      timer: 60,
      surveyStep: 0,
      redAlert: false,
      interval: '',
      timeOver: false,
    }
  },
  computed: {
    // 선택지를 1개라도 눌렀는지 판단
    examine(){
      var targetData = this.surveyData[this.surveyStep].answer;
      var result = false;
          
      targetData.forEach(el => {
        if(el.isSelected) result = true
      });
      return result
    },
    selectedAnswerList() {
      return this.surveyData.reduce((r,d)=>{
          var selectedAnswer = d.answer.filter(a=>a.isSelected);

          if(selectedAnswer.length > 0) {
            selectedAnswer.forEach(data => {
              r.push(data.diseasetype)
            })
          }
        return r
      }, []);
    },
  },
  watch: {
    selectedAnswerList() {
      this.$store.commit("resetDiseaseDataForIndex");

      if(this.selectedAnswerList.length > 0) {
        this.selectedAnswerList.forEach((d)=>{
          this.$store.commit("sumDiseaseDataForIndex", d);
        });
      }
    }
  },
  methods: {
    timerCount(){
      this.interval = setInterval(() => {
        if (this.timer > 0) {
          this.timer--; 
          if(this.timer < 10) this.timer = "0"+this.timer;
          if(this.timer < 11) this.redAlert = true;
        } else {
          console.log('end');
          clearInterval(this.interval);
          this.timeOver = true;
        }
      }, 1000);
    },
    resetServeyAnswer(surveyIdx) {
      this.surveyData[surveyIdx].answer.forEach((answer) => {
        answer.isSelected = false;
      });
    },
    selectServeyAnswer(surveyIdx, answerIdx) {
      this.surveyData[surveyIdx].answer[answerIdx].isSelected = !this.surveyData[surveyIdx].answer[answerIdx].isSelected;
    },
    onClickSurvey(surveyIdx, answerIdx){
      //중복 선택이 가능한 질문인 경우
      if(this.surveyData[surveyIdx].duplicate){
          if(this.surveyData[surveyIdx].answer[answerIdx].applicable){
            this.resetServeyAnswer(surveyIdx);
            this.selectServeyAnswer(surveyIdx, answerIdx);
          } else {
            this.selectServeyAnswer(surveyIdx, answerIdx);
            this.surveyData[surveyIdx].answer.find(d=>d.applicable).isSelected = false;
          }
      } else {
        this.resetServeyAnswer(surveyIdx);
        this.selectServeyAnswer(surveyIdx, answerIdx);
      }
    },
    btnSurvey(value, examine){     
      switch(value){
        case 'prev':
          if(this.surveyStep > 0){
            this.surveyStep--;
          } else {
            //this.$router.push('/');
            //this.timerReset();
            this.resetSurvey();
          }
          break
        default:
          // computed examine으로 선택한 값이 있는지 판단
          if(examine == true){
            if(this.surveyStep < this.surveyData.length-1){
              this.surveyStep++;
            } else {
              this.$router.push('/result');
              this.$store.commit('getSurveyTime', this.timer);
              this.timerReset();
            }
          }
          break
      }
    },
    timerReset(){
      this.timer = 60;
      this.surveyStep = 0;
      this.redAlert = false;
      this.timeOver = false;
    },
    resetSurvey(){
      this.timerReset();
      this.$store.commit('resetSurvey');
      this.$router.push('/');
    },
  },
  mounted() {
    this.timerCount();
  },
}
</script>

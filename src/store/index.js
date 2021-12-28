import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    diseaseData: [
      {title : '위암', totalScore: 3, maxValue: false},
      {title : '간암', totalScore: 7, maxValue: false},
      {title : '폐암', totalScore: 4, maxValue: false},
      {title : '대장암', totalScore: 5, maxValue: false},
      {title : '췌장암', totalScore: 10, maxValue: false},
      {title : '심/뇌혈관 질환 보장', totalScore: 9, maxValue: false},
      {title : '치매보장', totalScore: 12, maxValue: false},
    ],
    timer: 0,
  },
  mutations: {
    resetDiseaseDataForIndex: (state) => {
      state.diseaseData.forEach(d=>{
        d.totalScore = 0
      })
    },
    sumDiseaseDataForIndex: (state, scoreList) => {
      if(state.diseaseData.length == scoreList.length) {
        state.diseaseData.forEach((d,i)=>{
          state.diseaseData[i].totalScore += parseInt(scoreList[i])
        })
      } else {
        Error("값에 길이가 동일하지 않습니다.")
      }
    },
    detectMaxScore: (state, maxValueIndex) => {
      state.diseaseData[maxValueIndex].maxValue = true
    },
    resetSurvey: (state) => {
      state.diseaseData.forEach( el => {
        el.totalScore = 0;
        el.maxValue = false
      });
      state.timer = 60;
    },
    getSurveyTime: (state, timerValue) => {
      var calcValue = 60 - timerValue;
      state.timer = calcValue;
    },
  },
  actions: {
  },
  modules: {
  }
})

<template>
  <div>
    <ul class="ass-list">
      <li v-for="item in assessmentList" :key="item.index">
        <a-row type="flex" :gutter="12">
          <a-col :span="5" align="center">
            <div class="item-img">
              <img :src="item.icon" :alt="item.title" />
            </div>
            <a-button type="primary" ghost @click="showDetailAssessments(item.type, item.id)">开始评估</a-button>
          </a-col>
          <a-col :span="19">
            <ul class="item-list">
              <li>
                <h3 class="title">{{ item.title }}</h3>
                <p class="content">{{ item.content }}</p>
                <p class="result">
                  <a-row type="flex">
                    <a-col :span="18" v-if="item.result">
                      <span v-if="item.title=='五病综合筛查'">慢病综合风险：</span>
                      <span v-else>评估结果：</span>
                      <span v-if="item.level">{{ item.level }},</span>
                      <span v-html="item.result"></span>
                    </a-col>
                    <a-col
                      :span="6"
                      align="right"
                      pull="1"
                      v-if="item.date && item.result"
                    >{{ item.date }}</a-col>
                  </a-row>
                </p>
              </li>
            </ul>
          </a-col>
        </a-row>
      </li>
    </ul>
    <assessment-form ref="assessmentForm" @back="handleFeedback"></assessment-form>
    <assessment-five-form ref="assessmentFiveForm" @back="handleFeedback"></assessment-five-form>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import Mock, { Random } from 'mockjs2'
import { assessmentLatest, otherLatest } from '../../api/assessment'
import AssessmentForm from './AssessmentForm'
import AssessmentFiveForm from './AssessmentFiveForm'

const assessmentList = [
  {
    icon: require('../../assets/assessment/img_11.png'),
    title: '五病综合筛查',
    type: 'getFive',
    content:
      '采用指标法判定是否为五病的高危人群，并通过专病症状评估患者的五病风险分层，我们将根据评估的结果给您制定个性化的健康管理方案',
    level: '',
    result: '',
    date: '',
  },
  {
    icon: require('../../assets/assessment/img_1.png'),
    title: '心脑血管评估',
    type: 'getAscvd',
    id: '',
    content:
      '旨在对您的心脑血管疾病进行评估，已明确您的心脑血管属于高危、中危或低危。可根据您的不同心脑血管疾病风险分层来采取不同的防控措施',
    level: '',
    result: '',
    date: '',
  },
  {
    icon: require('../../assets/assessment/img_2.png'),
    title: '生活质量评估',
    type: 'getSSY',
    id: 10,
    content:
      '旨在通过询问您对自己健康状况的看法、您的感觉如何以及您进行日常生活的能力如何来评估您的生活质量综合状况，我们将根据您的评分情况对您进行个体化的中西医指导',
    level: '',
    result: '',
    date: '',
  },
  {
    icon: require('../../assets/assessment/img_3.png'),
    title: '糖尿病患者自我效能评估',
    type: 'getSSY',
    id: 11,
    content:
      '旨在通过糖尿病患者自我管理的评分表来评估您对糖尿病的认知情况，我们将根据评估结果对您制定个性化的健康管理方案',
    level: '',
    result: '',
    date: '',
  },
  {
    icon: require('../../assets/assessment/img_5.png'),
    title: '营养评估',
    type: 'getSSY',
    id: 3,
    content: '旨在通过问询您过去一个月的膳食情况来评估您的营养水平，我们将根据评估结果对您进行个性化的营养膳食指导',
    level: '',
    result: '',
    date: '',
  },
  {
    icon: require('../../assets/assessment/img_6.png'),
    title: '抑郁症评估',
    type: 'getSSY',
    id: 4,
    content:
      '本量表为56岁以上者的专用抑郁筛查量表，而非抑郁症的诊断工具，每次检查需15分钟左右。临床主要评价56岁以上者以下症状：情绪低落、活动减少易激惹、退缩，以及对过去、现在和站起来的消极评价。但56岁以上主食欲下降、睡眠障碍等症状属于正常现象，使用该量表有时易误评为抑郁症。因此分数超过11分者应做进一步检查 ',
    level: '',
    result: '',
    date: '',
  },
  {
    icon: require('../../assets/assessment/img_9.png'),
    title: '睡眠评估',
    type: 'getSSY',
    id: 8,
    content:
      '该量表适用于睡眠障碍患者、精神障碍患者评价睡眠质量，同时也适用于一般人睡眠质量的评估。请选择填写最符合您近期实际情况的答案',
    level: '',
    result: '',
    date: '',
  },
]

@Component({
  components: {
    AssessmentForm,
    AssessmentFiveForm,
  },
  props: {
    id: String,
  },
})
export default class extends Vue {
  data() {
    return {
      assessmentList,
    }
  }
  async created() {}
  showDetailAssessments(type, assessmentId) {
    // 五病筛查
    if (type === 'getFive') {
      this.$refs.assessmentFiveForm.show(this.id)
    } else {
      this.$refs.assessmentForm.show(this.id, type, assessmentId)
    }
  }
  handleFeedback(name) {
    // if(name === 'five'){
    //   this.$emit('back','five')
    // }else{
    //   this.getLatest(name)
    // }

    this.$emit('back')
    if (name !== 'five') {
      this.getLatest(name)
    }
  }
  getLatestFive(risk, date) {
    this.assessmentList[0].level = ''
    this.assessmentList[0].result = risk || ''
    this.assessmentList[0].date = date || ''
  }
  getLatestAll() {
    const type = [
      'Ascvd',
      '生活质量SF-12量表',
      '糖尿病自我效能评估',
      'Determine营养风险检测',
      '快速抑郁评估PHQ-9',
      '匹兹堡睡眠评估量表',
    ]
    const self = this
    this.assessmentList.forEach(function(el) {
      el.level = ''
      el.result = ''
      el.date = ''
    })
    type.forEach(function(key) {
      self.getLatest(key)
    })
  }
  // 获取ssy,Ascvd最新评估结果
  async getLatest(type) {
    const params = {
      patientId: this.id,
      type: type,
    }
    const assessmentResult = (await otherLatest(null, params)).data
    if (!assessmentResult) {
      switch (type) {
        case 'Ascvd':
          this.assessmentList[1].level = ''
          this.assessmentList[1].result = ''
          this.assessmentList[1].date = ''
          break
        case '生活质量SF-12量表':
          this.assessmentList[2].level = ''
          this.assessmentList[2].result = ''
          this.assessmentList[2].date = ''
          break
        case '糖尿病自我效能评估':
          this.assessmentList[3].level = ''
          this.assessmentList[3].result = ''
          this.assessmentList[3].date = ''
          break
        case 'Determine营养风险检测':
          this.assessmentList[4].level = ''
          this.assessmentList[4].result = ''
          this.assessmentList[4].date = ''
          break
        case '快速抑郁评估PHQ-9':
          this.assessmentList[5].level = ''
          this.assessmentList[5].result = ''
          this.assessmentList[5].date = ''
          break
        case '匹兹堡睡眠评估量表':
          this.assessmentList[6].level = ''
          this.assessmentList[6].result = ''
          this.assessmentList[6].date = ''
          break
      }
      return
    }
    assessmentResult.result = assessmentResult.result && JSON.parse(assessmentResult.result)
    switch (assessmentResult.type) {
      case 'Ascvd':
        this.assessmentList[1].level = assessmentResult.result.level || ''
        this.assessmentList[1].result = assessmentResult.result.join('<br>')
        this.assessmentList[1].date = assessmentResult.createDate || ''
        break
      case '生活质量SF-12量表':
        this.assessmentList[2].level = assessmentResult.result.level || ''
        this.assessmentList[2].result = assessmentResult.result.suggestion || ''
        this.assessmentList[2].date = assessmentResult.createDate || ''
        break
      case '糖尿病自我效能评估':
        this.assessmentList[3].level = assessmentResult.result.level || ''
        this.assessmentList[3].result = assessmentResult.result.suggestion || ''
        this.assessmentList[3].date = assessmentResult.createDate || ''
        break
      case 'Determine营养风险检测':
        this.assessmentList[4].level = assessmentResult.result.level || ''
        this.assessmentList[4].result = assessmentResult.result.suggestion || ''
        this.assessmentList[4].date = assessmentResult.createDate || ''
        break
      case '快速抑郁评估PHQ-9':
        this.assessmentList[5].level = assessmentResult.result.level || ''
        this.assessmentList[5].result = assessmentResult.result.suggestion || ''
        this.assessmentList[5].date = assessmentResult.createDate || ''
        break
      case '匹兹堡睡眠评估量表':
        this.assessmentList[6].level = assessmentResult.result.level || ''
        this.assessmentList[6].result = assessmentResult.result.suggestion || ''
        this.assessmentList[6].date = assessmentResult.createDate || ''
        break
    }
  }
}
</script>

<style lang="less" scoped>
.ass-list,
.item-list {
  margin: 0;
  padding: 0;
}
.ass-list li,
.item-list li {
  list-style: none;
}

.ass-list > li {
  padding: 15px 0;
  border-bottom: 1px solid #ddd;
}
.ass-list > li:last-child {
  border: 0;
}
.item-img {
  width: 105px;
  height: 105px;
  margin-bottom: 25px;
  box-shadow: 0 0 5px #ccc;
}
.item-list .title {
  font-size: 18px;
  color: #000;
}
.item-list .content {
  min-height: 78px;
  line-height: 1.2;
  font-size: 18px;
  color: #b3b3b3;
}
.item-list .result {
  margin: 0;
  font-size: 18px;
  color: #f39800;
}
</style>

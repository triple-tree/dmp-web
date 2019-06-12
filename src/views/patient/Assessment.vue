<template>
  <div>
    <ul class="ass-list">
      <li v-for="item in assessmentList" :key="item.index">
        <a-row type="flex" gutter="12">
          <a-col :span="5" align="center">
            <div class="item-img">
              <img :src="item.icon" :alt="item.title">
            </div>
            <a-button type="primary" ghost>开始评估</a-button>
          </a-col>
          <a-col :span="19">
            <ul class="item-list">
              <li>
                <h3 class="title">{{ item.title }}</h3>
                <p class="content">{{ item.content }}</p>
                <p class="result">
                  <a-row type="flex">
                    <a-col :span="12" v-if="item.result">
                      评估结果：{{ item.result }}
                    </a-col>
                    <a-col :span="12" align="right" pull="1" v-if="item.date">
                      {{ item.date }}
                    </a-col>
                  </a-row>
                </p>
              </li>
            </ul>
          </a-col>
        </a-row>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import Mock, { Random } from 'mockjs2'

const assessmentList = [{
  icon: require('../../assets/assessment/img_11.png'),
  title: '五病综合筛查',
  content: '采用指标法判定是否为五病的高危人群，并通过专病症状评估患者的五病风险分层，我们将根据评估的结果给您制定个性化的健康管理方案',
},
{
  icon: require('../../assets/assessment/img_1.png'),
  title: '心脑血管评估',
  content: '旨在对您的心脑血管疾病进行评估，已明确您的心脑血管属于高危、中危或低危。可根据您的不同心脑血管疾病风险分层来采取不同的防控措施',
}, {
  icon: require('../../assets/assessment/img_2.png'),
  title: '生活质量评估',
  content: '旨在通过询问您对自己健康状况的看法、您的感觉如何以及您进行日常生活的能力如何来评估您的生活质量综合状况，我们将根据您的评分情况对您进行个体化的中西医指导',
  result: '高危',
  date: '2019-06-03',
}, {
  icon: require('../../assets/assessment/img_3.png'),
  title: '糖尿病患者自我效能评估',
  content: '旨在通过糖尿病患者自我管理的评分表来评估您对糖尿病的认知情况，我们将根据评估结果对您制定个性化的健康管理方案',
}, {
  icon: require('../../assets/assessment/img_5.png'),
  title: '营养评估',
  content: '旨在通过问询您过去一个月的膳食情况来评估您的营养水平，我们将根据评估结果对您进行个性化的营养膳食指导',
}, {
  icon: require('../../assets/assessment/img_6.png'),
  title: '抑郁症评估',
  content: '本量表为56岁以上者的专用抑郁筛查量表，而非抑郁症的诊断工具，每次检查需15分钟左右。临床主要评价56岁以上者以下症状：情绪低落、活动减少易激惹、退缩，以及对过去、现在和站起来的消极评价。但56岁以上主食欲下降、睡眠障碍等症状属于正常现象，使用该量表有时易误评为抑郁症。因此分数超过11分者应做进一步检查 ',
}, {
  icon: require('../../assets/assessment/img_9.png'),
  title: '睡眠评估',
  content: '该量表适用于睡眠障碍患者、精神障碍患者评价睡眠质量，同时也适用于一般人睡眠质量的评估。请选择填写最符合您近期实际情况的答案',
  result: '高危',
  date: '2019-06-03',
}]

@Component({
  components: {
  },
  props: {
  },
})
export default class extends Vue {
  data() {
    return {
      assessmentList,
    }
  }
  async created() {}
}
</script>

<style lang="less" scoped>
.ass-list,
.item-list{
  margin: 0;
  padding: 0;
}
.ass-list li,
.item-list li{
  list-style: none;
}

.ass-list > li{
  padding: 15px 0;
  border-bottom: 1px solid #ddd;
}
.ass-list > li:last-child{
  border:0;
}
.item-img{
  width: 105px;
  height: 105px;
  margin-bottom: 25px;
  box-shadow:0 0 5px #ccc;
}
.item-list .title{
  font-size: 18px;
  color: #000;
}
.item-list .content{
  min-height: 78px;
  line-height: 1.2;
  font-size: 18px;
  color: #b3b3b3;
}
.item-list .result{
  margin: 0;
  font-size: 18px;
  color: #f39800;
}
</style>

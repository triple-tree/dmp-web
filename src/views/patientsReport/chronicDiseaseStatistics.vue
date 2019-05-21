<template>
  <a-row>
    <a-col :xl="18" :lg="18" :md="12" :sm="24" :xs="24">
      <!-- https://vue.ant.design/components/card-cn/# -->
      <a-card title="慢病患者分布">
        <v-chart :forceFit="true" :height="height" :data="statusPatients">
          <v-tooltip/>
          <v-axis/>
          <v-legend/>
          <v-bar position="类别*人数" color="name" :adjust="adjust"/>
        </v-chart>
      </a-card>

      <a-card title="慢病健康处方分布">
        <v-chart :forceFit="true" :height="height" :data="statusPlans">
          <v-tooltip/>
          <v-axis/>
          <v-legend/>
          <v-bar position="类别*处方数" color="name" :adjust="adjust"/>
        </v-chart>
      </a-card>
    </a-col>
    <a-col :xl="6" :lg="6" :md="12" :sm="24" :xs="24">
      <a-card title="全部患者">
        <p>{{this.statusAll.all}}</p>
      </a-card>
      <a-card title="高血压+糖尿病">
        <p>{{this.statusAll.ascvdPatients}}</p>
      </a-card>
      <a-card title="高血压">
        <p>{{this.statusAll.copdPatients}}</p>
      </a-card>
      <a-card title="糖尿病">
        <p>{{this.statusAll.diabetesAndHypertensionPatients}}</p>
      </a-card>
      <a-card title="脑卒中">
        <p>{{this.statusAll.diabetesPatients}}</p>
      </a-card>
      <a-card title="冠心病">
        <p>{{this.statusAll.strokePatients}}</p>
      </a-card>
      <a-card title="慢阻肺">
        <p>{{this.statusAll.hypertensionPatients}}</p>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import DataSet from '@antv/data-set'
import { statsAll, statsPatients, statsPlans } from '@/api/stats'

// see more v-chart docs on https://viserjs.github.io/demo.html#/viser/bar/grouped-column
// or can use https://v-charts.js.org/#/histogram
export default {
  async created() {
    await this.loadStatsPatientsData()
    await this.loadStatsPlansData()
    await this.loadStatsAllData()
  },
  methods: {
    async loadStatsPatientsData() {
      const res = await statsPatients()
      const data = res.data
      /* construct sourceData like this
        [
          {
            name: '患者人数',
            diabetesAndHypertension: 0,
            ascvd: 2,
            diabetes: 3,
            hypertension: 1,
            stroke: 0,
            copd: 0
          },
          {
            name: '高危人数',
            diabetesAndHypertension: 7,
            ascvd: 2,
            diabetes: 1,
            hypertension: 1,
            stroke: 4,
            copd: 2
          }
        ]
      */
      const sourceData = [{ name: '患者人数' }, { name: '高危人数' }]
      for (const item in data) {
        sourceData[0][item] = data[item].patients
        sourceData[1][item] = data[item].danger
      }
      const dv = new DataSet.View().source(sourceData)
      // console.info(`dv: ${JSON.stringify(dv, null, 2)}`)
      dv.transform({
        type: 'fold',
        fields: ['diabetesAndHypertension', 'ascvd', 'diabetes', 'hypertension', 'stroke', 'copd'],
        key: '类别',
        value: '人数'
      })
      // console.info(`dv transform: ${JSON.stringify(dv, null, 2)}`)
      this.statusPatients = dv.rows
    },

    async loadStatsPlansData() {
      const res = await statsPlans()
      const data = res.data
      const sourceData = [{ name: '患者健康处方' }, { name: '高危人群健康处方' }]
      for (const item in data) {
        sourceData[0][item] = data[item].patients
        sourceData[1][item] = data[item].danger
      }
      const dv = new DataSet.View().source(sourceData)
      dv.transform({
        type: 'fold',
        fields: ['diabetesAndHypertension', 'ascvd', 'diabetes', 'hypertension', 'stroke', 'copd'],
        key: '类别',
        value: '处方数'
      })
      this.statusPlans = dv.rows
    },

    async loadStatsAllData() {
      const res = await statsAll()
      const data = res.data
      this.statusAll = data
    }
  },
  data() {
    return {
      statusAll: {
        all: 0,
        ascvdPatients: 0,
        copdPatients: 0,
        diabetesAndHypertensionPatients: 0,
        diabetesPatients: 0,
        strokePatients: 0,
        hypertensionPatients: 0
      },

      statusPatients: [],
      statusPlans: [],
      height: 400,
      adjust: [
        {
          type: 'dodge'
        }
      ]
    }
  }
}
</script>
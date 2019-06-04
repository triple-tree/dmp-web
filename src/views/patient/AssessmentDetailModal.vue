<template>
  <a-modal
    title="评估筛查详情"
    :width="450"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form" layout="horizontal">
        <div :style="{ marginBottom:'10px'}">
          <span class="ill-status">慢病综合风险：</span>
          <span class="ill-value">{{ model.chronicDiseaseRisk }}</span>
        </div>
        <div class="chronic-disease-status">
          <chronic-disease-status
            iconTypeName="hypertension"
            :status="model.hypertensionRisk"
            :collapsed="false"
          ></chronic-disease-status>
          <chronic-disease-status
            iconTypeName="diabetes"
            :status="model.diabetesRisk"
            :collapsed="false"
          ></chronic-disease-status>
          <chronic-disease-status
            iconTypeName="stroke"
            :status="model.strokeRisk"
            :collapsed="false"
          ></chronic-disease-status>
          <chronic-disease-status iconTypeName="ascvd" :status="model.ascvdRisk" :collapsed="false"></chronic-disease-status>
          <chronic-disease-status iconTypeName="copd" :status="model.copdRisk" :collapsed="false"></chronic-disease-status>
        </div>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { statsAll, statsPatients, statsPlans } from '@/api/stats'
import pick from 'lodash.pick'
import { assessmentDetail } from '../../api/assessment'
import ChronicDiseaseStatus from '@/components/ChronicDiseaseStatus'

@Component({
  components: {
    ChronicDiseaseStatus,
  },
  props: {},
})
export default class AssessmentDetailModal extends Vue {
  data() {
    return {
      visible: false,
      confirmLoading: false,
      model: {},
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: {
          md: { span: 24 },
          sm: { span: 24 },
        },
        wrapperCol: {
          md: { span: 24 },
          sm: { span: 24 },
        },
        horizontalLabelCol: {
          md: { span: 8 },
          sm: { span: 8 },
        },
        horizontalWrapperCol: {
          md: { span: 16 },
          sm: { span: 16 },
        },
      },
    }
  }

  async setData(id) {
    const assessment = (await assessmentDetail(null, { id })).data
    this.model = { ...this.model, ...assessment }
    console.info(`assessment: ${JSON.stringify(assessment)}, this.model: ${JSON.stringify(this.model)}`)
  }

  async show(id) {
    console.info(`show assessment: ${id}`)
    this.visible = true
    this.setData(id)
  }
  handleOk() {
    this.visible = false
  }

  handleCancel() {
    this.visible = false
  }
}
</script>

<style lang="less" scoped>
</style>

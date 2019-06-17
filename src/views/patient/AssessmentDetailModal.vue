<template>
  <a-modal
    title="五病综合筛查详情"
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
          <chronic-disease-status iconTypeName="hypertension" :status="model.hypertensionRisk"></chronic-disease-status>
          <chronic-disease-status iconTypeName="diabetes" :status="model.diabetesRisk"></chronic-disease-status>
          <chronic-disease-status iconTypeName="stroke" :status="model.strokeRisk"></chronic-disease-status>
          <chronic-disease-status iconTypeName="ascvd" :status="model.ascvdRisk"></chronic-disease-status>
          <chronic-disease-status iconTypeName="copd" :status="model.copdRisk"></chronic-disease-status>
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
import { assessmentAssess } from '../../api/assessment'
import ChronicDiseaseStatus from '@/components/ChronicDiseaseStatus'
import { constants } from 'crypto';

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

  async setData(values) {
    const assessment = (await assessmentAssess(values)).data
    this.model = { ...this.model, ...assessment }
    const data = {
      risk: this.model.chronicDiseaseRisk,
      date: this.model.assessmentDate
    }
    this.$emit('back','five',data)
    console.info(`assessment: ${JSON.stringify(assessment)}, this.model: ${JSON.stringify(this.model)}`)
  }

  async show(values) {
    console.info(`show assessment: ${values}`)
    this.visible = true
    this.setData(values)
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

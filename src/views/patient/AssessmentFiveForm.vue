<template>
  <a-modal
    title="五病风险评估筛查"
    :width="450"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    okText="提交"
    cancelText="关闭"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form" layout="vertical">
        <a-collapse v-model="activeKey" :bordered="false">
          <a-collapse-panel header="既往史" key="1" :style="customStyle">
            <a-form-item label="是否患糖尿病">
              <a-radio-group 
                v-decorator="['factors.previousHistoryDiabetes', {rules: [{required: true, message: '请选择！'}]}]">
                <a-radio :value="1">是</a-radio>
                <a-radio :value="0">否</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="是否患高血压">
              <a-radio-group>
                <a-radio :value="1">是</a-radio>
                <a-radio :value="0">否</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="是否患脑卒中">
              <a-radio-group>
                <a-radio :value="1">是</a-radio>
                <a-radio :value="0">否</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="是否患冠心病">
              <a-radio-group>
                <a-radio :value="1">是</a-radio>
                <a-radio :value="0">否</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="是否患慢阻肺">
              <a-radio-group>
                <a-radio :value="1">是</a-radio>
                <a-radio :value="0">否</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-collapse-panel>
          <a-collapse-panel header="This is panel header 2" key="2" :style="customStyle">
            <a-form-item
              label="是否患糖尿病"
            >
              <a-radio-group name="radioGroup" :defaultValue="1">
                <a-radio :value="1">是</a-radio>
                <a-radio :value="0">否</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-collapse-panel>
          <a-collapse-panel header="This is panel header 3" key="3" :style="customStyle">
            <a-form-item
              label="是否患糖尿病"
            >
              <a-radio-group name="radioGroup" :defaultValue="1">
                <a-radio :value="1">是</a-radio>
                <a-radio :value="0">否</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-collapse-panel>
        </a-collapse>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { statsAll, statsPatients, statsPlans } from '@/api/stats'
import pick from 'lodash.pick'
import { assessmentForm } from '../../api/assessment'
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
      customStyle: 'fontSize:18px',
      activeKey: ['1','2','3']
    }
  }

  async setData(type,id) {
    const assessment = (await assessmentForm({ type, id })).data
    this.model = { ...this.model, ...assessment }
    console.info(`assessment: ${JSON.stringify(assessment)}, this.model: ${JSON.stringify(this.model)}`)
  }

  async show() {
    console.info(`show assessment:`)
    this.visible = true
    //this.setData(type,id)
  }
  handleOk() {
    this.visible = false

  }
  handleOk() {
    const { form: { validateFields } } = this
    this.confirmLoading = true
    const self = this
    validateFields((errors, values) => {
      if (!errors) {
        // delete values.temp
        alert('submit')
        console.log('values', values)
        setTimeout(() => {
          this.visible = false
          this.confirmLoading = false
          //this.$emit('ok', values)
        }, 1500)
      } else {
        this.confirmLoading = false
      }
    })
  }
  handleCancel() {
    this.visible = false
  }
}
</script>

<style lang="less" scoped>

</style>

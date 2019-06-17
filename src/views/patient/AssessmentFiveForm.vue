<template>
  <a-modal
    title="五病风险评估筛查"
    :width="550"
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
          <a-collapse-panel header="基本信息" key="1" :style="customStyle">
            <a-form-item 
              label='身高'
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol">
              <a-input
                v-decorator="['factors.height', {rules: [{required: true, message: '请输入身高！'}]}]"
                type="number"
                placeholder="请输入身高"
                addonAfter="CM"/>
            </a-form-item>
            <a-form-item
              label='体重'
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol">
              <a-input
                v-decorator="['factors.weight', {rules: [{required: true, message: '请输入体重'}]}]"
                placeholder="请输入体重"
                type="number"
                addonAfter="KG"/>
            </a-form-item>
            <a-form-item
              label='腰围'
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol">
              <a-input
                v-decorator="['factors.waistline', {rules: [{required: true, message: '请输入腰围'}]}]"
                placeholder="请输入腰围"
                type="number"
                addonAfter="CM"/>
            </a-form-item>
            <a-form-item label="是否吸烟">
              <a-radio-group 
                v-decorator="['factors.smoke', {rules: [{required: true, message: '请选择！'}]}]">
                <a-radio :value="1">是</a-radio>
                <a-radio :value="0">否</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-collapse-panel>
          <a-collapse-panel header="实验室检查" key="2" :style="customStyle">
            <a-form-item
              label='收缩压'
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol">
              <a-input
                v-decorator="['factors.sbp', {rules: [{required: true, message: '请输入收缩压！'}]}]"
                placeholder="请输入收缩压"
                type="number"
                addonAfter="mmHg"/>
            </a-form-item>
            <a-form-item
              label='舒张压'
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol">
              <a-input
                v-decorator="['factors.dbp', {rules: [{required: true, message: '请输入舒张压'}]}]"
                placeholder="请输入舒张压"
                type="number"
                addonAfter="mmHg"/>
            </a-form-item>
            <a-form-item
              label='空腹血糖'
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol">
              <a-input
                v-decorator="['factors.fbg', {rules: [{required: true, message: '请输入空腹血糖'}]}]"
                placeholder="请输入空腹血糖"
                type="number"
                addonAfter="mmol/L"/>
            </a-form-item>
            <a-form-item
              label='血清总胆固醇'
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol">
              <a-input
                v-decorator="['factors.serumTc', {rules: [{required: true, message: '请输入血清总胆固醇'}]}]"
                placeholder="请输入血清总胆固醇"
                type="number"
                addonAfter="mmol/L"/>
            </a-form-item>
          </a-collapse-panel>
          <a-collapse-panel header="既往史" key="3" :style="customStyle">
            <a-form-item label="是否患糖尿病">
              <a-radio-group 
                v-decorator="['factors.previousHistoryDiabetes', {rules: [{required: true, message: '请选择！'}]}]">
                <a-radio :value="1">是</a-radio>
                <a-radio :value="0">否</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="是否患高血压">
              <a-radio-group
                v-decorator="['factors.previousHistoryHypertension', {rules: [{required: true, message: '请选择！'}]}]">
                <a-radio :value="1">是</a-radio>
                <a-radio :value="0">否</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="是否患脑卒中">
              <a-radio-group
                v-decorator="['factors.previousHistoryStroke', {rules: [{required: true, message: '请选择！'}]}]">
                <a-radio :value="1">是</a-radio>
                <a-radio :value="0">否</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="是否患冠心病">
              <a-radio-group 
                v-decorator="['factors.previousHistoryAscvd', {rules: [{required: true, message: '请选择！'}]}]">
                <a-radio :value="1">是</a-radio>
                <a-radio :value="0">否</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="是否患慢阻肺">
              <a-radio-group 
                v-decorator="['factors.previousHistoryCopd', {rules: [{required: true, message: '请选择！'}]}]">
                <a-radio :value="1">是</a-radio>
                <a-radio :value="0">否</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="是否血脂异常">
              <a-radio-group 
                v-decorator="['factors.previousHistoryDyslipidemia', {rules: [{required: true, message: '请选择！'}]}]">
                <a-radio :value="1">是</a-radio>
                <a-radio :value="0">否</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-collapse-panel>
          <a-collapse-panel header="家族史" key="4" :style="customStyle">
            <a-form-item label="糖尿病">
              <a-radio-group 
                v-decorator="['factors.familyHistoryDiabetes', {rules: [{required: true, message: '请选择！'}]}]">
                <a-radio :value="1">是</a-radio>
                <a-radio :value="0">否</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="高血压">
              <a-radio-group
                v-decorator="['factors.familyHistoryHypertension', {rules: [{required: true, message: '请选择！'}]}]">
                <a-radio :value="1">是</a-radio>
                <a-radio :value="0">否</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="脑卒中">
              <a-radio-group
                v-decorator="['factors.familyHistoryStroke', {rules: [{required: true, message: '请选择！'}]}]">
                <a-radio :value="1">是</a-radio>
                <a-radio :value="0">否</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="冠心病">
              <a-radio-group 
                v-decorator="['factors.familyHistoryAscvd', {rules: [{required: true, message: '请选择！'}]}]">
                <a-radio :value="1">是</a-radio>
                <a-radio :value="0">否</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="慢阻肺">
              <a-radio-group 
                v-decorator="['factors.familyHistoryCopd', {rules: [{required: true, message: '请选择！'}]}]">
                <a-radio :value="1">是</a-radio>
                <a-radio :value="0">否</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-collapse-panel>
          <a-collapse-panel header="症状" key="5" :style="customStyle">
            <a-form-item label='是否有“头晕、头疼症状”'>
              <a-radio-group 
                v-decorator="['factors.symptomsHeadache', {rules: [{required: true, message: '请选择！'}]}]">
                <a-radio :value="1">是</a-radio>
                <a-radio :value="0">否</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item label='是否有“体力劳动、精神紧张或激动时出现胸痛症状，休息后逐渐缓解”'>
              <a-radio-group
                v-decorator="['factors.symptomsStethalgia', {rules: [{required: true, message: '请选择！'}]}]">
                <a-radio :value="1">是</a-radio>
                <a-radio :value="0">否</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item label='是否有“呼吸困难或慢性咳嗽”'>
              <a-radio-group
                v-decorator="['factors.symptomsDyspnea', {rules: [{required: true, message: '请选择！'}]}]">
                <a-radio :value="1">是</a-radio>
                <a-radio :value="0">否</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item label='是否有“多饮、多尿、多食、不明原因体重下降”'>
              <a-radio-group 
                v-decorator="['factors.symptomsDiuresis', {rules: [{required: true, message: '请选择！'}]}]">
                <a-radio :value="1">是</a-radio>
                <a-radio :value="0">否</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item label='是否有“一过性黑曚、眩晕”'>
              <a-radio-group 
                v-decorator="['factors.symptomsDizziness', {rules: [{required: true, message: '请选择！'}]}]">
                <a-radio :value="1">是</a-radio>
                <a-radio :value="0">否</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-collapse-panel>
        </a-collapse>
      </a-form>
    </a-spin>
    <assessment-detail-modal ref="resultForm" @back="handleFeedback"></assessment-detail-modal>
  </a-modal>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { statsAll, statsPatients, statsPlans } from '@/api/stats'
import pick from 'lodash.pick'
import AssessmentDetailModal from './AssessmentDetailModal'
import { USER_INFO } from '@/store/mutation-types'

@Component({
  components: {
    AssessmentDetailModal
  },
  props: {},
})
export default class AssessmentFiveForm extends Vue {
  data() {
    return {
      visible: false,
      confirmLoading: false,
      model: {},
      patientId:'',
      doctorId: '',
      form: this.$form.createForm(this),
      customStyle: 'fontSize:18px',
      activeKey: ['1','2','3','4','5'],
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 24 },
        },
        wrapperCol: {
          xs: { span: 12, offset: 0 },
          sm: { span: 12, offset: 0 },
        }
      },
    }
  }


  async show(id) {
    console.info(`show assessment:`)
    this.form.resetFields()
    this.visible = true
    this.patientId = id
    this.doctorId = Vue.ls.get(USER_INFO).data.id
  }
  handleOk() {
    const { form: { validateFields } } = this
    this.confirmLoading = true
    const self = this
    validateFields((errors, values) => {
      if (!errors) {
        // delete values.temp
        values.patientId= this.patientId
        values.doctorId= this.doctorId
        values.weight = +values.weight
        values.height = +values.height
        values.waistline = +values.waistline
        values.fbg = +values.fbg
        values.sbp = +values.sbp
        values.dbp = +values.dbp
        values.serumTc = +values.serumTc
        console.log('values', values)
        setTimeout(() => {
          this.visible = false
          this.confirmLoading = false
          this.$refs.resultForm.show(values)
        }, 1500)
      } else {
        this.confirmLoading = false
      }
    })
  }
  handleCancel() {
    this.form.resetFields()
    this.visible = false
  }
  handleFeedback(type,data){
    this.$emit('back',type,data)
  }
}
</script>

<style lang="less" scoped>

</style>

<template>
  <a-modal
    title="历史健康方案详情"
    :width="950"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭"
    :maskClosable="false"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form" layout="horizontal" id="root-container">
        <h3>处方建议</h3>
        <a-row :gutter="8" v-for="(item, index) in prescriptions" :key="'prescriptions_' + item">
          <a-col :span="6">
            <a-form-item
              label="药名"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-input
                disabled
                v-decorator="[
                  `prescriptions[${index}].prescription`,
                  {initialValue: prescriptions[index].prescription, rules: [{ message: '请输入药名' }]}
                ]"
                placeholder="输入药名"
              />
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item
              label="频次"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-input
                disabled
                v-decorator="[
                  `prescriptions[${index}].frequency`,
                  {initialValue: prescriptions[index].frequency, rules: [{ message: '请输入频次' }]}
                ]"
                placeholder="输入频次"
              />
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item
              label="剂量"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-input
                disabled
                v-decorator="[
                  `prescriptions[${index}].dosage`,
                  {initialValue: prescriptions[index].dosage, rules: [{ message: '请输入剂量' }]}
                ]"
                placeholder="输入剂量"
              />
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item
              label="原因"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-input
                disabled
                v-decorator="[
                  `prescriptions[${index}].reason`,
                  {initialValue: prescriptions[index].reason, rules: [{ message: '请输入原因' }]}
                ]"
                placeholder="输入原因"
              />
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item
              label="备注"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-input
                disabled
                v-decorator="[
                  `prescriptions[${index}].remark`,
                  {initialValue: prescriptions[index].remark, rules: [{ message: '请输入备注' }]}
                ]"
                placeholder="输入备注"
              />
            </a-form-item>
          </a-col>
        </a-row>

        <h3>运动建议</h3>
        <a-row :gutter="8" v-for="(item, index) in exercise" :key="'exercise' + item">
          <a-col :span="6">
            <a-form-item
              label="运动类型"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-input
                disabled
                v-decorator="[
                  `exercise[${index}].sport`,
                  {initialValue: exercise[index].sport, rules: [{ message: '请输入运动' }]}
                ]"
                placeholder="输入运动"
              />
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item
              label="运动频次"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-input
                disabled
                v-decorator="[
                  `exercise[${index}].frequency`,
                  {initialValue: exercise[index].frequency, rules: [{ message: '请输入运动频次' }]}
                ]"
                placeholder="输入运动频次"
              />
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item
              label="运动强度"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-input
                disabled
                v-decorator="[
                  `exercise[${index}].strength`,
                  {initialValue: exercise[index].strength, rules: [{ message: '请输入运动强度' }]}
                ]"
                placeholder="输入运动强度"
              />
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item
              label="原因"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-input
                disabled
                v-decorator="[
                  `exercise[${index}].reason`,
                  {initialValue: exercise[index].reason, rules: [{ message: '请输入原因' }]}
                ]"
                placeholder="输入原因"
              />
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item
              label="备注"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-input
                disabled
                v-decorator="[
                  `exercise[${index}].remark`,
                  {initialValue: exercise[index].remark, rules: [{ message: '请输入备注' }]}
                ]"
                placeholder="输入备注"
              />
            </a-form-item>
          </a-col>
        </a-row>

        <h3>饮食建议</h3>
        <a-row :gutter="8" v-for="(item, index) in food" :key="'food' + item">
          <a-col :span="14">
            <a-form-item
              label="饮食建议"
              :label-col="formItemLayout.shortLabelCol"
              :wrapper-col="formItemLayout.shortWrapperCol"
            >
              <a-input
                disabled
                v-decorator="[
                  `food[${index}].food`,
                  {initialValue: food[index].food, rules: [{ message: '请输入饮食建议' }]}
                ]"
                placeholder="输入饮食建议"
              />
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item
              label="原因"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-input
                disabled
                v-decorator="[
                  `food[${index}].reason`,
                  {initialValue: food[index].reason, rules: [{ message: '请输入原因' }]}
                ]"
                placeholder="输入原因"
              />
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item
              label="备注"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-input
                disabled
                v-decorator="[
                  `food[${index}].remark`,
                  {initialValue: food[index].remark, rules: [{ message: '请输入备注' }]}
                ]"
                placeholder="输入备注"
              />
            </a-form-item>
          </a-col>
        </a-row>

        <h3>其他建议</h3>
        <a-row :gutter="8" v-for="(item, index) in others" :key="'others' + item">
          <a-col :span="14">
            <a-form-item
              label="其他建议"
              :label-col="formItemLayout.shortLabelCol"
              :wrapper-col="formItemLayout.shortWrapperCol"
            >
              <a-input
                disabled
                v-decorator="[
                  `others[${index}].other`,
                  {initialValue: others[index].other, rules: [{ message: '请输入其他建议' }]}
                ]"
                placeholder="输入其他建议"
              />
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item
              label="原因"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-input
                disabled
                v-decorator="[
                  `others[${index}].reason`,
                  {initialValue: others[index].reason, rules: [{ message: '请输入原因' }]}
                ]"
                placeholder="输入原因"
              />
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item
              label="备注"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-input
                disabled
                v-decorator="[
                  `others[${index}].remark`,
                  {initialValue: others[index].remark, rules: [{ message: '请输入备注' }]}
                ]"
                placeholder="输入备注"
              />
            </a-form-item>
          </a-col>
        </a-row>

        <h3>就诊提醒</h3>
        <a-row v-if="Object.keys(clinicRemind).length !== 0">
          <a-col :span="24">
            <a-row :gutter="8">
              <a-col :span="8">
                <a-form-item
                  label="就诊时间"
                  :label-col="formItemLayout.labelCol"
                  :wrapper-col="formItemLayout.wrapperCol"
                >
                  <a-input
                    disabled
                    v-decorator="[
                      'clinicRemind.suggestDate',
                      {initialValue: clinicRemind.suggestDate, rules: [{ message: '请输入就诊医院' }]}
                    ]"
                    placeholder="输入就诊医院"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="随诊类型"
                  :label-col="formItemLayout.labelCol"
                  :wrapper-col="formItemLayout.wrapperCol"
                >
                  <a-input
                    disabled
                    v-decorator="[
                      'clinicRemind.type',
                      {initialValue: clinicRemind.type, rules: [{ message: '请输入就诊医院' }]}
                    ]"
                    placeholder="输入就诊医院"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="就诊医院"
                  :label-col="formItemLayout.labelCol"
                  :wrapper-col="formItemLayout.wrapperCol"
                >
                  <a-input
                    disabled
                    v-decorator="[
                      'clinicRemind.targetHospital',
                      {initialValue: clinicRemind.targetHospital, rules: [{ message: '请输入就诊医院' }]}
                    ]"
                    placeholder="输入就诊医院"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-col>
          <a-col :span="24">
            <a-row :gutter="8">
              <a-col :span="8">
                <a-form-item
                  label="相关病"
                  :label-col="formItemLayout.labelCol"
                  :wrapper-col="formItemLayout.wrapperCol"
                >
                  <a-input
                    disabled
                    v-decorator="[
                      'clinicRemind.relatedDisease',
                      {initialValue: clinicRemind.relatedDisease, rules: [{ message: '请输入相关病' }]}
                    ]"
                    placeholder="输入相关病"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="原因"
                  :label-col="formItemLayout.labelCol"
                  :wrapper-col="formItemLayout.wrapperCol"
                >
                  <a-input
                    disabled
                    v-decorator="[
                      'clinicRemind.reason',
                      {initialValue: clinicRemind.reason, rules: [{ message: '请输入原因' }]}
                    ]"
                    placeholder="输入原因"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { statsAll, statsPatients, statsPlans } from '@/api/stats'
import { planDetail } from '../../api/plan'
import pick from 'lodash.pick'

@Component({
  components: {},
  props: {},
})
export default class PlanDetailModal extends Vue {
  data() {
    return {
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      prescriptions: [
        { prescription: 'prescription', frequency: 'frequency', dosage: 'dosage', reason: 'reason', remark: 'remark' },
      ],
      exercise: [{ sport: 'sport', frequency: 'frequency', strength: 'strength', reason: 'reason', remark: 'remark' }],
      food: [{ food: 'food', reason: 'reason', remark: 'remark' }],
      others: [{ other: 'other', reason: 'reason', remark: 'remark' }],
      clinicRemind: {
        type: '转诊',
        suggestDate: '一个月内',
        relatedDisease: '脑卒中',
        reason: '脑卒中极高危',
        targetHospital: '卫生所',
      },
      formItemLayout: {
        labelCol: {
          xs: { span: 8 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 16, offset: 0 },
          sm: { span: 16, offset: 0 },
        },
        shortLabelCol: {
          xs: { span: 4 },
          sm: { span: 4 },
        },
        shortWrapperCol: {
          xs: { span: 20, offset: 0 },
          sm: { span: 20, offset: 0 },
        },
      },
    }
  }

  async setData(id) {
    const plan = await planDetail(null, { id })
    const factors = {}
    const { prescriptions = [], exercise = [], food = [], others = [], clinicRemind = {} } = plan.data.planDetail
    this.prescriptions = prescriptions || []
    this.exercise = exercise || []
    this.food = food || []
    this.others = others || []
    this.clinicRemind = clinicRemind || {}
    this.confirmLoading = false
  }

  async show(id) {
    this.visible = true
    this.confirmLoading = true
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

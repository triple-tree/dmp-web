<template>
  <a-modal
    title="历史健康档案详情"
    :width="950"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form" layout="horizontal">
        <h3>基本信息</h3>
        <a-row :gutter="8">
          <a-col :span="8">
            <a-form-item
              label="身高"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-input
                v-decorator="['height', {rules: [{ message: '请输入身高' }]} ]"
                placeholder="输入身高"
                addonAfter="CM"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              label="体重"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-input
                v-decorator="['weight', {rules: [{ message: '请输入体重' }]} ]"
                placeholder="输入体重"
                addonAfter="KG"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              label="腰围"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-input
                v-decorator="['waistline', {rules: [{ message: '请输入腰围' }]} ]"
                placeholder="输入腰围"
                addonAfter="CM"
              />
            </a-form-item>
          </a-col>
        </a-row>

        <h3>一般筛查</h3>
        <a-row :gutter="8">
          <a-col :span="8">
            <a-form-item
              label="舒张压"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-input
                v-decorator="[ 'dbp', {rules: [{ message: '请输入舒张压' }]} ]"
                placeholder="输入舒张压"
                addonAfter="mmHg"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              label="收缩压"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-input
                v-decorator="[ 'sbp', {rules: [{ message: '请输入收缩压' }]} ]"
                placeholder="输入收缩压"
                addonAfter="mmHg"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              label="空腹血糖"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-input
                v-decorator="[ 'fbg', {rules: [{ message: '请输入空腹血糖' }]} ]"
                placeholder="输入空腹血糖"
                addonAfter="mmol/L"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="8">
          <a-col :span="8">
            <a-form-item
              label="总胆固醇"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-input
                v-decorator="[ 'serumTc', {rules: [{ message: '请输入总胆固醇' }]} ]"
                placeholder="输入总胆固醇"
                addonAfter="mmol/L"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              label="高密度蛋白质胆固醇"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-input
                v-decorator="[ 'serumTc', {rules: [{ message: '请输入高密度蛋白质胆固醇' }]} ]"
                placeholder="输入高密度蛋白质胆固醇"
                addonAfter="mmol/L"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              label="低密度蛋白质胆固醇"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-input
                v-decorator="[ 'serumTc', {rules: [{ message: '请输入低密度蛋白质胆固醇' }]} ]"
                placeholder="输入低密度蛋白质胆固醇"
                addonAfter="mmol/L"
              />
            </a-form-item>
          </a-col>
        </a-row>

        <h3>既往史</h3>
        <a-row :gutter="8">
          <a-col :md="24" :sm="24">
            <a-form-item>
              <a-row type="flex">
                <a-col
                  v-for="item in previousHistoryDiseasesOptions"
                  :key="item.index"
                  :span="4"
                  align="center"
                >
                  <image-checkbox
                    disabled="true"
                    :iconTypeName="item.iconTypeName"
                    v-decorator="[
                      item.name,
                      {initialValue: item.value}
                    ]"
                  ></image-checkbox>
                </a-col>
              </a-row>
            </a-form-item>
          </a-col>
        </a-row>

        <h3>家族史</h3>
        <a-row :gutter="8">
          <a-col :md="24" :sm="24">
            <a-form-item>
              <a-row type="flex">
                <a-col
                  v-for="item in familyHistoryDiseasesOptions"
                  :key="item.index"
                  :span="4"
                  align="center"
                >
                  <image-checkbox
                    :label="item.label"
                    disabled="true"
                    :iconTypeName="item.iconTypeName"
                    v-decorator="[
                      item.name,
                      {initialValue: item.value}
                    ]"
                  ></image-checkbox>
                </a-col>
              </a-row>
            </a-form-item>
          </a-col>
        </a-row>

        <h3>症状</h3>
        <a-row :gutter="8">
          <a-col :span="7">
            <a-form-item>
              <a-checkbox v-decorator="['symptomsHeadache']">头晕、头疼症状</a-checkbox>
            </a-form-item>
          </a-col>
          <a-col :span="17">
            <a-form-item>
              <a-checkbox v-decorator="['symptomsStethalgia']">体力劳动、精神紧张或激烈时出现胸痛症状、休息后逐渐缓解</a-checkbox>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="8">
          <a-col :span="7">
            <a-form-item>
              <a-checkbox v-decorator="['symptomsDyspnea']">呼吸困难或慢性咳嗽</a-checkbox>
            </a-form-item>
          </a-col>
          <a-col :span="17">
            <a-form-item>
              <a-checkbox v-decorator="['symptomsDiuresis']">多饮、多尿、多食、不明原因体重下降</a-checkbox>
            </a-form-item>
          </a-col>
          <a-col :span="7">
            <a-form-item>
              <a-checkbox v-decorator="['symptomsDizziness']">一般性黑蒙、眩晕</a-checkbox>
            </a-form-item>
          </a-col>
        </a-row>

        <h3>生活方式</h3>
        <a-row :gutter="8">
          <a-col :span="8">
            <a-form-item>
              <a-checkbox v-decorator="['smoke']">是否吸烟</a-checkbox>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item>
              <a-checkbox v-decorator="['sport']">是否运动</a-checkbox>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="8">
          <a-col :span="8">
            <a-form-item>
              <a-checkbox v-decorator="['drink']">是否饮酒</a-checkbox>
            </a-form-item>
          </a-col>

          <a-col :span="14">
            <a-form-item
              label="每天盐的摄入量"
              :label-col="formItemLayout.horizontalLabelCol"
              :wrapper-col="formItemLayout.horizontalWrapperCol"
            >
              <a-input
                v-decorator="['salt', {rules: [{ message: '请输入每天盐的摄入量' }]} ]"
                placeholder="输入每天盐的摄入量"
                addonAfter="mg"
              />
            </a-form-item>
          </a-col>
        </a-row>

        <h3>检验检测</h3>
        <a-row :gutter="8">
          <a-col :span="8">
            <a-form-item
              label="血常规"
              :label-col="formItemLayout.horizontalLabelCol"
              :wrapper-col="formItemLayout.horizontalWrapperCol"
            >
              <a-input v-decorator="['br', {rules: [{ message: '请输入血常规' }]} ]" placeholder="输入血常规"/>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              label="尿常规"
              :label-col="formItemLayout.horizontalLabelCol"
              :wrapper-col="formItemLayout.horizontalWrapperCol"
            >
              <a-input v-decorator="['ur', {rules: [{ message: '请输入尿常规' }]} ]" placeholder="输入尿常规"/>
            </a-form-item>
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
import IconFont from '@/components/Icon/index.js'
import pick from 'lodash.pick'
import ImageCheckbox from '@/components/ImageCheckbox'
import { recordDetail } from '../../api/record'

const previousHistoryDiseasesOptions = {
  previousHistoryHypertension: {
    name: 'previousHistoryHypertension',
    label: '高血压',
    iconTypeName: 'hypertension',
    value: 0
  },
  previousHistoryDiabetes: {
    name: 'previousHistoryDiabetes',
    label: '糖尿病',
    iconTypeName: 'diabetes',
    value: 0
  },
  previousHistoryStroke: {
    name: 'previousHistoryStroke',
    label: '短暂性脑缺血发作(TIA)或缺血性卒中(脑梗死)',
    iconTypeName: 'stroke',
    value: 0
  },
  previousHistoryAscvd: {
    name: 'previousHistoryAscvd',
    label: '急性冠脉综合征ACS',
    iconTypeName: 'ascvd',
    value: 0
  },
  previousHistoryCopd: {
    name: 'previousHistoryCopd',
    label: '慢阻肺',
    iconTypeName: 'copd',
    value: 0
  },
  previousHistoryDyslipidemia: {
    name: 'previousHistoryDyslipidemia',
    label: '血脂异常',
    iconTypeName: 'dyslipidemiad',
    value: 0
  }
}

const familyHistoryDiseasesOptions = {
  familyHistoryHypertension: {
    name: 'familyHistoryHypertension',
    label: '高血压',
    iconTypeName: 'hypertension',
    value: 0
  },
  familyHistoryDiabetes: {
    name: 'familyHistoryDiabetes',
    label: '糖尿病',
    iconTypeName: 'diabetes',
    value: 0
  },
  familyHistoryStroke: {
    name: 'familyHistoryStroke',
    label: '脑卒中',
    iconTypeName: 'stroke',
    value: 0
  },
  familyHistoryAscvd: {
    name: 'familyHistoryAscvd',
    label: '冠心病',
    iconTypeName: 'ascvd',
    value: 0
  },
  familyHistoryCopd: {
    name: 'familyHistoryCopd',
    label: '慢阻肺',
    iconTypeName: 'copd',
    value: 0
  }
}

@Component({
  components: {
    IconFont,
    ImageCheckbox
  },
  props: {}
})
export default class RecordDetailModal extends Vue {
  data() {
    return {
      visible: false,
      confirmLoading: false,
      model: {},
      form: this.$form.createForm(this),
      familyHistoryDiseasesOptions,
      previousHistoryDiseasesOptions,
      formItemLayout: {
        labelCol: {
          md: { span: 24 },
          sm: { span: 24 }
        },
        wrapperCol: {
          md: { span: 24 },
          sm: { span: 24 }
        },
        horizontalLabelCol: {
          md: { span: 8 },
          sm: { span: 8 }
        },
        horizontalWrapperCol: {
          md: { span: 16 },
          sm: { span: 16 }
        }
      }
    }
  }

  async setData(id) {
    const record = await recordDetail(null, { id })
    const factors = {}
    record.data.patientRecordFactors.forEach(factor => {
      factors[factor.factorName] = factor.factorValue
    })
    this.model = { ...this.model, ...factors }
    console.info(this.model)
    this.$nextTick(() => {
      this.form.setFieldsValue(
        pick(
          this.model,
          'weight',
          'height',
          'waistline',
          'sbp',
          'dbp',
          'fbg',
          'serumTc',
          'serumTcLower',
          'serumTcUpper',
          'previousHistoryHypertension',
          'previousHistoryDiabetes',
          'previousHistoryStroke',
          'previousHistoryAscvd',
          'previousHistoryCopd',
          'previousHistoryDyslipidemia',
          'familyHistoryHypertension',
          'familyHistoryDiabetes',
          'familyHistoryStroke',
          'familyHistoryAscvd',
          'familyHistoryCopd',
          'symptomsHeadache',
          'symptomsStethalgia',
          'symptomsDyspnea',
          'symptomsDiuresis',
          'symptomsDizziness',
          'smoke',
          'sport',
          'drink',
          'salt',
          'br',
          'ur'
        )
      )
    })
  }

  async show(id) {
    console.info(`show record: ${id}`)
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

<template>
  <a-modal
    title="建档"
    :width="820"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :footer="null"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form" layout="vertical">
        <a-row :gutter="12" type="flex" align="top">
          <a-col :md="8" :sm="24">
            <a-form-item
              label="姓名">
              <a-input
                v-decorator="['patient.name', {rules: [{required: true, min: 2, message: '请输入姓名！'}]}]"
                placeholder="请输入姓名"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item
              label="性别">
              <a-select v-decorator="['patient.gender', {rules: [{required: true, message: '请选择性别！'}]}]" placeholder="请选择性别">
                <a-select-option value="0">男</a-select-option>
                <a-select-option value="1">女</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item
              label="手机号">
              <a-input
                v-decorator="['patient.phoneNumber', {rules: [{required: true, len: 11, message: '请输入手机号码！'}]}]"
                placeholder="请输入手机号"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item
              label="身份证">
              <a-input
                v-decorator="['patient.identityNumber', {rules: [{required: true, len: 18, message: '请输入身份证号码！'}]}]"
                placeholder="请输入正确的身份证号"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item
              label="地址">
              <a-cascader :options="city" v-decorator="['temp.add']" placeholder="请选择省-市-区" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item
              label="详细地址">
              <a-input v-decorator="['patient.detailAddress']" placeholder="请输入街道、门牌号等信息"/>
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item
              label="疾病史">
              <a-row type="flex">
                <a-col
                  :span="8"
                  align="center"
                  v-for="item in diseaseOptions"
                  :key="item.index"
                  style="margin-top:10px;margin-bottom:10px"
                >
                  <image-checkbox
                    :iconTypeName="item.iconTypeName"
                    v-decorator="['patient.'+item.name,
                                  {initialValue: item.value}]"
                  ></image-checkbox>
                </a-col>
              </a-row>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item
              label="身高(cm)">
              <a-input v-decorator="['factors.height']" />
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item
              label="体重(kg)">
              <a-input v-decorator="['factors.weight']" />
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item
              label="腰围(cm)">
              <a-input v-decorator="['factors.waistline']" />
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item
              label="舒张压(mmHg)">
              <a-input v-decorator="['factors.sbp']" />
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item
              label="收缩压(mmHg)">
              <a-input v-decorator="['factors.dbp']" />
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item
              label="空腹血糖(mmol/L)">
              <a-input v-decorator="['factors.fbg']" />
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item
              label="血清总胆固醇(mmol/L)">
              <a-input v-decorator="['factors.serumTc']" />
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item
              label="家族史（父母任意一方是否患有）">
              <a-checkbox-group v-decorator="['temp.family']" :options="familyOptions" />
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item
              label="症状">
              <a-checkbox-group v-decorator="['temp.symptom']" :options="symptomOptions"/>
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item
              label="是否吸烟">
              <a-radio-group v-decorator="['factors.smoke']" name="smoke">
                <a-radio :value="0">是</a-radio>
                <a-radio :value="1">否</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24" style="text-align:center">
            <a-button type="primary" size="large" @click="handleSubmit">确定</a-button>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import ImageCheckbox from '@/components/ImageCheckbox'
import City from '@/api/city'

console.log(City)

const symptomOptions = [
  { label: '头晕、头疼症状', value: 0, name: 'symptomsHeadache' },
  { label: '体力劳动、精神紧张或激动时出现胸痛症状，休息后逐渐缓解', value: 1, name: 'symptomsStethalgia' },
  { label: '呼吸困难或慢性咳嗽', value: 2, name: 'symptomsDyspnea' },
  { label: '多饮、多尿、多食、不明原因体重下降', value: 3, name: 'symptomsDiuresis' },
  { label: '一过性黑蒙、眩晕', value: 4, name: 'symptomsDizziness' },
]

const familyOptions = [
  { label: '糖尿病', value: 0, name: 'familyHistoryDiabetes' },
  { label: '高血压', value: 1, name: 'familyHistoryHypertension' },
  { label: '冠心病', value: 2, name: 'familyHistoryAscvd' },
  { label: '缺血性卒中（脑更死）', value: 3, name: 'familyHistoryStroke' },
  { label: '慢阻肺（COPD）', value: 4, name: 'familyHistoryCopd' },
]
const diseaseOptions = {
  hasHypertension: {
    label: '高血压',
    name: 'hasHypertension',
    iconTypeName: 'hypertension',
    value: 0 },
  hasDiabetes: {
    label: '糖尿病',
    name: 'hasDiabetes',
    iconTypeName: 'diabetes',
    value: 0 },
  hasStroke: {
    label: '脑卒中',
    name: 'hasStroke',
    iconTypeName: 'stroke',
    value: 0 },
  hasAscvd: {
    label: '冠心病',
    name: 'hasAscvd',
    iconTypeName: 'ascvd',
    value: 0 },
  hasCopd: {
    label: '慢阻肺',
    name: 'hasCopd',
    iconTypeName: 'copd',
    value: 0 },
  hasDyslipidemia: {
    label: '血脂异常',
    name: 'hasDyslipidemia',
    iconTypeName: 'dyslipidemiad',
    value: 0 },
}

export default {
  components: {
    ImageCheckbox,
  },
  data() {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 9 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15 },
      },
      visible: false,
      confirmLoading: false,
      symptomOptions,
      familyOptions,
      diseaseOptions,
      symptomCheck: [],
      form: this.$form.createForm(this),
      city: City,
    }
  },
  methods: {
    add() {
      this.form.resetFields()
      this.form.setFieldsValue({
        'temp.family': [],
        'temp.symptom': [],
      })
      this.visible = true
    },
    selectDisease(item) {
      item.value = item.value === 1 ? 0 : 1
    },
    handleSubmit() {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      const self = this
      validateFields((errors, values) => {
        if (!errors) {
          values.temp.add = []
          Object.assign(values.patient, {
            province: (values.temp.add.length && values.temp.add[0]) || '',
            city: (values.temp.add.length && values.temp.add[1]) || '',
            county: (values.temp.add.length && values.temp.add[2]) || '',
          })
          Object.assign(values.factors, {
            'familyHistoryDiabetes': 0,
            'familyHistoryHypertension': 0,
            'familyHistoryStroke': 0,
            'familyHistoryAscvd': 0,
            'familyHistoryCopd': 0,
            symptomsHeadache: 0,
            symptomsStethalgia: 0,
            symptomsDyspnea: 0,
            symptomsDiuresis: 0,
            symptomsDizziness: 0,
          })
          values.temp.symptom &&
          values.temp.symptom.length &&
          values.temp.symptom.forEach(function (el) {
            values.factors[self.symptomOptions[el].name] = 1
          })
          values.temp.family &&
          values.temp.family.length &&
          values.temp.family.forEach(function (el) {
            values.factors[self.familyOptions[el].name] = 1
          })
          // delete values.temp
          console.log('values', values)
          setTimeout(() => {
            this.visible = false
            this.confirmLoading = false
            this.$emit('ok', values)
          }, 1500)
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel() {
      this.visible = false
    },
  },
}
</script>

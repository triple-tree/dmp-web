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
      <a-form :form="form" :layout="vertical">
        <a-row :gutter="12" type="flex" align="top">
          <a-col :md="8" :sm="24">
            <a-form-item
              label="姓名">
              <a-input v-model="params.patient.name" v-decorator="['name', {rules: [{required: true, min: 2, message: '请输入姓名！'}]}]" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item
              label="性别">
              <a-select v-model="params.patient.gender" v-decorator="['gender', {rules: [{required: true, message: '请选择性别！'}]}]" >
                <a-select-option value="0">男</a-select-option>
                <a-select-option value="1">女</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item
              label="手机号">
              <a-input v-model="params.patient.phoneNumber" v-decorator="['phoneNumber', {rules: [{required: true, len: 11, message: '请输入手机号码！'}]}]" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item
              label="身份证">
              <a-input v-model="params.patient.identityNumber" v-decorator="['identityNumber', {rules: [{required: true, len: 18, message: '请输入身份证号码！'}]}]" />
            </a-form-item>
          </a-col>
          <a-col :md="16" :sm="24">
            <a-form-item
              label="患者地址信息">
              <a-input v-model="params.patient.add" phoneNumberv-decorator="['add']" />
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
                  :value="item.value"
                  @click="selectDisease(item)"
                >
                  <icon-font :type="item.iconType1" v-if="item.value === 1"/>
                  <icon-font :type="item.iconType0" v-if="item.value === 0"/>
                  <div>{{ item.label }}</div>
                </a-col>
              </a-row>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item
              label="身高(cm)">
              <a-input v-model="params.factors.height" v-decorator="['height']" />
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item
              label="体重(kg)">
              <a-input v-model="params.factors.weight" v-decorator="['weight']" />
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item
              label="腰围(cm)">
              <a-input v-model="params.factors.waistline" v-decorator="['waistline']" />
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item
              label="舒张压(mmHg)">
              <a-input v-model="params.factors.sbp" v-decorator="['sbp']" />
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item
              label="收缩压(mmHg)">
              <a-input v-model="params.factors.dbp" v-decorator="['dbp']" />
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item
              label="空腹血糖(mmol/L)">
              <a-input v-model="params.factors.fbg" v-decorator="['fbg']" />
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item
              label="血清总胆固醇(mmol/L)">
              <a-input v-model="params.factors.serumTc" v-decorator="['serumTc']" />
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item
              label="家族史（父母任意一方是否患有）">
              <a-checkbox-group v-model="params.factors.family" :options="familyOptions"/>
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item
              label="症状">
              <a-checkbox-group v-model="params.factors.symptom" :options="symptomOptions"/>
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item
              label="是否吸烟">
              <a-radio-group v-model="params.factors.smoke" name="smoke">
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

<style scoped>
.ant-modal .anticon {
  font-size: 36px;
}
</style>

<script>
import IconFont from '@/components/Icon/index.js'

const symptomOptions = [
  { label: '头晕、头疼症状', value: 0, name: 'symptomsHeadache' },
  { label: '体力劳动、精神紧张或激动时出现胸痛症状，休息后逐渐缓解', value: 1, name: 'symptomsStethalgia' },
  { label: '呼吸困难或慢性咳嗽', value: 2, name: 'symptomsDyspnea' },
  { label: '多饮、多尿、多食、不明原因体重下降', value: 3, name: 'symptomsDiuresis' },
  { label: '一过性黑蒙、眩晕', value: 4, name: 'symptomsDizziness' }
]

const familyOptions = [
  { label: '糖尿病', value: 0, name: 'familyHistoryDiabetes' },
  { label: '高血压', value: 1, name: 'familyHistoryHypertension' },
  { label: '冠心病', value: 2, name: 'familyHistoryAscvd' },
  { label: '缺血性卒中（脑更死）', value: 3, name: 'familyHistoryStroke' },
  { label: '慢阻肺（COPD）', value: 4, name: 'familyHistoryCopd' }
]
const diseaseOptions = {
  hasHypertension: { label: '高血压', iconType0: 'icon_hypertension', iconType1: 'icon_hypertension_red', value: 0 },
  hasDiabetes: { label: '糖尿病', iconType0: 'icon_diabetes', iconType1: 'icon_diabetes_red', value: 1 },
  hasStroke: { label: '脑卒中', iconType0: 'icon_stroke', iconType1: 'icon_stroke_red', value: 0 },
  hasAscvd: { label: '冠心病', iconType0: 'icon_ascvd', iconType1: 'icon_ascvd_red', value: 1 },
  hasCopd: { label: '慢阻肺', iconType0: 'icon_copd', iconType1: 'icon_copd_red', value: 0 }
}

export default {
  components: {
    IconFont
  },
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 9 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15 }
      },
      visible: false,
      confirmLoading: false,
      symptomOptions,
      familyOptions,
      diseaseOptions,
      symptomCheck: [],
      params: {
        patient: {},
        factors: {}
      },
      form: this.$form.createForm(this)
    }
  },
  methods: {
    add () {
      this.visible = true
    },
    selectDisease (item) {
      item.value = item.value === 1 ? 0 : 1
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      const self = this
      validateFields((errors, values) => {
        if (!errors) {
          Object.assign(this.params.patient, {
            hasHypertension: this.diseaseOptions.hasHypertension.value,
            hasDiabetes: this.diseaseOptions.hasDiabetes.value,
            hasStroke: this.diseaseOptions.hasStroke.value,
            hasAscvd: this.diseaseOptions.hasAscvd.value,
            hasCopd: this.diseaseOptions.hasCopd.value
          })
          Object.assign(this.params.factors, {
            'familyHistoryDiabetes': 0,
            'familyHistoryHypertension': 0,
            'familyHistoryStroke': 0,
            'familyHistoryAscvd': 0,
            'familyHistoryCopd': 0,
            symptomsHeadache: 0,
            symptomsStethalgia: 0,
            symptomsDyspnea: 0,
            symptomsDiuresis: 0,
            symptomsDizziness: 0
          })
          this.params.factors.symptom &&
          this.params.factors.symptom.length &&
          this.params.factors.symptom.forEach(function (el) {
            self.params.factors[self.symptomOptions[el].name] = 1
          })
          this.params.factors.family &&
          this.params.factors.family.length &&
          this.params.factors.family.forEach(function (el) {
            self.params.factors[self.familyOptions[el].name] = 1
          })
          values = this.params
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
    handleCancel () {
      this.visible = false
    }
  }
}
</script>

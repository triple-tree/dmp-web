<template>
  <a-modal
    title="建档"
    :width="860"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row :gutter="6" type="flex" align="top">
          <a-col :md="12" :sm="24">
            <a-form-item
              label="姓名"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-input v-decorator="['name', {rules: [{required: true, min: 2, message: '请输入姓名！'}]}]" />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item
              label="性别"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-select v-decorator="['gender', {rules: [{required: true}]}]" >
                <a-select-option value="0">男</a-select-option>
                <a-select-option value="1">女</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item
              label="身份证"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-input v-decorator="['identityNumber', {rules: [{required: true, len: 18, message: '请输入身份证号码！'}]}]" />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item
              label="手机号"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-input v-decorator="['phoneNumber', {rules: [{required: true, len: 11, message: '请输入手机号码！'}]}]" />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item
              label="患者地址信息"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-input v-decorator="['add']" />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item
              label="是否吸烟"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-radio-group name="smoke">
                <a-radio :value="0">是</a-radio>
                <a-radio :value="1">否</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item
              label="身高(cm)"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-input v-decorator="['height']" />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item
              label="体重(kg)"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-input v-decorator="['weight']" />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item
              label="疾病史"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-row type="flex">
                <a-col
                  :span="8"
                  align="center"
                  v-for="item in diseaseOptions"
                  :key="item.index"
                  :value="item.value"
                  @click="selectDisease(item)"
                >
                  <a-icon :type="item.iconType" theme="twoTone" twoToneColor="#eb2f96" v-if="item.value === 1" />
                  <a-icon :type="item.iconType" v-if="item.value === 0" />
                  <div>{{ item.label }}</div>
                </a-col>
              </a-row>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item
              label="症状"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-checkbox-group :options="symptomOptions" v-model="symptomCheck"/>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item
              label="腰围(cm)"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-input v-decorator="['waistline']" />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item
              label="舒张压(mmHg)"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-input v-decorator="['sbp']" />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item
              label="收缩压(mmHg)"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-input v-decorator="['dbp']" />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item
              label="空腹血糖(mmol/L)"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-input v-decorator="['fbg']" />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item
              label="血清总胆固醇(mmol/L)"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-input v-decorator="['serumTc']" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import func from '../../../../vue-temp/vue-editor-bridge';
// const symptomOptions = [
//   { label: '头晕、头疼症状', value: 0, name: 'symptomsHeadache' },
//   { label: '体力劳动、精神紧张或激动时出现胸痛症状，休息后逐渐缓解', value: 1, name: 'symptomsStethalgia' },
//   { label: '呼吸困难或慢性咳嗽', value: 2, name: 'symptomsDyspnea' },
//   { label: '多饮、多尿、多食、不明原因体重下降', value: 3, name: 'symptomsDiuresis' },
//   { label: '一过性黑蒙、眩晕', value: 4, name: 'symptomsDizziness' }
// ]
const symptomOptions = [
  { label: '头晕、头疼症状', value: 0 },
  { label: '体力劳动、精神紧张或激动时出现胸痛症状，休息后逐渐缓解', value: 1 },
  { label: '呼吸困难或慢性咳嗽', value: 2 },
  { label: '多饮、多尿、多食、不明原因体重下降', value: 3 },
  { label: '一过性黑蒙、眩晕', value: 4 }
]
const diseaseOptions = {
  hasHypertension: { label: '高血压', iconType: 'plus-circle', value: 0 },
  hasDiabetes: { label: '糖尿病', iconType: 'plus-circle', value: 1 },
  hasStroke: { label: '脑卒中', iconType: 'plus-circle', value: 0 },
  hasAscvd: { label: '冠心病', iconType: 'plus-circle', value: 1 },
  hasCopd: { label: '慢阻肺', iconType: 'plus-circle', value: 0 }
}


export default {
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
      diseaseOptions,
      symptomCheck: [],
      form: this.$form.createForm(this)
    }
  },
  methods: {
    add () {
      this.visible = true
    },
    selectDisease (item) {
      console.log(item.value)
      item.value = item.value === 1 ? 0 : 1
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          values.hasHypertension = this.diseaseOptions.hasHypertension.value
          values.hasDiabetes = this.diseaseOptions.hasDiabetes.value
          values.hasStroke = this.diseaseOptions.hasStroke.value
          values.hasAscvd = this.diseaseOptions.hasAscvd.value
          values.hasCopd = this.diseaseOptions.hasCopd.value
          // values.symptomsHeadache = 0;
          // values.symptomsStethalgia = 0;
          // values.symptomsDyspnea = 0;
          // values.symptomsDiuresis = 0;
          // values.symptomsDizziness = 0;
          // this.symptomCheck.forEach(function(el){
          //   values[this.symptomOptions[el][name]] = 1;
          // })

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

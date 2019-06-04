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
          <a-col :md="24" :sm="24">
            <a-form-item label="医院名称">
              <a-input
                v-decorator="['doctor.hospital', {rules: [{required: true, min: 2, message: '请输入医院名称！'}]}]"
              />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="患者地址">
              <a-cascader :options="city" v-decorator="['temp.add']" placeholder="请选择省-市-区"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="详细地址">
              <a-input v-decorator="['doctor.detailAddress']" placeholder="请输入街道、门牌号等信息"/>
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item label="姓名">
              <a-input
                v-decorator="['doctor.name', {rules: [{required: true, min: 2, message: '请输入姓名！'}]}]"
              />
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item label="科室">
              <a-input
                v-decorator="['doctor.department', {rules: [{required: true, min: 2, message: '请输入科室！'}]}]"
              />
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item label="职务">
              <a-input
                v-decorator="['doctor.role', {rules: [{required: true, min: 2, message: '请输入职务！'}]}]"
              />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="性别">
              <a-select
                v-decorator="['doctor.gender', {rules: [{required: true, message: '请选择性别！'}]}]"
              >
                <a-select-option value="0">男</a-select-option>
                <a-select-option value="1">女</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item label="手机号">
              <a-input
                v-decorator="['doctor.phoneNumber', {rules: [{required: true, len: 11, message: '请输入手机号码！'}]}]"
              />
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item label="用户名">
              <a-input
                v-decorator="['doctor.username', {rules: [{required: true,  message: '请输入用户名！'}]}]"
              />
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item label="密码">
              <a-input
                v-decorator="['doctor.password', {rules: [{required: true,  message: '请输入密码！'}]}]"
              />
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
import Vue from 'vue'
import Component from 'vue-class-component'
import ImageCheckbox from '@/components/ImageCheckbox'
import City from '@/api/city'

@Component({
  components: {
    ImageCheckbox,
  },
  props: {
    id: String,
  },
})
export default class extends Vue {
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
      symptomCheck: [],
      form: this.$form.createForm(this),
      city: City,
    }
  }
  add() {
    this.form.resetFields()
    this.visible = true
  }
  handleSubmit() {
    const {
      form: { validateFields },
    } = this
    this.confirmLoading = true
    const self = this
    validateFields((errors, values) => {
      if (!errors) {
        const doctor = {
          ...values.doctor,
          province: (values.temp.add.length && values.temp.add[0]) || '',
          city: (values.temp.add.length && values.temp.add[1]) || '',
          county: (values.temp.add.length && values.temp.add[2]) || '',
        }
        setTimeout(() => {
          this.visible = false
          this.confirmLoading = false
          console.info(`add doctor data is ${JSON.stringify(doctor)}`)
          this.$emit('ok', doctor)
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

<template>
  <a-modal
    title="新建医生"
    :width="750"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :footer="null"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form" layout="vertical" id="root-container">
        <a-row :gutter="12" type="flex" align="top">
          <a-col :md="24" :sm="24">
            <a-form-item label="医院名称">
              <a-input
                v-decorator="['doctor.hospital', {rules: [{required: true, min: 2, message: '请输入医院名称！'}], validateTrigger: ['change', 'blur']}]"
              />
            </a-form-item>
          </a-col>
          <a-col :md="16" :sm="24">
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
                v-decorator="['doctor.name', {rules: [{required: true, min: 2, message: '请输入姓名！'}], validateTrigger: ['change', 'blur']}]"
              />
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item label="科室">
              <a-input
                v-decorator="['doctor.department', {rules: [{required: true, min: 2, message: '请输入科室！'}], validateTrigger: ['change', 'blur']}]"
              />
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item label="职务">
              <a-input
                v-decorator="['doctor.role', {rules: [{required: true, min: 2, message: '请输入职务！'}], validateTrigger: ['change', 'blur']}]"
              />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="性别">
              <a-select
                v-decorator="['doctor.gender', {rules: [{required: true, message: '请选择性别！'}], validateTrigger: ['change', 'blur']}]"
              >
                <a-select-option value="0">男</a-select-option>
                <a-select-option value="1">女</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item label="手机号">
              <a-input
                v-decorator="['doctor.phoneNumber', {rules: [{ required: true, pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号' }], validateTrigger: 'change'}]"
              />
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item label="用户名">
              <a-input
                v-decorator="['doctor.username', {rules: [{required: true,  message: '请输入用户名！'}], validateTrigger: ['change', 'blur']}]"
              />
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-popover placement="rightTop" trigger="click" :visible="state.passwordLevelChecked">
              <template slot="content">
                <div :style="{ width: '240px' }">
                  <div :class="['user-register', passwordLevelClass]">
                    强度：
                    <span>{{ passwordLevelName }}</span>
                  </div>
                  <a-progress
                    :percent="state.percent"
                    :showInfo="false"
                    :strokeColor=" passwordLevelColor "
                  />
                  <div style="margin-top: 10px;">
                    <span>请至少输入 6 个字符。请不要使用容易被猜到的密码。</span>
                  </div>
                </div>
              </template>
              <a-form-item label="密码">
                <a-input
                  size="large"
                  type="password"
                  @click="handlePasswordInputClick"
                  autocomplete="false"
                  placeholder="至少6位密码，区分大小写"
                  v-decorator="['doctor.password', {rules: [{ required: true, message: '至少6位密码，区分大小写'}, { validator: this.handlePasswordLevel }], validateTrigger: ['change', 'blur']}]"
                ></a-input>
              </a-form-item>
            </a-popover>
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
import Component, { mixins } from 'vue-class-component'
import ImageCheckbox from '@/components/ImageCheckbox'
import City from '@/api/city'
import { mixinDevice } from '@/utils/mixin.js'

const levelNames = {
  0: '低',
  1: '低',
  2: '中',
  3: '强',
}
const levelClass = {
  0: 'error',
  1: 'error',
  2: 'warning',
  3: 'success',
}
const levelColor = {
  0: '#ff0000',
  1: '#ff0000',
  2: '#ff7e05',
  3: '#52c41a',
}

@Component({
  components: {
    ImageCheckbox,
  },
  props: {
    id: String,
  },
})
export default class extends mixins(mixinDevice) {
  data() {
    return {
      state: {
        passwordLevel: 0,
        passwordLevelChecked: false,
        percent: 10,
        progressColor: '#FF0000',
      },
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

  handlePasswordLevel(rule, value, callback) {
    let level = 0

    // 判断这个字符串中有没有数字
    if (/[0-9]/.test(value)) {
      level++
    }
    // 判断字符串中有没有字母
    if (/[a-zA-Z]/.test(value)) {
      level++
    }
    // 判断字符串中有没有特殊符号
    if (/[^0-9a-zA-Z_]/.test(value)) {
      level++
    }
    this.state.passwordLevel = level
    this.state.percent = level * 30
    if (level >= 2) {
      if (level >= 3) {
        this.state.percent = 100
      }
      callback()
    } else {
      if (level === 0) {
        this.state.percent = 10
      }
      callback(new Error('密码强度不够'))
    }
  }

  handlePasswordCheck(rule, value, callback) {
    const password = this.form.getFieldValue('password')
    console.log('value', value)
    if (value === undefined) {
      callback(new Error('请输入密码'))
    }
    if (value && password && value.trim() !== password.trim()) {
      callback(new Error('两次密码不一致'))
    }
    callback()
  }

  handlePhoneCheck(rule, value, callback) {
    // console.log('handlePhoneCheck, rule:', rule)
    // console.log('handlePhoneCheck, value', value)
    // console.log('handlePhoneCheck, callback', callback)

    callback()
  }

  handlePasswordInputClick() {
    if (!this.isMobile()) {
      this.state.passwordLevelChecked = true
      return
    }
    this.state.passwordLevelChecked = false
  }

  get passwordLevelClass() {
    return levelClass[this.state.passwordLevel]
  }
  get passwordLevelName() {
    return levelNames[this.state.passwordLevel]
  }
  get passwordLevelColor() {
    return levelColor[this.state.passwordLevel]
  }
}
</script>

<style lang="less" scoped>
#root-container /deep/ .ant-form-item {
  padding-bottom: 0px;
}

#root-container /deep/ .ant-form-item-label {
  padding-bottom: 3px;
}
</style>

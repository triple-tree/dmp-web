<template>
  <div class="main user-layout-register">
    <!-- <h2>
      <span>医生注册页面</span>
    </h2>-->
    <a-form ref="formRegister" :form="form" id="formRegister">
      <a-col class="gutter-row" :span="10">
        <a-col :md="24" :sm="24">
          <a-form-item label="医院名称">
            <a-input
              size="large"
              type="text"
              placeholder="请输入医院名称"
              v-decorator="['doctor.hospital', {rules: [{required: true, min: 2, message: '请输入医院名称！'}], validateTrigger: ['change', 'blur']}]"
            />
          </a-form-item>
        </a-col>
        <a-col :md="16" :sm="16">
          <a-form-item label="患者地址">
            <a-input
              size="large"
              type="text"
              placeholder="请输入街道、门牌号等信息"
              v-decorator="['doctor.detailAddress']"
            />
          </a-form-item>
        </a-col>
        <a-col class="gutter-row" :md="2" :sm="2"></a-col>
        <a-col :md="6" :sm="6">
          <a-form-item label="详细地址">
            <a-input
              size="large"
              type="text"
              placeholder="请输入街道、门牌号等信息"
              v-decorator="['doctor.detailAddress']"
            />
          </a-form-item>
        </a-col>
        <a-col :md="24" :sm="24">
          <a-form-item label="姓名">
            <a-input
              size="large"
              type="text"
              placeholder="请输入姓名"
              v-decorator="['doctor.name', {rules: [{required: true, min: 2, message: '请输入姓名！'}], validateTrigger: ['change', 'blur']}]"
            />
          </a-form-item>
        </a-col>
        <a-col :md="24" :sm="24">
          <a-form-item label="科室">
            <a-input
              size="large"
              type="text"
              placeholder="请输入科室"
              v-decorator="['doctor.department', {rules: [{required: true, min: 2, message: '请输入科室！'}], validateTrigger: ['change', 'blur']}]"
            />
          </a-form-item>
        </a-col>
        <a-col :md="24" :sm="24">
          <a-form-item label="职务">
            <a-input
              size="large"
              type="text"
              placeholder="请输入职务"
              v-decorator="['doctor.role', {rules: [{required: true, min: 2, message: '请输入职务！'}], validateTrigger: ['change', 'blur']}]"
            />
          </a-form-item>
        </a-col>
      </a-col>
      <a-col class="gutter-row" :span="2"></a-col>
      <a-col class="gutter-row" :span="10">
        <a-col :md="24" :sm="24">
          <a-form-item label="邮箱">
            <a-input
              size="large"
              type="text"
              placeholder="请输入邮箱"
              v-decorator="['email', {rules: [{ required: true, type: 'email', message: '请输入邮箱地址' }], validateTrigger: ['change', 'blur']}]"
            ></a-input>
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
                v-decorator="['password', {rules: [{ required: true, message: '至少6位密码，区分大小写'}, { validator: this.handlePasswordLevel }], validateTrigger: ['change', 'blur']}]"
              ></a-input>
            </a-form-item>
          </a-popover>
        </a-col>
        <a-col :md="24" :sm="24">
          <a-form-item label="确认密码">
            <a-input
              size="large"
              type="password"
              autocomplete="false"
              placeholder="请确认密码"
              v-decorator="['password2', {rules: [{ required: true, message: '至少6位密码，区分大小写' }, { validator: this.handlePasswordCheck }], validateTrigger: ['change', 'blur']}]"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :md="24" :sm="24">
          <a-form-item label="手机号码">
            <a-input
              size="large"
              placeholder="请输入11位手机号"
              v-decorator="['mobile', {rules: [{ required: true, message: '请输入正确的手机号', pattern: /^1[3456789]\d{9}$/ }, { validator: this.handlePhoneCheck } ], validateTrigger: ['change', 'blur'] }]"
            >
              <a-select slot="addonBefore" size="large" defaultValue="+86">
                <a-select-option value="+86">+86</a-select-option>
                <a-select-option value="+87">+87</a-select-option>
              </a-select>
            </a-input>
          </a-form-item>
        </a-col>

        <a-col class="gutter-row" :md="16" :sm="16">
          <a-form-item label="验证码">
            <a-input
              size="large"
              type="text"
              placeholder="请输入验证码"
              v-decorator="['captcha', {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}]"
            >
              <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>
        </a-col>
        <a-col class="gutter-row" :md="2" :sm="2"></a-col>
        <a-col class="gutter-row" :md="6" :sm="6">
          <a-button
            class="getCaptcha margin-top-38"
            size="large"
            :disabled="state.smsSendBtn"
            @click.stop.prevent="getCaptcha"
            v-text="!state.smsSendBtn && '获取验证码'||(state.time+' s')"
          ></a-button>
        </a-col>
      </a-col>
      <a-col class="gutter-row" :md="24" :sm="24">
        <a-form-item>
          <a-col class="gutter-row" :md="4" :sm="4"></a-col>
          <a-col class="gutter-row" :md="4" :sm="4">
            <a-button
              size="large"
              type="primary"
              htmlType="submit"
              class="register-button"
              :loading="registerBtn"
              @click.stop.prevent="handleSubmit"
              :disabled="registerBtn"
            >注册</a-button>
          </a-col>
          <a-col class="gutter-row" :md="4" :sm="4"></a-col>
          <a-col class="gutter-row" :md="12" :sm="12">
            <router-link class="login" :to="{ name: 'login' }">使用已有账户登录</router-link>
          </a-col>
        </a-form-item>
      </a-col>
    </a-form>
  </div>
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

  handlePasswordInputBlur() {
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
.main {
  width: 1200px !important;
  #root-container /deep/ .ant-form-item {
    padding-bottom: 0px;
  }

  #root-container /deep/ .ant-form-item-label {
    padding-bottom: 3px;
  }

  .margin-top-38 {
    margin-top: 38px;
  }
}
</style>

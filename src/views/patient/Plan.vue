<template>
  <div class="root-container">
    <a-form layout="inline">
      <h3>评估</h3>
      <a-row :gutter="8" v-for="(k, index) in form.getFieldValue('assessments')" :key="k">
        <a-col :span="11">
          <a-form-item
            label="评估"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-select :defaultValue="k.assessment" style="width: 120px" @change="handleChange">
              <a-select-option value="ASCVD评估1">ASCVD评估1</a-select-option>
              <a-select-option value="ASCVD评估2">ASCVD评估2</a-select-option>
              <a-select-option value="ASCVD评估3">ASCVD评估4</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="11">
          <a-form-item
            label="评估结果"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input
              v-decorator="[
          'weight',
          {rules: [{ initialValue: '', required: true, message: '请输入评估结果' }]}
        ]"
              placeholder="输入评估结果"
            />
          </a-form-item>
        </a-col>
        <a-col :span="2">
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-icon
              v-if="form.getFieldValue('assessments').length > 1"
              class="dynamic-delete-button"
              type="minus-circle-o"
              :disabled="form.getFieldValue('assessments').length === 1"
              @click="() => remove('assessments', k)"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-button type="dashed" block @click="add('assessments')">
          <a-icon type="plus"/>添加评估
        </a-button>
      </a-row>

      <h3>处方</h3>
      <a-row :gutter="8" v-for="(k, index) in form.getFieldValue('prescriptions')" :key="k">
        <a-col :span="7">
          <a-form-item
            label="药名"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input
              v-decorator="[
          'medicine',
          {rules: [{ initialValue: '', required: true, message: '请输入药名' }]}
        ]"
              placeholder="输入药名"
            />
          </a-form-item>
        </a-col>
        <a-col :span="5">
          <a-form-item
            label="频次"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input
              v-decorator="[
          'frequency',
          {rules: [{ initialValue: '', required: true, message: '请输入频次' }]}
        ]"
              placeholder="输入频次"
            />
          </a-form-item>
        </a-col>
        <a-col :span="5">
          <a-form-item
            label="剂量"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input
              v-decorator="[
          'dosage',
          {rules: [{ initialValue: '', required: true, message: '请输入剂量' }]}
        ]"
              placeholder="输入剂量"
            />
          </a-form-item>
        </a-col>
        <a-col :span="5">
          <a-form-item
            label="备注"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input
              v-decorator="[
          'remark',
          {rules: [{ initialValue: '', required: true, message: '请输入备注' }]}
        ]"
              placeholder="输入备注"
            />
          </a-form-item>
        </a-col>
        <a-col :span="2">
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-icon
              v-if="form.getFieldValue('prescriptions').length > 1"
              class="dynamic-delete-button"
              type="minus-circle-o"
              :disabled="form.getFieldValue('prescriptions').length === 1"
              @click="() => remove('prescriptions', k)"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-button type="dashed" block @click="add('prescriptions')">
          <a-icon type="plus"/>添加处方
        </a-button>
      </a-row>

      <h3>运动</h3>
      <a-row :gutter="8" v-for="(k, index) in form.getFieldValue('sports')" :key="k">
        <a-col :span="7">
          <a-form-item
            label="运动"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input
              v-decorator="[
          'sport',
          {rules: [{ initialValue: '', required: true, message: '请输入运动' }]}
        ]"
              placeholder="输入运动"
            />
          </a-form-item>
        </a-col>
        <a-col :span="5">
          <a-form-item
            label="频次"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input
              v-decorator="[
          's-frequency',
          {rules: [{ initialValue: '', required: true, message: '请输入频次' }]}
        ]"
              placeholder="输入频次"
            />
          </a-form-item>
        </a-col>
        <a-col :span="5">
          <a-form-item
            label="剂量"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input
              v-decorator="[
          's-dosage',
          {rules: [{ initialValue: '', required: true, message: '请输入剂量' }]}
        ]"
              placeholder="输入剂量"
            />
          </a-form-item>
        </a-col>
        <a-col :span="5">
          <a-form-item
            label="备注"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input
              v-decorator="[
          's-remark',
          {rules: [{ initialValue: '', required: true, message: '请输入备注' }]}
        ]"
              placeholder="输入备注"
            />
          </a-form-item>
        </a-col>
        <a-col :span="2">
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-icon
              v-if="form.getFieldValue('sports').length > 1"
              class="dynamic-delete-button"
              type="minus-circle-o"
              :disabled="form.getFieldValue('sports').length === 1"
              @click="() => remove('sports', k)"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-button type="dashed" block @click="add('sports')">
          <a-icon type="plus"/>添加运动
        </a-button>
      </a-row>

      <h3>饮食建议</h3>
      <a-row :gutter="8" v-for="(k, index) in form.getFieldValue('diets')" :key="k">
        <a-col :span="22">
          <a-form-item
            label="饮食建议"
            :label-col="formItemLayout.shortLabelCol"
            :wrapper-col="formItemLayout.shortWrapperCol"
          >
            <a-input
              v-decorator="[
          'diet',
          {rules: [{ initialValue: '', required: true, message: '请输入饮食建议' }]}
        ]"
              placeholder="输入饮食建议"
            />
          </a-form-item>
        </a-col>
        <a-col :span="2">
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-icon
              v-if="form.getFieldValue('diets').length > 1"
              class="dynamic-delete-button"
              type="minus-circle-o"
              :disabled="form.getFieldValue('diets').length === 1"
              @click="() => remove('diets', k)"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-button type="dashed" block @click="add('diets')">
          <a-icon type="plus"/>添加饮食建议
        </a-button>
      </a-row>

      <h3>其他建议</h3>
      <a-row :gutter="8" v-for="(k, index) in form.getFieldValue('others')" :key="k">
        <a-col :span="22">
          <a-form-item
            label="其他建议"
            :label-col="formItemLayout.shortLabelCol"
            :wrapper-col="formItemLayout.shortWrapperCol"
          >
            <a-input
              v-decorator="[
          'other',
          {rules: [{ initialValue: '', required: true, message: '请输入其他建议' }]}
        ]"
              placeholder="输入其他建议"
            />
          </a-form-item>
        </a-col>
        <a-col :span="2">
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-icon
              v-if="form.getFieldValue('others').length > 1"
              class="dynamic-delete-button"
              type="minus-circle-o"
              :disabled="form.getFieldValue('others').length === 1"
              @click="() => remove('others', k)"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-button type="dashed" block @click="add('others')">
          <a-icon type="plus"/>添加其他建议
        </a-button>
      </a-row>

      <h3>就诊提醒</h3>
      <a-row :gutter="8">
        <a-col :span="8">
          <a-form-item
            label="就诊时间"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-date-picker/>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item
            label="随诊类型"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-select style="width: 120px" @change="handleChange">
              <a-select-option value="ASCVD1">ASCVD1</a-select-option>
              <a-select-option value="ASCVD2">ASCVD2</a-select-option>
              <a-select-option value="ASCVD3">ASCVD4</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item
            label="就诊医院"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input
              v-decorator="[
          'height',
          {rules: [{ required: true, message: '请输入就诊医院' }]}
        ]"
              placeholder="输入就诊医院"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :span="8">
          <a-form-item
            label="相关病"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input
              v-decorator="[
          'weight',
          {rules: [{ required: true, message: '请输入相关病' }]}
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
              v-decorator="[
          'waistline',
          {rules: [{ required: true, message: '请输入原因' }]}
        ]"
              placeholder="输入原因"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="8">
        <a-col :span="8">
          <a-form-item>
            <a-button type="primary" html-type="submit">保存</a-button>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item>
            <a-button type="default" html-type="submit">生成患者的管理报告</a-button>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item>
            <a-button type="default" html-type="submit">历史记录</a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>
import { statsAll, statsPatients, statsPlans } from '@/api/stats'
import Vue from 'vue'
import Component from 'vue-class-component'
import Mock, { Random } from 'mockjs2'

@Component
export default class extends Vue {
  async created() {}

  beforeCreate() {
    this.form = this.$form.createForm(this)
    this.form.getFieldDecorator('assessments', { initialValue: [{ assessment: '', value: '' }], preserve: true })
    this.form.getFieldDecorator('prescriptions', {
      initialValue: [{ medicine: '', frequency: '', dosage: '', remark: '' }],
      preserve: true
    })
    this.form.getFieldDecorator('sports', {
      initialValue: [{ sport: '', 's-frequency': '', 's-dosage': '', 's-remark': '' }],
      preserve: true
    })
    this.form.getFieldDecorator('diets', {
      initialValue: [{ diet: '' }],
      preserve: true
    })
    this.form.getFieldDecorator('others', {
      initialValue: [{ other: '' }],
      preserve: true
    })
  }

  remove(type, k) {
    const { form } = this
    // can use data-binding to get
    const value = form.getFieldValue(type)
    // can use data-binding to set
    form.setFieldsValue({
      [type]: value.filter(key => key !== k)
    })
  }

  add(type) {
    const { form } = this
    // can use data-binding to get
    const value = form.getFieldValue(type)
    const newValue = [...value]
    if (type === 'assessments') {
      newValue.push({ assessment: '', value: '' })
    } else if (type === 'prescriptions') {
      newValue.push({ medicine: '', frequency: '', dosage: '', remark: '' })
    } else if (type === 'sports') {
      newValue.push({ sport: '', 's-frequency': '', 's-dosage': '', 's-remark': '' })
    } else if (type === 'diets') {
      newValue.push({ diet: '' })
    } else if (type === 'others') {
      newValue.push({ other: '' })
    }
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      [type]: newValue
    })
  }

  MockImage(text) {
    return Random.image('100x100', Random.color(), '#000', 'png', text)
  }

  data() {
    return {
      formItemLayout: {
        labelCol: {
          xs: { span: 8 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 16, offset: 0 },
          sm: { span: 16, offset: 0 }
        },
        shortLabelCol: {
          xs: { span: 4 },
          sm: { span: 4 }
        },
        shortWrapperCol: {
          xs: { span: 20, offset: 0 },
          sm: { span: 20, offset: 0 }
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
h3 {
  margin: 10px 0;
}

.width-10-percent {
  width: 10%;
}

.width-20-percent {
  width: 20%;
}

.width-30-percent {
  width: 30%;
}

.width-40-percent {
  width: 40%;
}

.width-50-percent {
  width: 50%;
}

.width-60-percent {
  width: 60%;
}

.width-70-percent {
  width: 70%;
}

.width-80-percent {
  width: 80%;
}

.width-90-percent {
  width: 90%;
}

.width-100-percent {
  width: 100%;
}

.symptom-image {
  width: 100px;
  height: 100px;
  margin: 10px;
}

.root-container /deep/ .ant-form-item-label {
  text-align: left;
}

.root-container /deep/ .ant-form-inline,
.root-container /deep/ .ant-form-item {
  margin-right: 10px;
  width: 100%;
}
</style>

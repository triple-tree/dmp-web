<template>
  <div class="root-container">
    <a-form layout="inline" :form="form" @submit="handleSubmit">
      <h3>该患者主要健康状况评估结果如下：</h3>

      <a-row :gutter="8" class="ass-item" v-if="assessmentFive.name != ''">
        <a-col :span="20">
          {{ assessmentFive.name }} —
          <em v-html="assessmentFive.suggestion"></em>
        </a-col>
        <a-col :span="4">{{ assessmentFive.date }}</a-col>
      </a-row>
      <a-row :gutter="8" class="ass-item" v-for="item in assessmentList" :key="item.index">
        <a-col :span="20">
          {{ item.name }} —
          <em v-html="item.suggestion"></em>
        </a-col>
        <a-col :span="4">{{ item.date }}</a-col>
      </a-row>
      <h3>药品方案</h3>
      <a-row
        :gutter="8"
        v-for="(item, index) in indexes['prescriptions']"
        :key="'prescriptions_' + item"
      >
        <a-col :span="6">
          <a-form-item
            label="药名"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input
              v-decorator="[
                `prescriptions[${index}].prescription`,
                <!-- {initialValue: prescriptions[index].prescription, rules: [{ message: '请输入药名' }]} -->
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
              v-decorator="[
                `prescriptions[${index}].frequency`,
                <!-- {initialValue: prescriptions[index].frequency, rules: [{ message: '请输入频次' }]} -->
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
              v-decorator="[
                `prescriptions[${index}].dosage`,
                <!-- {initialValue: prescriptions[index].dosage, rules: [{ message: '请输入剂量' }]} -->
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
              v-decorator="[
                `prescriptions[${index}].reason`,
                <!-- {initialValue: prescriptions[index].reason, rules: [{ message: '请输入原因' }]} -->
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
              v-decorator="[
                `prescriptions[${index}].remark`,
                <!-- {initialValue: prescriptions[index].remark, rules: [{ message: '请输入备注' }]} -->
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
              v-if="indexes['prescriptions'].length > 1"
              class="dynamic-delete-button"
              type="minus-circle-o"
              :disabled="indexes['prescriptions'].length === 1"
              @click="() => remove('prescriptions', item)"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-button type="dashed" block @click="add('prescriptions')">
          <a-icon type="plus" />添加药品方案
        </a-button>
      </a-row>

      <h3>运动方案</h3>
      <a-row :gutter="8" v-for="(item, index) in indexes['exercise']" :key="'exercise' + item">
        <a-col :span="6">
          <a-form-item
            label="运动类型"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input
              v-decorator="[
                `exercise[${index}].sport`,
                <!-- {initialValue: exercise[index].sport, rules: [{ message: '请输入运动' }]} -->
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
              v-decorator="[
                `exercise[${index}].frequency`,
                <!-- {initialValue: exercise[index].frequency, rules: [{ message: '请输入运动频次' }]} -->
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
              v-decorator="[
                `exercise[${index}].strength`,
                <!-- {initialValue: exercise[index].strength, rules: [{ message: '请输入运动强度' }]} -->
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
              v-decorator="[
                `exercise[${index}].reason`,
                <!-- {initialValue: exercise[index].reason, rules: [{ message: '请输入原因' }]} -->
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
              v-decorator="[
                `exercise[${index}].remark`,
                <!-- {initialValue: exercise[index].remark, rules: [{ message: '请输入备注' }]} -->
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
              v-if="indexes['exercise'].length > 1"
              class="dynamic-delete-button"
              type="minus-circle-o"
              :disabled="indexes['exercise'].length === 1"
              @click="() => remove('exercise', item)"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-button type="dashed" block @click="add('exercise')">
          <a-icon type="plus" />添加运动方案
        </a-button>
      </a-row>

      <h3>饮食方案</h3>
      <a-row :gutter="8" v-for="(item, index) in indexes['food']" :key="'food' + item">
        <a-col :span="14">
          <a-form-item
            label="饮食建议"
            :label-col="formItemLayout.shortLabelCol"
            :wrapper-col="formItemLayout.shortWrapperCol"
          >
            <a-input
              v-decorator="[
                `food[${index}].food`,
                <!-- {initialValue: food[index].food, rules: [{ message: '请输入饮食建议' }]} -->
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
              v-decorator="[
                `food[${index}].reason`,
                <!-- {initialValue: food[index].reason, rules: [{ message: '请输入原因' }]} -->
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
              v-decorator="[
                `food[${index}].remark`,
                <!-- {initialValue: food[index].remark, rules: [{ message: '请输入备注' }]} -->
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
              v-if="indexes['food'].length > 1"
              class="dynamic-delete-button"
              type="minus-circle-o"
              :disabled="indexes['food'].length === 1"
              @click="() => remove('food', item)"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-button type="dashed" block @click="add('food')">
          <a-icon type="plus" />添加饮食建议
        </a-button>
      </a-row>

      <h3>其他方案</h3>
      <a-row :gutter="8" v-for="(item, index) in indexes['others']" :key="'others' + item">
        <a-col :span="14">
          <a-form-item
            label="其他建议"
            :label-col="formItemLayout.shortLabelCol"
            :wrapper-col="formItemLayout.shortWrapperCol"
          >
            <a-input
              v-decorator="[
                `others[${index}].other`,
                <!-- {initialValue: others[index].other, rules: [{ message: '请输入其他建议' }]} -->
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
              v-decorator="[
                `others[${index}].reason`,
                <!-- {initialValue: others[index].reason, rules: [{ message: '请输入原因' }]} -->
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
              v-decorator="[
                `others[${index}].remark`,
                <!-- {initialValue: others[index].remark, rules: [{ message: '请输入备注' }]} -->
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
              v-if="indexes['others'].length > 1"
              class="dynamic-delete-button"
              type="minus-circle-o"
              :disabled="indexes['others'].length === 1"
              @click="() => remove('others', item)"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-button type="dashed" block @click="add('others')">
          <a-icon type="plus" />添加其他建议
        </a-button>
      </a-row>

      <h3>就诊方案</h3>
      <a-row :gutter="8">
        <a-col :span="8">
          <a-form-item
            label="就诊时间"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-select
              v-decorator="[
                'clinicRemind.suggestDate',
                {initialValue: clinicRemind.suggestDate}
              ]"
              style="width: 120px"
            >
              <a-select-option value="两星期内">两星期内</a-select-option>
              <a-select-option value="一个月内">一个月内</a-select-option>
              <a-select-option value="两个月内">两个月内</a-select-option>
              <a-select-option value="三个月内">三个月内</a-select-option>
              <a-select-option value="六个月内">六个月内</a-select-option>
              <a-select-option value="一年内">一年内</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item
            label="随诊类型"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-select
              v-decorator="[
                'clinicRemind.type',
                {initialValue: clinicRemind.type}
              ]"
              style="width: 120px"
            >
              <a-select-option value="转诊">转诊</a-select-option>
              <a-select-option value="观察">复诊</a-select-option>
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
                'clinicRemind.targetHospital',
                <!-- {initialValue: clinicRemind.targetHospital, rules: [{ message: '请输入就诊医院' }]} -->
              ]"
              placeholder="输入就诊医院"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :span="8">
          <a-form-item
            label="相关疾病"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input
              v-decorator="[
                'clinicRemind.relatedDisease',
                <!-- {initialValue: clinicRemind.relatedDisease, rules: [{ message: '请输入相关疾病' }]} -->
              ]"
              placeholder="请输入相关疾病"
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
                'clinicRemind.reason',
                <!-- {initialValue: clinicRemind.reason, rules: [{ message: '请输入原因' }]} -->
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
            <a-button type="default" @click="showReport">生成患者的管理报告</a-button>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item>
            <a-button type="default" @click="showHistoryRecords">历史健康方案</a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <plan-history-modal ref="modalForm"></plan-history-modal>
    <report ref="report" :id="id"></report>
  </div>
</template>

<script>
import { planAdd } from '@/api/plan'
import Vue from 'vue'
import Component from 'vue-class-component'
import Mock, { Random } from 'mockjs2'
import { USER_INFO } from '@/store/mutation-types'
import moment from 'moment'
import 'moment/locale/zh-cn'
import PlanHistoryModal from './PlanHistoryModal'
import Report from './Report'
import { otherLatest } from '../../api/assessment'
import debug from 'debug'
moment.locale('zh-cn')
const log = debug('app:plan')

@Component({
  components: {
    PlanHistoryModal,
    Report,
  },
  props: {
    id: String,
  },
})
export default class extends Vue {
  data() {
    return {
      indexes: { prescriptions: [0], exercise: [0], food: [0], others: [0] },
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
      assessmentList: [],
      assessmentFive: {},
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

  async created() {
    log(`created`)
    // const { form, clinicRemind } = this
    // form.setFieldsValue({
    //   'clinicRemind.suggestDate': [moment(clinicRemind.suggestDate[0]), moment(clinicRemind.suggestDate[1])],
    // })
    // const value = form.getFieldValue('clinicRemind.suggestDate')
    // log(`value: ${JSON.stringify(value)}`)
  }

  beforeCreate() {
    log(`beforeCreate`)
  }

  getLatestFive(risk, date) {
    log('plan---', risk)
    this.assessmentFive = {}
    if (!risk) return
    this.assessmentFive = {
      name: '五病综合筛查',
      suggestion: risk,
      date: date,
    }
  }

  getLatestAll() {
    log('plan getlatestall')
    const type = [
      'Ascvd',
      '生活质量SF-12量表',
      '糖尿病自我效能评估',
      'Determine营养风险检测',
      '快速抑郁评估PHQ-9',
      '匹兹堡睡眠评估量表',
    ]
    const self = this
    this.assessmentList = []
    type.forEach(function (key) {
      self.getLatest(key)
    })
    log('assessmentList---', this.assessmentList)
  }

  // 获取ssy,Ascvd最新评估结果
  async getLatest(type) {
    const params = {
      patientId: this.id,
      type: type,
    }
    const assessmentResult = (await otherLatest(null, params)).data
    if (!assessmentResult) return
    assessmentResult.result = assessmentResult.result && JSON.parse(assessmentResult.result)

    if (assessmentResult.type === 'Ascvd') {
      assessmentResult.result.suggestion = assessmentResult.result || ''
    }
    this.assessmentList.push({
      name: assessmentResult.type,
      suggestion: (assessmentResult.result.level || '') + ',' + assessmentResult.result.suggestion || '',
      date: assessmentResult.createDate || '',
    })
  }

  async handleSubmit(e) {
    e.preventDefault()
    this.form.validateFields(async (err, values) => {
      if (!err) {
        // log(`Received values of form: ${JSON.stringify(values, null, 2)}`)
        const data = { doctorId: Vue.ls.get(USER_INFO).data.id, patientId: this.id, planDetail: { ...values } }
        log(`planAdd data : ${JSON.stringify(data, null, 2)}`)
        const res = await planAdd(data)
        if (res.code === 200) {
          this.$message.success('新建健康方案成功')
        } else {
          this.$message.error('新建健康方案失败')
        }
      }
    })
  }

  remove(type, item) {
    const { form } = this
    const indexData = this.indexes[type]
    const index = indexData.indexOf(item)
    this.indexes[type].splice(index, 1)
    // const value = this[type]
    const value = form.getFieldValue(type)
    log(`value: ${JSON.stringify(value)}`)
    const newValue = [...value]
    newValue.splice(index, 1)
    this[type] = newValue
  }

  add(type) {
    const { form } = this
    const indexData = this.indexes[type]
    indexData.push(indexData[indexData.length - 1] + 1)
    // const value = this[type]
    const value = form.getFieldValue(type)
    const newValue = [...value]
    if (type === 'assessments') {
      newValue.push({ assessment: '', value: '' })
    } else if (type === 'prescriptions') {
      newValue.push({ prescription: '', frequency: '', dosage: '', reason: '', remark: '' })
    } else if (type === 'exercise') {
      newValue.push({ sport: '', frequency: '', strength: '', reason: '', remark: '' })
    } else if (type === 'food') {
      newValue.push({ food: '' })
    } else if (type === 'others') {
      newValue.push({ other: '' })
    }
    this[type] = newValue
  }

  showHistoryRecords() {
    this.$refs.modalForm.show(this.id)
  }

  showReport() {
    this.$refs.report.show(this.id)
  }
}
</script>

<style lang="less" scoped>
h3 {
  margin: 10px 0;
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
.ass-item {
  font-size: 14px;
  color: #000;
  opacity: 0.85;
}
.ass-item em {
  font-style: normal;
  color: #f00;
}
</style>

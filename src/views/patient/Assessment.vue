<template>
  <div class="root-container">
    <a-form layout="inline">
      <h3>基本信息</h3>
      <a-row :gutter="8">
        <a-col :span="8">
          <a-form-item
            label="身高"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input
              v-decorator="[
          'height',
          {rules: [{ required: true, message: '请输入身高' }]}
        ]"
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
              v-decorator="[
          'weight',
          {rules: [{ required: true, message: '请输入体重' }]}
        ]"
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
              v-decorator="[
          'waistline',
          {rules: [{ required: true, message: '请输入腰围' }]}
        ]"
              placeholder="输入腰围"
              addonAfter="CM"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :span="8">
          <a-form-item
            label="舒张压"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input
              v-decorator="[
          'height',
          {rules: [{ required: true, message: '请输入舒张压' }]}
        ]"
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
              v-decorator="[
          'weight',
          {rules: [{ required: true, message: '请输入收缩压' }]}
        ]"
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
              v-decorator="[
          'waistline',
          {rules: [{ required: true, message: '请输入空腹血糖' }]}
        ]"
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
              v-decorator="[
          'height',
          {rules: [{ required: true, message: '请输入总胆固醇' }]}
        ]"
              placeholder="输入总胆固醇"
              addonAfter="mmol/L"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <h3>既往史</h3>
      <a-row :gutter="8">
        <a-col :span="8">
          <a-form-item
            :label-col="formItemLayout.checkboxLabelCol"
            :wrapper-col="formItemLayout.checkboxWrapperCol"
          >
            <a-checkbox v-decorator="['height']">
              <img class="symptom-image" :src="MockImage('高血压')" alt>
            </a-checkbox>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item
            :label-col="formItemLayout.checkboxLabelCol"
            :wrapper-col="formItemLayout.checkboxWrapperCol"
          >
            <a-checkbox v-decorator="['height']">
              <img class="symptom-image" :src="MockImage('糖尿病')" alt>
            </a-checkbox>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item
            :label-col="formItemLayout.checkboxLabelCol"
            :wrapper-col="formItemLayout.checkboxWrapperCol"
          >
            <a-checkbox v-decorator="['height']">
              <img class="symptom-image" :src="MockImage('脑卒中')" alt>
            </a-checkbox>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item
            :label-col="formItemLayout.checkboxLabelCol"
            :wrapper-col="formItemLayout.checkboxWrapperCol"
          >
            <a-checkbox v-decorator="['height']">
              <img class="symptom-image" :src="MockImage('冠心病')" alt>
            </a-checkbox>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item
            :label-col="formItemLayout.checkboxLabelCol"
            :wrapper-col="formItemLayout.checkboxWrapperCol"
          >
            <a-checkbox v-decorator="['height']">
              <img class="symptom-image" :src="MockImage('慢阻肺')" alt>
            </a-checkbox>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item
            :label-col="formItemLayout.checkboxLabelCol"
            :wrapper-col="formItemLayout.checkboxWrapperCol"
          >
            <a-checkbox v-decorator="['height']">
              <img class="symptom-image" :src="MockImage('血脂异常')" alt>
            </a-checkbox>
          </a-form-item>
        </a-col>
      </a-row>

      <h3>家族史</h3>
      <a-row :gutter="8">
        <a-col :span="8">
          <a-form-item
            :label-col="formItemLayout.checkboxLabelCol"
            :wrapper-col="formItemLayout.checkboxWrapperCol"
          >
            <a-checkbox v-decorator="['height']">糖尿病</a-checkbox>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item
            :label-col="formItemLayout.checkboxLabelCol"
            :wrapper-col="formItemLayout.checkboxWrapperCol"
          >
            <a-checkbox v-decorator="['height']">高血压</a-checkbox>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item
            :label-col="formItemLayout.checkboxLabelCol"
            :wrapper-col="formItemLayout.checkboxWrapperCol"
          >
            <a-checkbox v-decorator="['height']">冠心病</a-checkbox>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item
            :label-col="formItemLayout.checkboxLabelCol"
            :wrapper-col="formItemLayout.checkboxWrapperCol"
          >
            <a-checkbox v-decorator="['height']">缺血性卒中（脑梗死）</a-checkbox>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item
            :label-col="formItemLayout.checkboxLabelCol"
            :wrapper-col="formItemLayout.checkboxWrapperCol"
          >
            <a-checkbox v-decorator="['height']">慢阻肺（COPD）</a-checkbox>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item
            :label-col="formItemLayout.checkboxLabelCol"
            :wrapper-col="formItemLayout.checkboxWrapperCol"
          >
            <a-checkbox v-decorator="['height']">其他</a-checkbox>
          </a-form-item>
        </a-col>
      </a-row>

      <h3>症状</h3>
      <a-row :gutter="8">
        <a-col :span="8">
          <a-form-item>
            <a-checkbox v-decorator="['height']">头晕、头疼症状</a-checkbox>
          </a-form-item>
        </a-col>
        <a-col :span="16">
          <a-form-item>
            <a-checkbox v-decorator="['height']">体力劳动、精神紧张或激烈时出现胸痛症状、休息后逐渐缓解</a-checkbox>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :span="8">
          <a-form-item>
            <a-checkbox v-decorator="['height']">呼吸困难或慢性咳嗽</a-checkbox>
          </a-form-item>
        </a-col>
        <a-col :span="16">
          <a-form-item>
            <a-checkbox v-decorator="['height']">多饮、多尿、多食、不明原因体重下降</a-checkbox>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item>
            <a-checkbox v-decorator="['height']">一般性黑蒙、眩晕</a-checkbox>
          </a-form-item>
        </a-col>
      </a-row>

      <h3>生活方式</h3>
      <a-row :gutter="8">
        <a-col :span="8">
          <a-form-item>
            <a-checkbox v-decorator="['height']">是否吸烟</a-checkbox>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item>
            <a-checkbox v-decorator="['height']">是否运动</a-checkbox>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :span="8">
          <a-form-item>
            <a-checkbox v-decorator="['height']">是否饮酒</a-checkbox>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="8">
        <a-col :span="8">
          <a-form-item>
            <a-button type="primary" html-type="submit">提交评估</a-button>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item>
            <a-button type="default" html-type="submit">历史评估记录</a-button>
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

  MockImage(text) {
    return Random.image('100x100', Random.color(), '#000', 'png', text)
  }

  data() {
    return {
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 24 }
        },
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 24, offset: 0 }
        },
        checkboxLabelCol: {
          xs: { span: 0 },
          sm: { span: 0 }
        },
        checkboxWrapperCol: {
          xs: { span: 24 },
          sm: { span: 24 }
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

.basic-form-item {
  width: 30%;
}

.symptom-image {
  width: 100px;
  height: 100px;
  margin: 10px;
}

.root-container /deep/ .ant-form-item-control {
  line-height: 25px;
}

.root-container /deep/ .ant-form-item-label {
  text-align: left;
  line-height: 25px;
}

.root-container /deep/ .ant-form-item {
  margin: 0 0 5px 0;
}
</style>

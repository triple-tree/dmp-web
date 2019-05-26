<template>
  <div class="root-container">
    <a-form layout="horizontal">
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
          {rules: [{  message: '请输入身高' }]}
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
          {rules: [{  message: '请输入体重' }]}
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
          {rules: [{  message: '请输入腰围' }]}
        ]"
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
              v-decorator="[
          'height',
          {rules: [{  message: '请输入舒张压' }]}
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
          {rules: [{  message: '请输入收缩压' }]}
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
          {rules: [{  message: '请输入空腹血糖' }]}
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
          {rules: [{  message: '请输入总胆固醇' }]}
        ]"
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
              v-decorator="[
          'weight',
          {rules: [{  message: '请输入高密度蛋白质胆固醇' }]}
        ]"
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
              v-decorator="[
          'waistline',
          {rules: [{  message: '请输入低密度蛋白质胆固醇' }]}
        ]"
              placeholder="输入低密度蛋白质胆固醇"
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
              <img class="symptom-image" :src="MockImage('短暂性脑缺血发作（TIA）或缺血性卒中（脑梗死）')" alt>
            </a-checkbox>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item
            :label-col="formItemLayout.checkboxLabelCol"
            :wrapper-col="formItemLayout.checkboxWrapperCol"
          >
            <a-checkbox v-decorator="['height']">
              <img class="symptom-image" :src="MockImage('急性冠脉综合征ACS')" alt>
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
              <img class="symptom-image" :src="MockImage('其他')" alt>
            </a-checkbox>
          </a-form-item>
        </a-col>
      </a-row>

      <h3>症状</h3>
      <a-row :gutter="8">
        <a-col :span="7">
          <a-form-item>
            <a-checkbox v-decorator="['height']">头晕、头疼症状</a-checkbox>
          </a-form-item>
        </a-col>
        <a-col :span="17">
          <a-form-item>
            <a-checkbox v-decorator="['height']">体力劳动、精神紧张或激烈时出现胸痛症状、休息后逐渐缓解</a-checkbox>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :span="7">
          <a-form-item>
            <a-checkbox v-decorator="['height']">呼吸困难或慢性咳嗽</a-checkbox>
          </a-form-item>
        </a-col>
        <a-col :span="17">
          <a-form-item>
            <a-checkbox v-decorator="['height']">多饮、多尿、多食、不明原因体重下降</a-checkbox>
          </a-form-item>
        </a-col>
        <a-col :span="7">
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

        <a-col :span="14">
          <a-form-item
            label="每天盐的摄入量"
            :label-col="formItemLayout.horizontalLabelCol"
            :wrapper-col="formItemLayout.horizontalWrapperCol"
          >
            <a-input
              v-decorator="[
          'weight',
          {rules: [{  message: '请输入每天盐的摄入量' }]}
        ]"
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
            <a-input
              v-decorator="[
          'weight',
          {rules: [{  message: '请输入血常规' }]}
        ]"
              placeholder="输入血常规"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item
            label="尿常规"
            :label-col="formItemLayout.horizontalLabelCol"
            :wrapper-col="formItemLayout.horizontalWrapperCol"
          >
            <a-input
              v-decorator="[
          'weight',
          {rules: [{  message: '请输入尿常规' }]}
        ]"
              placeholder="输入尿常规"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="8">
        <a-col :span="8">
          <a-form-item>
            <a-button type="primary" html-type="submit">提交</a-button>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item>
            <a-button type="default" html-type="submit">历史健康档案</a-button>
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
          md: { span: 24 },
          sm: { span: 24 }
        },
        wrapperCol: {
          md: { span: 24 },
          sm: { span: 24 }
        },
        checkboxLabelCol: {
          md: { span: 0 },
          sm: { span: 0 }
        },
        checkboxWrapperCol: {
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

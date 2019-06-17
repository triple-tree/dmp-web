<template>
  <a-modal
    :title="formName"
    :width="450"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form" layout="vertical">
        <a-list
          itemLayout="vertical"
          :dataSource="listData.questionList"
        >
          
          <a-list-item slot="renderItem" slot-scope="item">
            <template v-if='type === "getSSY"'>
              <h3>{{item.text}}</h3>
              <a-radio-group 
                v-if='item.scoringType === "CHOICE_SUM"'>
                <a-radio :value="m.value" v-for="m in item.choiceList" :key="m.id">{{m.text}}</a-radio>
              </a-radio-group>
            </template>
            <template v-if='type === "getAscvd"'>
              <a-form-item
                :label="item.text"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol">
                  <a-input v-if='item.type === "TEXT"'/>
                  <a-input
                    v-if='item.type === "NUMERIC"'
                    type="number"/>
                  <!-- <a-radio-group :options="item.choiceList" /> -->
                  <a-radio-group 
                    v-if='item.type === "SINGLE_CHOICE"'>
                    <a-radio :value="m.value" v-for="m in item.choice" :key="m.id">{{m.text}}</a-radio>
                  </a-radio-group>
                  <a-checkbox-group 
                    v-if='item.scoringType === "MULTIPLE_CHOICE"'>
                      <a-checkbox :value="m.value" v-for="m in item.choice" :key="m.id">{{m.text}}</a-checkbox>
                  </a-checkbox-group>
              </a-form-item>
            </template>
          </a-list-item>
        </a-list>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { statsAll, statsPatients, statsPlans } from '@/api/stats'
import pick from 'lodash.pick'
import { assessmentForm } from '../../api/assessment'
import ChronicDiseaseStatus from '@/components/ChronicDiseaseStatus'


const listData2 = {
  "name": "糖尿病自我效能评估",
  "id": 11,
  "title": {
    "editable": "0",
    "name": "question",
    "choiceList": [
      {
        "editAble": "1",
        "name": "option1",
        "text": "毫无自信",
        "type": "YES_NO",
        "footNote": ""
      },
      {
        "editAble": "1",
        "name": "option2",
        "text": "比较无自信",
        "type": "YES_NO",
        "footNote": ""
      },
      {
        "editAble": "1",
        "name": "option3",
        "text": "一般",
        "type": "YES_NO",
        "footNote": ""
      },
      {
        "editAble": "1",
        "name": "option4",
        "text": "比较自信",
        "type": "YES_NO",
        "footNote": ""
      },
      {
        "editAble": "1",
        "name": "option5",
        "text": "完全自信",
        "type": "YES_NO",
        "footNote": ""
      }
    ],
    "id": 82,
    "text": "我平时用餐都能够遵守糖尿病的饮食原则",
    "type": ""
  },
  "footNote": "",
  "questionList": [
    {
      "labelList": [],
      "scoringType": "CHOICE_SUM",
      "disable": "0",
      "choiceList": [
        {
          "editAble": "0",
          "id": 685,
          "text": "毫无自信",
          "label": "毫无自信",
          "value": "1",
          "footNote": ""
        },
        {
          "editAble": "0",
          "id": 686,
          "text": "比较无自信",
          "label": "比较无自信",
          "value": "2",
          "footNote": ""
        },
        {
          "editAble": "0",
          "id": 687,
          "text": "一般",
          "label": "一般",
          "value": "3",
          "footNote": ""
        },
        {
          "editAble": "0",
          "id": 688,
          "text": "比较自信",
          "label": "比较自信",
          "value": "4",
          "footNote": ""
        },
        {
          "editAble": "0",
          "id": 689,
          "text": "完全自信",
          "label": "完全自信",
          "value": "5",
          "footNote": ""
        }
      ],
      "id": 684,
      "text": "1.我平时用餐都能够遵守糖尿病的饮食原则",
      "footNote": ""
    },
    {
      "labelList": [],
      "scoringType": "CHOICE_SUM",
      "disable": "0",
      "choiceList": [
        {
          "editAble": "0",
          "id": 692,
          "text": "毫无自信",
          "label": "毫无自信",
          "value": "1",
          "footNote": ""
        },
        {
          "editAble": "0",
          "id": 693,
          "text": "比较无自信",
          "label": "比较无自信",
          "value": "2",
          "footNote": ""
        },
        {
          "editAble": "0",
          "id": 694,
          "text": "一般",
          "label": "一般",
          "value": "3",
          "footNote": ""
        },
        {
          "editAble": "0",
          "id": 695,
          "text": "比较自信",
          "label": "比较自信",
          "value": "4",
          "footNote": ""
        },
        {
          "editAble": "0",
          "id": 696,
          "text": "完全自信",
          "label": "完全自信",
          "value": "5",
          "footNote": ""
        }
      ],
      "id": 691,
      "text": "2.当我出门到熟悉的地方用餐时（如朋友家里），我能够遵守糖尿病的饮食原则 ",
      "footNote": ""
    }
  ]
}
@Component({
  components: {
    ChronicDiseaseStatus,
  },
  props: {},
})
export default class AssessmentDetailModal extends Vue {
  data() {
    return {
      visible: false,
      confirmLoading: false,
      type:'',
      formName: '',
      //model: {},
      form: this.$form.createForm(this),
      // radioStyle: {
      //   display: 'block'
      // },
      formItemLayout: {
        labelCol: {
          md: { span: 24 },
          sm: { span: 24 },
        },
        wrapperCol: {
          md: { span: 12 },
          sm: { span: 24 },
        },
      },
      listData: {}
    }
  }

  async setData(type,id) {
    const assessment = (await assessmentForm({ type, id })).data
    this.type = type

    this.listData = { ...this.listData, ...assessment }
    this.listData.questionList = assessment.questionList || assessment.question
    console.log("this.listData.name---",this.listData.name)
    this.formName = this.type === 'getAscvd' ? this.listData.description : this.listData.name
    console.info(`assessment: ${JSON.stringify(assessment)}, this.listData: ${JSON.stringify(this.listData)}`)
  }

  async show(type,id) {
    console.info(`show assessment: ${type} ${id}`)
    this.form.resetFields()
    this.visible = true
    this.setData(type,id)
  }
  handleOk() {
    this.visible = false
  }

  handleCancel() {
    this.form.resetFields()
    this.visible = false
  }
}
</script>

<style lang="less" scoped>
.ant-radio-wrapper{
  display: block;
}
</style>

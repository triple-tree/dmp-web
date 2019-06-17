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
        <template v-if='type === "getSSY"'>
          <a-list
            itemLayout="vertical"
            :dataSource="listData.questionList"
          >
            <a-list-item slot="renderItem" slot-scope="item">
              <h3>{{item.text}}</h3>
              <a-radio-group 
                v-if='item.scoringType === "CHOICE_SUM"'>
                <a-radio :value="m.value" v-for="m in item.choiceList" :key="m.id">{{m.text}}</a-radio>
              </a-radio-group>
            </a-list-item>
          </a-list>
        </template>
        <template v-if='type === "getAscvd"'>
          <a-collapse v-model="activeKey" :bordered="false">
            <a-collapse-panel :header="g" :style="customStyle" v-for="g in this.groupName" :key="g.index">
              <div v-for="item in listData.questionList" :key="item.id">
                <a-form-item
                  v-if='item.groupName == g'
                  :label="item.text+item.munit"
                  :label-col="formItemLayout.labelCol"
                  :wrapper-col="formItemLayout.wrapperCol">
                    <a-input 
                      v-if='item.type === "TEXT"'
                      v-decorator="['kvList.'+item.name, {rules: [{required: item.isRequired, message: '请输入'+item.text}]}]"
                      :placeholder="'请输入'+item.text"/>
                    <!-- <a-input
                      v-if='item.type === "NUMERIC"'
                      type="number"
                      addonAfter="item.munit"/> -->
                    <a-row v-if='item.type === "NUMERIC"'>
                      <a-col :span="20">
                        <a-slider 
                          :min="item.range.lbound"
                          :max="item.range.rbound" 
                          v-decorator="['kvList.'+item.name, {rules: [{required: item.isRequired, message: '请选择'+item.text}]}]"/>
                      </a-col>
                      <a-col :span="4">
                        <a-input-number
                          :min="item.range.lbound"
                          :max="item.range.rbound"
                          v-decorator="['kvList.'+item.name, {rules: [{required: item.isRequired, message: '请输入'+item.text}]}]"
                          style="marginLeft: 5px"
                        />
                      </a-col>
                    </a-row>
                    <a-radio-group 
                      v-if='item.type === "SINGLE_CHOICE"'
                      v-decorator="['kvList.'+item.name, {rules: [{required: item.isRequired, message: '请选择'+item.text}]}]">
                      <a-radio 
                        v-for="m in item.choice" 
                        :value="m.value"
                        :key="m.id"
                      >{{m.text}}</a-radio>
                    </a-radio-group>
                    <a-checkbox-group 
                      v-if='item.type === "MULTIPLE_CHOICE"'
                      v-decorator="['kvList.'+item.name, {rules: [{required: item.isRequired, message: '请选择'+item.text}]}]">
                      <a-checkbox 
                        v-for="m in item.choice"
                        :value="m.value"
                        :key="m.id"
                      >{{m.text}}</a-checkbox>
                    </a-checkbox-group>
                </a-form-item>
              </div>
            </a-collapse-panel>
          </a-collapse>
        </template>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { statsAll, statsPatients, statsPlans } from '@/api/stats'
import pick from 'lodash.pick'
import { assessmentForm, ascvdAssessment } from '../../api/assessment'

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
  components: {},
  props: {},
})
export default class AssessmentDetailModal extends Vue {
  data() {
    return {
      visible: false,
      confirmLoading: false,
      customStyle: 'fontSize:18px',
      type:'',
      formName: '',
      groupName: [],
      activeKey: [],
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
    const self = this
    let j=0
    const assessment = (await assessmentForm({ type, id })).data
    this.type = type

    this.listData = { ...this.listData, ...assessment }
    this.listData.questionList = assessment.questionList || assessment.question
    this.formName = this.type === 'getAscvd' ? this.listData.description : this.listData.name
    this.listData.questionList.forEach(function(e,i){
      if(self.type !== 'getAscvd') return
      if(e.text.indexOf('*') === 0 ){
        e.text = e.text.substring(1)
        e.isRequired = true
      }else{
        e.isRequired = false
      }
      if(e.groupName !='' &&
         self.groupName.indexOf(e.groupName) === -1
        ){
          self.groupName.push(e.groupName)
          self.activeKey.push(j+'')
          j++
      }
    })
    console.log("groupName---",this.groupName)
    console.log("activeKey---",this.activeKey)
    
    console.info(`this.listData: ${JSON.stringify(this.listData)}`)
  }
  
  async postData(values) {
    const res = (await ascvdAssessment(values)).data
    //this.$emit('back',this.model.chronicDiseaseRisk,this.model.assessmentDate)
    console.info(`res: ${JSON.stringify(res)}`)
  }

  async show(type,id) {
    console.info(`show assessment: ${type} ${id}`)
    this.form.resetFields()
    this.visible = true
    this.setData(type,id)
  }
  handleOk() {
    const { form: { validateFields } } = this
    this.confirmLoading = true
    const self = this
    validateFields((errors, values) => {
      if (!errors) {
        const initASCVD = [0,0,0,0,0,0,0];
        // delete values.temp
        values.age = values.kvList.age
        values.gender = values.kvList.gender === 1 ? '男' : '女'
        values.kvList.ASCVD.forEach(function(e){
          initASCVD[e-1] = 1
        })
        values.kvList.ASCVD = initASCVD.join('')
        console.log('values', values)
        setTimeout(() => {
          this.visible = false
          this.confirmLoading = false
          this.postData(values)
        }, 1500)
      } else {
        this.confirmLoading = false
      }
    })
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
.ant-checkbox-wrapper + .ant-checkbox-wrapper{
  margin-left: 0
}
</style>

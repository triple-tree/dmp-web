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
          <!-- <a-list
            itemLayout="vertical"
            :dataSource="listData.questionList"
          >
            <a-list-item slot="renderItem" slot-scope="item"> -->
            <div v-for="item in listData.questionList" :key="item.id">
              <h3>{{item.text}}</h3>
              <!-- <input type="hidden" v-decorator="['jsonStr.id']"/>
              <input type="hidden" v-decorator="['jsonStr.name']"/> -->
              <template  v-if="item.labelList.length === 0">
                <a-form-item>
                  <a-radio-group 
                    v-if='item.scoringType === "CHOICE_SUM"'
                    v-decorator="['choice'+item.id, {rules: [{required: false}]}]"
                  >
                    <a-radio :value="m.value" v-for="m in item.choiceList" :key="m.id" @focus="setChoice(m.id,m.value,item.id)">{{m.text}}</a-radio>
                  </a-radio-group>
                </a-form-item>
              </template>
              <template  v-if="item.labelList.length > 0">
                <a-form-item
                  v-for="m in item.labelList"
                  :key="m.id"
                  :label="m.text"
                >
                  <div v-for="n in m.choiceList" :key="n.id">
                    <div v-if="n.text.indexOf('#') === 0"> 
                      <a-row type="flex" :gutter="12" align="middle">
                        <a-col :span="4" style="text-align:right">{{n.text.substring(1)}}</a-col>
                        <a-col :span="20">
                          <a-slider 
                            :min=0
                            :max="n.text.indexOf('小时') >= 0 ? 24 : 100"
                            v-decorator="['choice.'+n.id, {initialValue: 0, rules: [{required: false, message: '请选择'}]}]"/>
                        </a-col>
                      </a-row>
                    </div>
                    <div v-else>
                      <a-radio-group 
                        v-decorator="['choice'+m.id, {rules: [{required: false}]}]"
                      >
                        <a-radio :value="n.value"  @focus="setChoice(n.id,n.value,m.id)">{{n.text}}</a-radio>
                      </a-radio-group>
                    </div>
                  </div>
                </a-form-item>
              </template>
            <!-- </a-list-item>
          </a-list> -->
          </div>
        </template>
        <template v-if='type === "getAscvd"'>
          <a-collapse v-model="activeKey" :bordered="false">
            <a-collapse-panel :header="g" :style="customStyle" v-for="g in this.groupName" :key="g.index">
              <div v-for="item in listData.questionList" :key="item.id">
                <a-form-item
                  v-if='item.groupName == g'
                  :label="item.text+item.unit"
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
                          :step="item.step"
                          v-decorator="['kvList.'+item.name, {initialValue: +item.value, rules: [{required: item.isRequired, message: '请选择'+item.text}]}]"/>
                      </a-col>
                      <a-col :span="4">
                        <a-input-number
                          :min="item.range.lbound"
                          :max="item.range.rbound"
                          :step="item.step"
                          v-decorator="['kvList.'+item.name, {initialValue: +item.value, rules: [{required: item.isRequired, message: '请输入'+item.text}]}]"
                          style="marginLeft: 5px"
                        />
                      </a-col>
                    </a-row>
                    <a-radio-group
                      v-if='item.type === "SINGLE_CHOICE"'
                      v-decorator="['kvList.'+item.name, {initialValue: +item.value, rules: [{required: item.isRequired, message: '请选择'+item.text}]}]">
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
import { assessmentForm, ascvdAssessment, ssyAssessment } from '../../api/assessment'
import { debug } from 'util';

@Component({
  components: {},
  props: {},
})
export default class AssessmentDetailModal extends Vue {
  data() {
    return {
      visible: false,
      confirmLoading: false,
      patientId: '',
      customStyle: 'fontSize:18px',
      type:'',
      formName: '',
      groupName: [],
      activeKey: [],
      choiceList: [],
      choiceObject: {},
      ssyId: '',
      ssyName: '',
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

  async setData(patientId,type,id) {
    const self = this
    let j=0
    const assessment = (await assessmentForm({ type, id })).data
    this.type = type
    this.patientId = patientId
    this.listData = { ...this.listData, ...assessment }
    this.ssyId = this.listData.id
    this.ssyName = this.listData.name
    this.listData.questionList = assessment.questionList || assessment.question
    this.formName = this.type === 'getAscvd' ? this.listData.description : this.listData.name
    this.listData.questionList.forEach(function(e,i){
      if(self.type === 'getAscvd') {
        if(e.text.indexOf('*') === 0 ){
          e.text = e.text.substring(1)
          e.isRequired = true
        }else{
          e.isRequired = false
        }
        if(e.type === "NUMERIC" && e.value.indexOf('.') >= 0){
          e.step = 0.01
        }else{
          e.step = 1
        }
        if(e.groupName !='' &&
          self.groupName.indexOf(e.groupName) === -1
          ){
            self.groupName.push(e.groupName)
            self.activeKey.push(j+'')
            j++
        }
      }
      // 抑郁症评估 & 营养评估
      if(self.ssyId === 4 || self.ssyId === 3){
        for(var m=0; m< e.choiceList.length;m++){
          e.choiceList[m].text = self.listData.title.choiceList[m].text
        }
      }
      // 睡眠评估 题目5
      if(self.ssyId === 8){
        for(var m=0; m< e.labelList.length;m++){
          for(var n=0; n< e.labelList[m].choiceList.length;n++){
            if(e.labelList[m].choiceList[n].text === ""){
              e.labelList[m].choiceList[n].text = e.choiceList[n].text
            }
          }
        }
      }
    })

    console.info(`this.listData: ${JSON.stringify(this.listData)}`)
  }
  
  async postAscvdData(values) {
    const res = (await ascvdAssessment(values)).data
    this.$emit('back','ascvd',res)
    console.info(`res: ${JSON.stringify(res)}`)
  }

  async postSSYData(values) {
    const res = (await ssyAssessment(values)).data
    this.$emit('back','ssy',res, this.ssyId)
    console.info(`res: ${JSON.stringify(res)}`)
  }

  async show(patientId,type,id) {
    console.info(`show assessment: ${type} ${id}`)
    this.form.resetFields()
    this.choiceList = []
    this.visible = true
    this.setData(patientId,type,id)
  }
  setChoice(choiceId,choiceValue,itemId) {
    this.choiceObject[itemId] ={}
    this.choiceObject[itemId].id = choiceId
    this.choiceObject[itemId].value = choiceValue
  }
  handleOk() {
    const { form: { validateFields } } = this
    this.confirmLoading = true
    const self = this
    validateFields((errors, values) => {
      if (!errors) {
        if(this.type === 'getAscvd'){
          //const initASCVD = [0,0,0,0,0,0,0];
          values.patientId= this.patientId
          values.age = values.kvList.age
          values.gender = values.kvList.gender === 1 ? '男' : '女'
          // values.kvList.ASCVD.forEach(function(e){
          //   initASCVD[e-1] = 1
          // })
          // //values.kvList.ASCVD = initASCVD.join('')
          // values.kvList.ASCVD = '0000000'
          // values.kvList.dmtreate = 0  
          console.log('values', values)
          setTimeout(() => {
            this.visible = false
            this.confirmLoading = false
            this.postAscvdData(values)
          }, 1500)
        }else{
          //values = {}
          values.jsonStr = {}
          values.jsonStr.id = this.ssyId
          values.jsonStr.name = this.ssyName
          values.jsonStr.score = 0
          values.patientId= this.patientId
          for(var key in values.choice){
            this.choiceList.push({
              "id": key,
              "value": values.choice[key]
            })
            values.jsonStr.score+=+values.choice[key]
          }
          for(var key in this.choiceObject){
            this.choiceList.push({
              id: this.choiceObject[key].id
            })
            values.jsonStr.score+=+this.choiceObject[key].value
          }
          if(this.choiceList.length === 0){
            alert('您还没有完成所有的问答')
            this.confirmLoading = false
            return false
          }
          //values.jsonStr.score = 10
          values.jsonStr.choiceList = this.choiceList
          console.log('values', values)
          setTimeout(() => {
            this.visible = false
            this.confirmLoading = false
            this.postSSYData(values)
          }, 1500)
        }
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

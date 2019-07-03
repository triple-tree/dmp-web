<template>
  <a-modal
    title="慢病管理报告"
    id="amodal"
    :width="750"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    okText="打印"
    cancelText="推送"
  >
    <a-spin :spinning="confirmLoading">
      <div id="print">
      <a-row :gutter="12" v-if="model.doctor || model.patientRecord">
        <a-col :span="4">
          {{model.doctor.doctorName || ''}}
        </a-col>
        <a-col :span="4">
          {{model.patientRecord.createDate || ''}}
        </a-col>
        <a-col :span="16">
          {{model.doctor.hospitalName || ''}}
        </a-col>
      </a-row>
      <!-- 基本信息 -->
      <a-row type="flex" :gutter="10" class="row" style="margin-top:10px">
        <a-col :span="1" style="border:1px solid #000">
          <div class="col-title" style="padding: 3px;font-size: 12px;height: 100%;line-height: 16px;text-align: center;">基本信息</div>
        </a-col>
        <a-col :span="23">
          <div class="col-cont" style="padding: 10px 18px;border: 1px solid #000;font-size: 15px;line-height: 25px;">
            <a-row>
              <a-col :span="6">姓名：{{model.patientBaseInfo.name}}</a-col>
              <a-col :span="10">身份证号：{{model.patientBaseInfo.identityNumber}}</a-col>
              <a-col :span="4">性别：{{model.patientBaseInfo.gender === 1 ? '男':'女'}}</a-col>
              <a-col :span="4">年龄：{{model.patientBaseInfo.age}}</a-col>
            </a-row>
            <a-row>
                <a-col :span="6">身高：{{model.patientBaseInfo.height}}cm</a-col>
                <a-col :span="10">
                  <a-row>
                    <a-col :span="12">体重：{{model.patientBaseInfo.weight}}kg</a-col>
                    <a-col :span="12">腰围：{{model.patientBaseInfo.waistline}}cm</a-col>
                  </a-row>
                </a-col>
                <a-col :span="8">联系电话：{{model.patientBaseInfo.phoneNumber}}</a-col>
            </a-row>
          </div>
        </a-col>
      </a-row>
      <!-- 个人健康档案 -->
      <a-row type="flex" :gutter="10" class="row" style="margin-top:10px">
        <a-col :span="1" style="border:1px solid #000">
          <div class="col-title" style="padding: 3px;font-size: 12px;height: 100%;line-height: 16px;text-align: center;">个人健康档案</div>
        </a-col>
        <a-col :span="23">
          <div class="col-cont" style="padding: 10px 18px;border: 1px solid #000;font-size: 15px;line-height: 25px;">
            <a-row>
              <a-col :span="7">舒张压：{{model.patientRecord.patientRecordFactors.dbp}}mmHg</a-col>
              <a-col :span="8">收缩压：{{model.patientRecord.patientRecordFactors.sbp}}mmHg</a-col>
            </a-row>
            <a-row>
              <a-col :span="7">空腹血糖：{{model.patientRecord.patientRecordFactors.fbg}}mmol/L</a-col>
              <a-col :span="8">血清总胆固醇：{{model.patientRecord.patientRecordFactors.serumTc}}mmol/L</a-col>
              <a-col :span="9">高密度蛋白质胆固醇：{{model.patientRecord.patientRecordFactors.hdl_c}}mmol/L/L</a-col>
            </a-row>
            <a-row>
              <a-col :span="24">低密度蛋白质胆固醇：{{model.patientRecord.patientRecordFactors.ldl_c}}mmol/L</a-col>
            </a-row>
            <a-row>
              <a-col :span="24">疾病史：{{model.previousHistory}}</a-col>
            </a-row>
            <a-row>
              <a-col :span="24">症状：{{model.symptom}}</a-col>
            </a-row>
            <a-row>
              <a-col :span="24">生活方式：{{model.life}}</a-col>
            </a-row>
          </div>
        </a-col>
      </a-row>
      <!-- 慢病评估报告 -->
      <a-row type="flex" :gutter="10" class="row" style="margin-top:10px">
        <a-col :span="1" style="border:1px solid #000">
          <div class="col-title" style="padding: 3px;font-size: 12px;height: 100%;line-height: 16px;text-align: center;">慢病评估报告</div>
        </a-col>
        <a-col :span="23">
          <div class="col-cont" style="padding: 10px 18px;border: 1px solid #000;font-size: 15px;line-height: 25px;">
            <a-row>
              <a-col :span="24">五病综合风险：{{model.chronicDiseaseAssessment.chronicDiseaseRisk || '不详'}}</a-col>
            </a-row>
            <a-row>
              <a-col :span="4">高血压：{{model.chronicDiseaseAssessment.hypertensionRisk || '不详'}}</a-col>
              <a-col :span="5">糖尿病：{{model.chronicDiseaseAssessment.diabetesRisk || '不详'}}</a-col>
              <a-col :span="5">冠心病：{{model.chronicDiseaseAssessment.ascvdRisk || '不详'}}</a-col>
              <a-col :span="5">慢阻肺：{{model.chronicDiseaseAssessment.copdRisk || '不详'}}</a-col>
              <a-col :span="5">脑卒中：{{model.chronicDiseaseAssessment.strokeRisk || '不详'}}</a-col>
            </a-row>
            <a-row>
              <a-col :span="24">其他评估</a-col>
            </a-row>
            <a-row>
              <a-col :span="5">ASCVD：{{model.chronicDiseaseAssessment.ascvdRisk || '不详'}}</a-col>
              <a-col :span="19">睡眠：{{model.otherAssessment.睡眠评估 || '不详'}}</a-col>
            </a-row>
          </div>
        </a-col>
      </a-row>
      <!-- 健康管理方案 -->
      <a-row type="flex" :gutter="10" class="row" style="margin-top:10px" v-if="model.planDetail.healthAdvices">
        <a-col :span="1" style="border:1px solid #000">
          <div class="col-title" style="padding: 3px;font-size: 12px;height: 100%;line-height: 16px;text-align: center;">健康管理方案</div>
        </a-col>
        <a-col :span="23">
          <div class="col-cont" style="padding: 10px 18px;border: 1px solid #000;font-size: 15px;line-height: 25px;">
            <div v-if="model.planDetail.healthAdvices && model.planDetail.healthAdvices.prescriptions">
              <a-row>
                <a-col :span="24" class="row-header">处方</a-col>
              </a-row>
              <a-row v-for="item in model.planDetail.healthAdvices.prescriptions" :key="item.index">
                <a-col :span="24">{{item.remark}},{{item.reason}}</a-col>
                <!-- <a-col :span="6">药名：阿司匹林</a-col>
                <a-col :span="6">频次：3次／日</a-col>
                <a-col :span="6">剂量：3片</a-col>
                <a-col :span="6">备注：一定要按时吃药哦</a-col> -->
              </a-row>
            </div>
            <div v-if="model.planDetail.healthAdvices && model.planDetail.healthAdvices.exercise">
              <a-row>
                <a-col :span="24" class="row-header">运动建议</a-col>
              </a-row>
              <a-row v-for="item in model.planDetail.healthAdvices.exercise" :key="item.index">
                <a-col :span="24">{{item.remark}},{{item.reason}}</a-col>
                <!-- <a-col :span="5">跑步</a-col>
                <a-col :span="5">3次/天</a-col>
                <a-col :span="6">30分钟/次</a-col>
                <a-col :span="8">备注：因为您有高血压，所以不适合快跑，请注意自己的运动速度</a-col> -->
              </a-row>
            </div>
            <div v-if="model.planDetail.healthAdvices && model.planDetail.healthAdvices.food">
              <a-row>
                <a-col :span="24" class="row-header">饮食建议</a-col>
              </a-row>
              <a-row v-for="item in model.planDetail.healthAdvices.food" :key="item.index">
                <a-col :span="24">{{item.remark}},{{item.reason}}</a-col>
                <!-- <a-col :span="24">多吃蔬菜，需少盐、少糖。不宜吃辛辣刺激性食物。</a-col> -->
              </a-row>
            </div>
            <div v-if="model.planDetail.healthAdvices && model.planDetail.healthAdvices.others">
              <a-row>
                <a-col :span="24" class="row-header">其他建议</a-col>
              </a-row>
              <a-row v-for="item in model.planDetail.healthAdvices.others" :key="item.index">
                <a-col :span="24">{{item.remark}},{{item.reason}}</a-col>
                <!-- <a-col :span="24">无</a-col> -->
              </a-row>
            </div>
            <div v-if="model.planDetail.healthAdvices && model.planDetail.healthAdvices.clinicRemind">
              <a-row>
                <a-col :span="24" class="row-header">随诊提醒</a-col>
              </a-row>
              <a-row>
                <a-col :span="8">随诊时间：{{model.planDetail.healthAdvices.clinicRemind.suggestDate}}</a-col>
                <a-col :span="8">随诊类型：{{model.planDetail.healthAdvices.clinicRemind.type}}</a-col>
                <a-col :span="8">随诊医院：{{model.planDetail.healthAdvices.clinicRemind.targetHospital}}</a-col>
              </a-row>
              <a-row>
                <a-col :span="8">相关病：{{model.planDetail.healthAdvices.clinicRemind.relatedDisease}}</a-col>
                <a-col :span="16">原因：{{model.planDetail.healthAdvices.clinicRemind.reason}}</a-col>
              </a-row>
            </div>
          </div>
        </a-col>
      </a-row>
      </div>
    </a-spin>
  </a-modal>
</template>

<script>
import { patientGetPatientReport, patientSendPlan } from '@/api/patient'
import Vue from 'vue'
import Component from 'vue-class-component'
import Mock, { Random } from 'mockjs2'
import { print } from  '../../api/print.js'

@Component({
  components: {},
  props: {
    id: String,
  },
})
export default class AssessmentDetailModal extends Vue {
  data() {
    return {
      visible: false,
      confirmLoading: false,
      model: {
        doctor: {}
      }
    }
  }

  getPreviousHistory() {
    this.model.previousHistory = []
    if(this.model.patientRecord.patientRecordFactors.previousHistoryDiabetes === "1"){
      this.model.previousHistory.push("糖尿病")
    }
    if(this.model.patientRecord.patientRecordFactors.previousHistoryHypertension === "1"){
      this.model.previousHistory.push("高血压")
    }
    if(this.model.patientRecord.patientRecordFactors.previousHistoryStroke === "1"){
      this.model.previousHistory.push("脑卒中")
    }
    if(this.model.patientRecord.patientRecordFactors.previousHistoryAscvd === "1"){
      this.model.previousHistory.push("冠心病")
    }
    if(this.model.patientRecord.patientRecordFactors.previousHistoryCopd === "1"){
      this.model.previousHistory.push("慢阻肺")
    }
    if(this.model.patientRecord.patientRecordFactors.previousHistoryDyslipidemia === "1"){
      this.model.previousHistory.push("血脂异常")
    }
    if(this.model.previousHistory.length > 0){
      this.model.previousHistory = this.model.previousHistory.join(",")
    }else{
      this.model.previousHistory = '无'
    }
  }   
  
  getSymptom() {
    this.model.symptom = []
    if(this.model.patientRecord.patientRecordFactors.symptomsHeadache === "1"){
      this.model.symptom.push("头晕、头疼症状")
    }
    if(this.model.patientRecord.patientRecordFactors.symptomsStethalgia === "1"){
      this.model.symptom.push("体力劳动、精神紧张或激动时出现胸痛症状，休息后逐渐缓解")
    }
    if(this.model.patientRecord.patientRecordFactors.symptomsDyspnea === "1"){
      this.model.symptom.push("呼吸困难或慢性咳嗽")
    }
    if(this.model.patientRecord.patientRecordFactors.symptomsDiuresis === "1"){
      this.model.symptom.push("多饮、多尿、多食、不明原因体重下降")
    }
    if(this.model.patientRecord.patientRecordFactors.symptomsDizziness === "1"){
      this.model.symptom.push("一过性黑曚、眩晕")
    }
    if(this.model.symptom.length > 0){
      this.model.symptom = this.model.symptom.join(";")
    }else{
      this.model.symptom = '无'
    }
  }

  getLife() {
    this.model.life = []
    if(this.model.patientRecord.patientRecordFactors.smoke === "1"){
      this.model.life.push("吸烟")
    }
    if(this.model.patientRecord.patientRecordFactors.alcohol === "1"){
      this.model.life.push("饮酒")
    }
    if(this.model.patientRecord.patientRecordFactors.sport === "1"){
      this.model.life.push("运动")
    }
    if(this.model.patientRecord.patientRecordFactors.salt !== "0"){
      this.model.life.push("每天摄入盐"+this.model.patientRecord.patientRecordFactors.salt+"g/L")
    }
    if(this.model.life.length > 0){
      this.model.life = this.model.life.join("、")
    }else{
      this.model.life = '无'
    }
  }

  async setData() {
    const data = (await patientGetPatientReport(null,{id: this.id})).data
    this.model = { ...this.model, ...data }
    //疾病史
    this.getPreviousHistory()
    //症状
    this.getSymptom()
    //生活方式
    this.getLife()
    console.info(`model: ${JSON.stringify(this.model)}`)
  }

  async show(title,res) {
    this.visible = true
    this.setData()
  }
  handleOk() {
    let style = document.getElementsByTagName("head")[0].innerHTML
    //style = style +'<style> .row{ margin-top: 10px } .col-title{ border: 1px solid #000;font-size: 12px;height: 100%;line-height: 16px;text-align: center;}.col-cont{padding: 10px 18px;border: 1px solid #000;font-size: 15px;line-height: 25px;}</style>'
    document.getElementsByClassName("ant-modal-close-x")[0].style.display = 'none'
    document.getElementsByClassName("ant-modal-footer")[0].style.display = 'none'

    let cont = document.getElementsByClassName("ant-modal-content")[0].innerHTML
    var windows = print(cont, style);
    windows.close();
     document.getElementsByClassName("ant-modal-close-x")[0].style.display = 'block'
    document.getElementsByClassName("ant-modal-footer")[0].style.display = 'block'
  }
  handleOk2() {
    //window.print()
    // this.visible = false
    // this.confirmLoading = false

    var bdhtml=window.document.body.innerHTML; 
    document.getElementsByClassName("ant-modal-close-x")[0].style.visible = 'hidden'
    document.getElementsByClassName("ant-modal-footer")[0].style.display = 'none'
    var prnhtml = document.getElementsByClassName("ant-modal-content")[0].innerHTML
    window.document.body.innerHTML=prnhtml;
    window.print();
    document.getElementsByClassName("ant-modal-close-x")[0].style.visible = 'visible'
    document.getElementsByClassName("ant-modal-footer")[0].style.display = 'block'
    window.document.body.innerHTML=bdhtml;
    return false;
  }
  //推送
  async handleCancel() {
    this.visible = false
    this.confirmLoading = false
    const res = (await patientSendPlan(null,{patientId: this.id}))
    if(res.code === 200){
      alert("推送成功")
    }
  }
}
</script>


<style lang="less" scoped>
.row{
  margin-top: 10px
}
.col-title{
  padding: 3px;
  // border: 1px solid #000;
  font-size: 12px;
  height: 100%;
  line-height: 16px;
  // writing-mode:vertical-lr;
  text-align: center;
}
.col-cont{
  padding: 10px 18px;
  border: 1px solid #000;
  font-size: 15px;
  line-height: 25px;
}
</style>

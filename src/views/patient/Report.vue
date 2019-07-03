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
      <a-row :gutter="12">
        <a-col :span="4">
          周医生
        </a-col>
        <a-col :span="4">
          2019-2-9
        </a-col>
        <a-col :span="16">
          慢病中心名称
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
              <a-col :span="6">姓名：陈先生</a-col>
              <a-col :span="10">身份证号：430222345678888654</a-col>
              <a-col :span="4">性别：女</a-col>
              <a-col :span="4">年龄：84</a-col>
            </a-row>
            <a-row>
                <a-col :span="6">身高：170cm</a-col>
                <a-col :span="10">
                  <a-row>
                    <a-col :span="12">体重：44kg</a-col>
                    <a-col :span="12">腰围：70cm</a-col>
                  </a-row>
                </a-col>
                <a-col :span="8">联系电话：1722233450</a-col>
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
              <a-col :span="7">舒张压：140mmHg</a-col>
              <a-col :span="8">收缩压：70mmHg</a-col>
            </a-row>
            <a-row>
              <a-col :span="7">空腹血糖：70mmol/L</a-col>
              <a-col :span="8">血清总胆固醇：5.6mmol/L</a-col>
              <a-col :span="9">高密度蛋白质胆固醇：7mmol/L/L</a-col>
            </a-row>
            <a-row>
              <a-col :span="24">低密度蛋白质胆固醇：11mmol/L</a-col>
            </a-row>
            <a-row>
              <a-col :span="24">疾病史：高血压、糖尿病、脑卒中/L</a-col>
            </a-row>
            <a-row>
              <a-col :span="24">症状：头晕、头疼症状；呼吸困难或慢性咳嗽；一过性黑蒙、眩晕/L</a-col>
            </a-row>
            <a-row>
              <a-col :span="24">生活方式：吸烟、饮酒、运动、每天摄入盐30g/L</a-col>
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
              <a-col :span="24">五病综合风险：高危</a-col>
            </a-row>
            <a-row>
              <a-col :span="4">高血压：一般人群</a-col>
              <a-col :span="5">糖尿病：一般人群</a-col>
              <a-col :span="5">冠心病：一般人群</a-col>
              <a-col :span="5">慢阻肺：一般人群</a-col>
              <a-col :span="5">脑卒中：一般人群</a-col>
            </a-row>
            <a-row>
              <a-col :span="24">其他评估</a-col>
            </a-row>
            <a-row>
              <a-col :span="5">ASCVD：高危</a-col>
              <a-col :span="19">睡眠：一般人群</a-col>
            </a-row>
          </div>
        </a-col>
      </a-row>
      <!-- 健康管理方案 -->
      <a-row type="flex" :gutter="10" class="row" style="margin-top:10px">
        <a-col :span="1" style="border:1px solid #000">
          <div class="col-title" style="padding: 3px;font-size: 12px;height: 100%;line-height: 16px;text-align: center;">健康管理方案</div>
        </a-col>
        <a-col :span="23">
          <div class="col-cont" style="padding: 10px 18px;border: 1px solid #000;font-size: 15px;line-height: 25px;">
            <a-row>
              <a-col :span="24" class="row-header">处方</a-col>
            </a-row>
            <a-row>
              <a-col :span="6">药名：阿司匹林</a-col>
              <a-col :span="6">频次：3次／日</a-col>
              <a-col :span="6">剂量：3片</a-col>
              <a-col :span="6">备注：一定要按时吃药哦</a-col>
            </a-row>
            <a-row>
              <a-col :span="24" class="row-header">运动建议</a-col>
            </a-row>
            <a-row>
              <a-col :span="5">跑步</a-col>
              <a-col :span="5">3次/天</a-col>
              <a-col :span="6">30分钟/次</a-col>
              <a-col :span="8">备注：因为您有高血压，所以不适合快跑，请注意自己的运动速度</a-col>
            </a-row>
            <a-row>
              <a-col :span="24" class="row-header">饮食建议</a-col>
            </a-row>
            <a-row>
              <a-col :span="24">多吃蔬菜，需少盐、少糖。不宜吃辛辣刺激性食物。</a-col>
            </a-row>
            <a-row>
              <a-col :span="24" class="row-header">其他建议</a-col>
            </a-row>
            <a-row>
              <a-col :span="24">无</a-col>
            </a-row>
            <a-row>
              <a-col :span="24" class="row-header">随诊提醒</a-col>
            </a-row>
            <a-row>
              <a-col :span="8">随诊时间：2019-05-09</a-col>
              <a-col :span="8">随诊类型：随访</a-col>
              <a-col :span="8">随诊医院：中日友好医院</a-col>
            </a-row>
            <a-row>
              <a-col :span="8">相关病：高血压、糖尿病</a-col>
              <a-col :span="16">原因：应该复查高血压了</a-col>
            </a-row>
          </div>
        </a-col>
      </a-row>
      </div>
    </a-spin>
  </a-modal>
</template>

<script>
import { recordLatest, recordDetail, recordAll, recordAdd } from '@/api/record'
import Vue from 'vue'
import Component from 'vue-class-component'
import Mock, { Random } from 'mockjs2'
import IconFont from '@/components/Icon/index.js'
import { print } from './print.js';

@Component({
  components: {
    IconFont
  },
  props: {
    id: String,
  },
})
export default class AssessmentDetailModal extends Vue {
  data() {
    return {
      visible: false,
      confirmLoading: false,
      assessmentTitle: '',
      suggestion: ''
    }
  }


  async show(title,res) {
    this.visible = true
  }
  handleOk() {
    let style = document.getElementsByTagName("head")[0].innerHTML
    //style = style +'<style> .row{ margin-top: 10px } .col-title{ border: 1px solid #000;font-size: 12px;height: 100%;line-height: 16px;text-align: center;}.col-cont{padding: 10px 18px;border: 1px solid #000;font-size: 15px;line-height: 25px;}</style>'
    document.getElementsByClassName("ant-modal-close-x")[0].style.visible = 'hidden'
    document.getElementsByClassName("ant-modal-footer")[0].style.display = 'none'

    let cont = document.getElementsByClassName("ant-modal-content")[0].innerHTML
    var windows = print(cont, style);
    windows.close();
     document.getElementsByClassName("ant-modal-close-x")[0].style.visible = 'visible'
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

  handleCancel() {
    this.visible = false
    this.confirmLoading = false
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

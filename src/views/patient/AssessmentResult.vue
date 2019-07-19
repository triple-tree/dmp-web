<template>
  <a-modal
    :title="assessmentTitle"
    :width="450"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭"
    :maskClosable=false
  >
    <a-spin :spinning="confirmLoading">
      <span v-html="suggestion"></span>
    </a-spin>
  </a-modal>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  components: {},
  props: {},
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
    this.assessmentTitle = title
    if(res.suggestion){
      this.suggestion = res.suggestion
    }else{
      this.suggestion = res.join("<br>")
    }
    
    this.visible = true
  }
  
  handleOk() {
    this.visible = false
    this.confirmLoading = false
  }

  handleCancel() {
    this.visible = false
    this.confirmLoading = false
  }
}
</script>

<style lang="less" scoped>

</style>

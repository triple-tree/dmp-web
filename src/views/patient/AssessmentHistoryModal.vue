<template>
  <a-modal
    title="历史评估筛查"
    :width="950"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :destroyOnClose="true"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭"
  >
    <s-table id="root-container" :columns="columns" :data="data" ref="dataTable">
      <a slot="name" slot-scope="text" @click="viewDetail(text)" href="javascript:;">{{ text }}</a>
    </s-table>
    <assessment-detail-modal ref="modalForm"></assessment-detail-modal>
  </a-modal>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { assessmentAll } from '@/api/assessment'
import { STable } from '@/components'
import AssessmentDetailModal from './AssessmentDetailModal'
import { doctorAll } from '@/api/doctor'
import { USER_INFO } from '@/store/mutation-types'

const columns = [
  {
    title: '编号',
    dataIndex: 'id',
    key: 'id',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: '医生',
    dataIndex: 'doctorName',
    key: 'doctorName',
  },
  {
    title: '日期',
    dataIndex: 'assessmentDate',
    key: 'assessmentDate',
  },
  {
    title: '慢病综合风险',
    dataIndex: 'chronicDiseaseRisk',
    key: 'chronicDiseaseRisk',
  },
]

let doctors = null

const findDoctorName = (doctors, doctorId) => {
  const doctor = doctors.filter(doctor => doctor.id === doctorId)[0]
  if (doctor) {
    return doctor.name
  }
  return ''
}

const setData = patientId => async parameter => {
  const res = await assessmentAll({ patientId }, { ...parameter })
  let assessments = res.data.assessments
  if (!doctors) {
    doctors = (await doctorAll(null, { page: 1, size: 10000000, adminId: Vue.ls.get(USER_INFO).data.id })).data.doctors
  }
  console.info(`assessments: ${JSON.stringify(assessments)}`)
  assessments = assessments.map(assessment => ({
    ...assessment,
    doctorName: findDoctorName(doctors, assessment.doctorId),
  }))
  console.info(`assessments: ${JSON.stringify(assessments)}`)
  return {
    pageSize: parseInt(parameter.pageSize),
    pageNo: parseInt(res.data.page),
    totalCount: parseInt(res.data.total),
    totalPage: parseInt(res.data.total) / parseInt(parameter.pageSize),
    data: assessments,
  }
}

@Component({
  components: { STable, AssessmentDetailModal },
  props: {},
})
export default class AssessmentHistoryModal extends Vue {
  data() {
    return {
      visible: false,
      confirmLoading: false,
      data: () => ({}),
      columns,
    }
  }
  async show(patientId) {
    this.visible = true
    this.data = setData(patientId)
  }
  handleOk() {
    this.visible = false
  }

  handleCancel() {
    this.visible = false
  }
  viewDetail(id) {
    this.$refs.modalForm.show(id)
  }
}
</script>

<style lang="less" scoped>
#root-container /deep/ .ant-table-thead > tr > th,
#root-container /deep/ .ant-table-tbody > tr > td {
  padding: 6px;
}
</style>

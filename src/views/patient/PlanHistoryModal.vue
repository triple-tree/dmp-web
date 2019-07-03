<template>
  <a-modal
    title="历史健康方案"
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
    <plan-detail-modal ref="modalForm"></plan-detail-modal>
  </a-modal>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { planAll } from '@/api/plan'
import { STable } from '@/components'
import PlanDetailModal from './PlanDetailModal'
import { setTimeout } from 'timers'

const columns = [
  {
    title: '编号',
    dataIndex: 'id',
    key: 'id',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: '医生',
    dataIndex: 'doctorId',
    key: 'doctorId',
  },
  {
    title: '日期',
    dataIndex: 'createDate',
    key: 'createDate',
  },
]

const setData = patientId => async parameter => {
  console.info(`setData(${patientId}) calling`)
  const paginationParam = {
    page: parameter.pageNo,
    size: parameter.pageSize,
  }
  const res = await planAll(null, { ...paginationParam, patientId })
  return {
    pageSize: parseInt(parameter.pageSize),
    pageNo: parseInt(res.data.page),
    totalCount: parseInt(res.data.total),
    totalPage: parseInt(res.data.total) / parseInt(parameter.pageSize),
    data: res.data.plans || res.data.plans,
  }
}

@Component({
  components: { STable, PlanDetailModal },
  props: {},
})
export default class PlanHistoryModal extends Vue {
  data() {
    return {
      visible: false,
      confirmLoading: false,
      data: parameter => () => ({}),
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

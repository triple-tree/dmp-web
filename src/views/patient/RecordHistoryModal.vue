<template>
  <a-modal
    title="历史健康档案"
    :width="950"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :destroyOnClose="true"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭"
    :maskClosable=false
  >
    <s-table id="root-container" :columns="columns" :data="data" ref="dataTable">
      <a slot="name" slot-scope="text" @click="viewDetail(text)" href="javascript:;">{{ text }}</a>
    </s-table>
    <record-detail-modal ref="modalForm"></record-detail-modal>
  </a-modal>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { recordAll } from '@/api/record'
import { STable } from '@/components'
import RecordDetailModal from './RecordDetailModal'
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
  const res = await recordAll(null, { ...paginationParam, patientId })
  return {
    pageSize: parseInt(parameter.pageSize),
    pageNo: parseInt(res.data.page),
    totalCount: parseInt(res.data.total),
    totalPage: parseInt(res.data.total) / parseInt(parameter.pageSize),
    data: res.data.records || res.data.plans,
  }
}

@Component({
  components: { STable, RecordDetailModal },
  props: {},
})
export default class RecordHistoryModal extends Vue {
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

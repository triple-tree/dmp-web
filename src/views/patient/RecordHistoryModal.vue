<template>
  <a-modal
    title="历史健康档案"
    :width="950"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭"
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

@Component({
  components: { STable, RecordDetailModal },
  props: {},
})
export default class RecordHistoryModal extends Vue {
  async setData(parameter) {
    const res = await recordAll(null, { ...parameter })
    // console.info(`res: ${JSON.stringify(res)}`)
    return {
      pageSize: parseInt(parameter.pageSize),
      pageNo: parseInt(res.data.page),
      totalCount: parseInt(res.data.total),
      totalPage: parseInt(res.data.total) / parseInt(parameter.pageSize),
      data: res.data.records,
    }
  }
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
    this.data = this.setData
    // this.$refs.dataTable.refresh()
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

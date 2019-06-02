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
    <s-table :columns="columns" :data="data">
      <a slot="name" slot-scope="text" @click="viewDetail(text)" href="javascript:;">{{text}}</a>
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
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '医生',
    dataIndex: 'doctorId',
    key: 'doctorId'
  },
  {
    title: '日期',
    dataIndex: 'createDate',
    key: 'createDate'
  }
]

@Component({
  components: { STable, RecordDetailModal },
  props: {}
})
export default class RecordHistoryModal extends Vue {
  data() {
    return {
      visible: false,
      confirmLoading: false,
      data: async parameter => {
        const res = await recordAll(null, { ...parameter })
        return {
          pageSize: parameter.pageSize,
          pageNo: res.data.page,
          totalCount: res.data.total,
          totalPage: res.data.total / parameter.pageSize,
          data: res.data.records
        }
      },
      columns
    }
  }
  async show() {
    this.visible = true
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
</style>

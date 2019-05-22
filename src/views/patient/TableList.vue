<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="12" :sm="24">
            <a-form-item label="">
              <a-checkbox-group :options="plainOptions" v-model="queryParam.type"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="">
              <a-input placeholder="高血压" v-model="queryParam.id"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-button type="primary" icon="search" @click="$refs.table.refresh(true)">查询</a-button>
            <a-button icon="plus" style="margin-left: 8px" @click="$refs.createModal.add()">新增</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <s-table
      ref="table"
      size="default"
      rowKey="key"
      :columns="columns"
      :data="loadData"
      :alert="options.alert"
      :rowSelection="options.rowSelection"
    >
      <span slot="serial" slot-scope="text, record, index">
        {{ index + 1 }}
      </span>
      <span slot="status" slot-scope="text">
        <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
      </span>

      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleEdit(record)">查看详情</a>
        </template>
      </span>
    </s-table>
    <create-form ref="createModal" @ok="handleOk" />
    <step-by-step-modal ref="modal" @ok="handleOk"/>
  </a-card>
</template>

<script>
import moment from 'moment'
import { STable } from '@/components'
import StepByStepModal from './modules/StepByStepModal'
import CreateForm from './modules/CreateForm'
import { getPatientList } from '@/api/manage'

const plainOptions = [
  { label: '高血压', value: 0 },
  { label: '糖尿病', value: 1 },
  { label: '脑卒中', value: 2 },
  { label: '冠心病', value: 3 },
  { label: '慢阻肺', value: 4 }
]

export default {
  name: 'TableList',
  components: {
    STable,
    CreateForm,
    StepByStepModal
  },
  data () {
    return {
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      plainOptions,
      // 表头
      columns: [
        {
          title: '编号',
          dataIndex: 'id'
        },
        {
          title: '日期',
          dataIndex: 'createDate',
          sorter: true
        },
        {
          title: '姓名',
          dataIndex: 'name'
        },
        {
          title: '性别',
          dataIndex: 'gender'
        },
        {
          title: '医生',
          dataIndex: 'doctorName'
        },
        {
          title: '高血压',
          dataIndex: 'hasHypertension',
          customRender: (has) => has ? <a-icon type="warning" theme="twoTone" twoToneColor="#eb2f96"/> : <a-icon type="warning" />
        },
        {
          title: '糖尿病',
          customRender: (has) => has ? <a-icon type="clock-circle" theme="twoTone" twoToneColor="#eb2f96"/> : <a-icon type="clock-circle" />
        },
        {
          title: '脑卒中',
          dataIndex: 'hasStroke',
          customRender: (has) => has ? <a-icon type="exclamation-circle" theme="twoTone" twoToneColor="#eb2f96"/> : <a-icon type="exclamation-circle" />
        },
        {
          title: '冠心病',
          dataIndex: 'hasAscvd',
          customRender: (has) => has ? <a-icon type="plus-square" theme="twoTone" twoToneColor="#eb2f96"/> : <a-icon type="plus-square" />
        },
        {
          title: '慢阻肺',
          dataIndex: 'hasCopd',
          customRender: (has) => has ? <a-icon type="meh" theme="twoTone" twoToneColor="#eb2f96"/> : <a-icon type="meh" />
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        console.log('loadData.parameter', parameter)
        return getPatientList(Object.assign(parameter, this.queryParam))
          .then(res => {
            return res.data
          })
      },
      selectedRowKeys: [],
      selectedRows: [],

      options: {
        alert: false,
        rowSelection: null
      },
      optionAlertShow: false
    }
  },
  filters: { },
  created () { },
  methods: {
    handleEdit (record) {
      console.log(record)
      this.$refs.modal.edit(record)
    },
    handleOk (values) {      
      console.log("handleOk",values)
      this.$refs.table.refresh()
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    resetSearchForm () {
      this.queryParam = {
        date: moment(new Date())
      }
    }
  }
}
</script>

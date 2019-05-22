<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="12" :sm="24">
            <a-form-item label>
              <a-checkbox-group :options="plainOptions"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label>
              <a-input placeholder="高血压"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-button type="primary" icon="search">查询</a-button>
            <a-button icon="plus" style="margin-left: 8px">新增</a-button>
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
      <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>
      <span slot="status" slot-scope="text">
        <a-badge :status="text | statusTypeFilter" :text="text | statusFilter"/>
      </span>

      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleEdit(record)">查看详情</a>
        </template>
      </span>
    </s-table>
    <create-form ref="createModal" @ok="handleOk"/>
    <step-by-step-modal ref="modal" @ok="handleOk"/>
  </a-card>
</template>

<script>
import moment from 'moment'
import { STable } from '@/components'
import StepByStepModal from './modules/StepByStepModal'
import CreateForm from './modules/CreateForm'
import { getPatientList } from '@/api/patient'

const plainOptions = ['高血压', '糖尿病', '脑卒中', '冠心病', '慢阻肺']
const statusMap = {
  0: {
    status: 'default',
    text: '关闭'
  },
  1: {
    status: 'processing',
    text: '运行中'
  },
  2: {
    status: 'success',
    text: '已上线'
  },
  3: {
    status: 'error',
    text: '异常'
  }
}

export default {
  name: 'TableList',
  components: {
    STable,
    CreateForm,
    StepByStepModal
  },
  data() {
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
          customRender: has =>
            has ? <a-icon type="warning" theme="twoTone" twoToneColor="#eb2f96" /> : <a-icon type="warning" />
        },
        {
          title: '糖尿病',
          customRender: has =>
            has ? <a-icon type="clock-circle" theme="twoTone" twoToneColor="#eb2f96" /> : <a-icon type="clock-circle" />
        },
        {
          title: '脑卒中',
          dataIndex: 'hasStroke',
          customRender: has =>
            has ? (
              <a-icon type="exclamation-circle" theme="twoTone" twoToneColor="#eb2f96" />
            ) : (
              <a-icon type="exclamation-circle" />
            )
        },
        {
          title: '冠心病',
          dataIndex: 'hasAscvd',
          customRender: has =>
            has ? <a-icon type="plus-square" theme="twoTone" twoToneColor="#eb2f96" /> : <a-icon type="plus-square" />
        },
        {
          title: '慢阻肺',
          dataIndex: 'hasCopd',
          customRender: has =>
            has ? <a-icon type="meh" theme="twoTone" twoToneColor="#eb2f96" /> : <a-icon type="meh" />
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: async parameter => {
        console.log('loadData.parameter', parameter)
        const res = await getPatientList({ ...parameter, ...this.queryParam })
        console.info(`res: ${JSON.stringify(res)}`)
        return {
          pageSize: parameter.pageSize,
          pageNo: res.data.page,
          totalCount: res.data.total,
          totalPage: res.data.total / parameter.pageSize,
          data: res.data.patients
        }
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
  filters: {
    statusFilter(type) {
      return statusMap[type].text
    },
    statusTypeFilter(type) {
      return statusMap[type].status
    }
  },
  created() {},
  methods: {
    handleEdit(record) {
      console.log(record)
      this.$refs.modal.edit(record)
    },
    handleOk() {
      this.$refs.table.refresh()
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced() {
      this.advanced = !this.advanced
    },
    resetSearchForm() {
      this.queryParam = {
        date: moment(new Date())
      }
    }
  }
}
</script>

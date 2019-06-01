<template>
  <a-card :bordered="false">
    <!-- <div class="test-icon">
      <icon-font type="iconicon5" :style="{ color: 'hotpink', fontSize: '50px' }"/>
      <icon-font type="iconicon"/>
      <icon-font type="iconicon1"/>
    </div>-->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="12" :sm="24">
            <a-form-item label>
              <a-checkbox-group :options="plainOptions" v-model="queryParam.type"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label>
              <a-input placeholder="id" v-model="queryParam.id"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-button type="primary" icon="search" @click="$refs.table.refresh(true)">查询</a-button>
            <a-button icon="plus" style="margin-left: 8px" @click="$refs.createModal.add()">添加患者</a-button>
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

<style scoped>
.ant-table-body .anticon {
  font-size: 24px;
}
</style>

<script>
import moment from 'moment'
import { STable } from '@/components'
import StepByStepModal from './modules/StepByStepModal'
import CreateForm from './modules/CreateForm'
import { patientAll } from '@/api/patient'
import IconFont from '@/components/Icon/index.js'

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
    StepByStepModal,
    IconFont
  },
  data() {
    return {
      mdl: {},
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
          dataIndex: 'name'
        },
        {
          title: '高血压',
          dataIndex: 'hasHypertension',
          customRender: has =>
            has ? <icon-font type="icon_hypertension_red" /> : <icon-font type="icon_hypertension" />
        },
        {
          title: '糖尿病',
          dataIndex: 'hasDiabetes',
          customRender: has => (has ? <icon-font type="icon_diabetes_red" /> : <icon-font type="icon_diabetes" />)
        },
        {
          title: '脑卒中',
          dataIndex: 'hasStroke',
          customRender: has => (has ? <icon-font type="icon_stroke_red" /> : <icon-font type="icon_stroke" />)
        },
        {
          title: '冠心病',
          dataIndex: 'hasAscvd',
          customRender: has => (has ? <icon-font type="icon_ascvd_red" /> : <icon-font type="icon_ascvd" />)
        },
        {
          title: '慢阻肺',
          dataIndex: 'hasCopd',
          customRender: has => (has ? <icon-font type="icon_copd_red" /> : <icon-font type="icon_copd" />)
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
        const res = await patientAll({ ...parameter, ...this.queryParam })
        // console.info(`res: ${JSON.stringify(res)}`)
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
  filters: {},
  created() {},
  methods: {
    handleEdit(record) {
      this.$router.push({ path: `/patient/${record.id}` })
    },
    handleOk() {
      this.$refs.table.refresh()
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    resetSearchForm() {
      this.queryParam = {
        date: moment(new Date())
      }
    }
  }
}
</script>

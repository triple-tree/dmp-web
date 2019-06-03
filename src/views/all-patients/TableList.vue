<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="12" :sm="24">
            <a-form-item label>
              <a-checkbox-group :options="typeOptions" v-model="queryParam.type"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label>
              <a-input placeholder="id" v-model="queryParam.id"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-row>
              <a-col :md="10" :sm="10">
                <a-button type="primary" icon="search" @click="$refs.table.refresh()">查询</a-button>
              </a-col>
              <a-col :md="10" :sm="10">
                <a-button icon="plus" style="margin-left: 8px" @click="$refs.createModal.add()">添加患者</a-button>
              </a-col>
            </a-row>
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
  </a-card>
</template>

<style scoped>
.ant-table-body .anticon {
  font-size: 24px;
}
</style>

<script>
import { STable } from '@/components'
import CreateForm from './modules/CreateForm'
import { patientAdd, patientQuery } from '@/api/patient'
import IconFont from '@/components/Icon/index.js'

const typeOptions = [
  { label: '高血压', value: 'hasHypertension' },
  { label: '糖尿病', value: 'hasDiabetes' },
  { label: '脑卒中', value: 'hasStroke' },
  { label: '冠心病', value: 'hasAscvd' },
  { label: '慢阻肺', value: 'hasCopd' },
]

export default {
  name: 'TableList',
  components: {
    STable,
    CreateForm,
    IconFont,
  },
  data() {
    return {
      mdl: {},
      // 查询参数
      queryParam: {},
      typeOptions,
      // 表头
      columns: [
        {
          title: '编号',
          dataIndex: 'id',
        },
        {
          title: '日期',
          dataIndex: 'createDate',
          sorter: true,
        },
        {
          title: '姓名',
          dataIndex: 'name',
        },
        {
          title: '性别',
          dataIndex: 'gender',
        },
        {
          title: '医生',
          dataIndex: 'doctorId',
        },
        {
          title: '高血压',
          dataIndex: 'hasHypertension',
          customRender: has =>
            has ? <icon-font type="icon_hypertension_red" /> : <icon-font type="icon_hypertension" />,
        },
        {
          title: '糖尿病',
          dataIndex: 'hasDiabetes',
          customRender: has => (has ? <icon-font type="icon_diabetes_red" /> : <icon-font type="icon_diabetes" />),
        },
        {
          title: '脑卒中',
          dataIndex: 'hasStroke',
          customRender: has => (has ? <icon-font type="icon_stroke_red" /> : <icon-font type="icon_stroke" />),
        },
        {
          title: '冠心病',
          dataIndex: 'hasAscvd',
          customRender: has => (has ? <icon-font type="icon_ascvd_red" /> : <icon-font type="icon_ascvd" />),
        },
        {
          title: '慢阻肺',
          dataIndex: 'hasCopd',
          customRender: has => (has ? <icon-font type="icon_copd_red" /> : <icon-font type="icon_copd" />),
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' },
        },
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: async parameter => {
        console.log('loadData.parameter', parameter)
        console.log('this.queryParam', this.queryParam)
        const params = {}
        params.and = []
        !!this.queryParam.id &&
          params.and.push({
            columnName: 'id',
            method: 'eq',
            value: this.queryParam.id,
          })
        this.queryParam.type &&
          this.queryParam.type.length &&
          this.queryParam.type.forEach(function(e) {
            params.and.push({
              columnName: e,
              method: 'eq',
              value: 1,
            })
          })
        const paginationParam = {
          pageNo: parameter.pageNo,
          pageSize: parameter.pageSize,
        }
        const res = await patientQuery(params, paginationParam)
        console.info(`res: ${JSON.stringify(res)}`)
        return {
          pageSize: parseInt(parameter.pageSize),
          pageNo: parseInt(res.data.page),
          totalCount: parseInt(res.data.total),
          totalPage: parseInt(res.data.total) / parseInt(parameter.pageSize),
          data: res.data.patients,
        }
      },
      options: {
        alert: false,
        rowSelection: null,
      },
      optionAlertShow: false,
    }
  },
  filters: {},
  created() {},
  methods: {
    handleEdit(record) {
      this.$router.push({ path: `/patient/${record.id}` })
    },
    handleOk(parameter) {
      const self = this
      async function addPatient(parameter) {
        console.log('handleOk.parameter', parameter)
        const res = await patientAdd(parameter)
        if (res.code === 200) {
          self.$message.success('患者创建成功')
        }
        self.$refs.table.refresh()
        console.info(`handleOk res: ${JSON.stringify(res)}`)
      }
      addPatient()
    },
  },
}
</script>

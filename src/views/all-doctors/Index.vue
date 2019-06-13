<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="12" :sm="24"></a-col>
          <a-col :md="6" :sm="24"></a-col>
          <a-col :md="6" :sm="24">
            <a-button icon="plus" style="margin-left: 8px" @click="$refs.createModal.add()">添加医生</a-button>
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
      <span slot="action" slot-scope="text, record">
        <a-row :gutter="48">
          <a-col :md="12" :sm="24">
            <a-button
              icon="check"
              type="primary"
              style="margin-left: 8px"
              :disabled="record.status === 1"
              @click="accept(record.id)"
            >通过审核</a-button>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-button
              icon="close"
              type="danger"
              style="margin-left: 8px"
              :disabled="record.status === 0"
              @click="reject(record.id)"
            >拒接审核</a-button>
          </a-col>
        </a-row>
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
import Vue from 'vue'
import Component from 'vue-class-component'
import { STable } from '@/components'
import CreateForm from './modules/CreateForm'
import { doctorAdd, doctorAll, doctorAudit } from '@/api/doctor'
import IconFont from '@/components/Icon/index.js'
import { USER_INFO } from '@/store/mutation-types'

@Component({
  components: {
    STable,
    CreateForm,
    IconFont,
  },
  props: {
    id: String,
  },
})
export default class extends Vue {
  data() {
    return {
      mdl: {},
      // 表头
      columns: [
        {
          title: '编号',
          dataIndex: 'id',
        },
        {
          title: '地址',
          dataIndex: 'address',
        },
        {
          title: '姓名',
          dataIndex: 'name',
        },
        {
          title: '性别',
          dataIndex: 'gender',
          customRender: gender => (gender ? <span>女</span> : <span>男</span>),
        },
        {
          title: '医院',
          dataIndex: 'hospital',
        },
        {
          title: '审核',
          key: 'action',
          scopedSlots: { customRender: 'action' },
        },
      ],
      loadData: async parameter => {
        const paginationParam = {
          page: parameter.pageNo,
          size: parameter.pageSize,
          adminId: Vue.ls.get(USER_INFO).data.id,
        }
        console.info(`doctorAll: paginationParam: ${JSON.stringify(paginationParam)}`)
        const res = await doctorAll(null, paginationParam)
        let doctors = res.data.doctors
        doctors = doctors.map(doctor => ({
          ...doctor,
          address: `${doctor.province}${doctor.city}${doctor.county}`,
        }))
        console.info(`doctors: ${JSON.stringify(doctors, null, 2)}`)
        return {
          pageSize: parseInt(parameter.pageSize),
          pageNo: parseInt(res.data.page),
          totalCount: parseInt(res.data.total),
          totalPage: parseInt(res.data.total) / parseInt(parameter.pageSize),
          data: doctors,
        }
      },
      options: {
        alert: false,
        rowSelection: null,
      },
      optionAlertShow: false,
    }
  }
  async created() {}

  async accept(id) {
    console.info(`accept ${id}`)
    const res = await doctorAudit({ doctorId: id, accept: 1 })
    if (res.code === 200) {
      this.$message.success('通过审核成功')
    }
    this.$refs.table.refresh()
  }

  async reject(id) {
    console.info(`reject ${id}`)
    const res = await doctorAudit({ doctorId: id, accept: 0 })
    if (res.code === 200) {
      this.$message.success('拒接审核成功')
    }
    this.$refs.table.refresh()
  }

  async handleOk(doctor) {
    const res = await doctorAdd(doctor)
    if (res.code === 200) {
      this.$message.success('患者创建成功')
    }
    this.$refs.table.refresh()
    console.info(`handleOk res: ${JSON.stringify(res)}`)
  }
}
</script>

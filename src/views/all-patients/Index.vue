<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="12" :sm="24">
            <a-form-item label>
              <a-checkbox-group :options="typeOptions" v-model="queryParam.type" />
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label>
              <a-input placeholder="请输入待搜索的姓名" v-model="queryParam.name" />
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
        <a-row>
          <a-col :md="10" :sm="10">
            <a-upload
              name="file"
              :multiple="true"
              :customRequest="uploadFile"
              @change="handleUploadChange"
            >
              <a-button>
                <a-icon type="upload" />患者批量导入
              </a-button>
            </a-upload>
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
      :customRow="clickRow"
    >
      <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>
      <span slot="status" slot-scope="text">
        <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
      </span>
    </s-table>
    <create-form ref="createModal" @ok="handleOk" />
  </a-card>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { STable } from '@/components'
import CreateForm from './modules/CreateForm'
import { patientAdd, patientQuery, patientUpload } from '@/api/patient'
import { doctorAll } from '@/api/doctor'
import IconFont from '@/components/Icon/index.js'
import { USER_INFO } from '@/store/mutation-types'
import debug from 'debug'
const log = debug('app:all-patients')

const typeOptions = [
  { label: '高血压', value: 'hasHypertension' },
  { label: '糖尿病', value: 'hasDiabetes' },
  { label: '脑卒中', value: 'hasStroke' },
  { label: '冠心病', value: 'hasAscvd' },
  { label: '慢阻肺', value: 'hasCopd' },
]

let doctors = null

const findDoctorName = (doctors, doctorId) => {
  const doctor = doctors.filter(doctor => doctor.id === doctorId)[0]
  if (doctor) {
    return doctor.name
  }
  return ''
}

@Component({
  components: {
    STable,
    CreateForm,
    IconFont,
  },
})
export default class extends Vue {
  data() {
    return {
      file: '',
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
          customRender: gender => (gender ? <span>女</span> : <span>男</span>),
        },
        {
          title: '医生',
          dataIndex: 'doctorName',
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
      ],
      loadData: async parameter => {
        log('loadData.parameter', parameter)
        log('this.queryParam', this.queryParam)
        const params = {}
        params.and = []
        !!this.queryParam.name &&
          params.and.push({
            columnName: 'name',
            method: 'eq',
            value: this.queryParam.name,
          })
        this.queryParam.type &&
          this.queryParam.type.length &&
          this.queryParam.type.forEach(function (e) {
            params.and.push({
              columnName: e,
              method: 'eq',
              value: 1,
            })
          })
        const paginationParam = {
          page: parameter.pageNo,
          size: parameter.pageSize,
        }
        const res = await patientQuery(params, paginationParam)
        let patients = res.data.patients
        if (!doctors) {
          doctors = (await doctorAll(null, { page: 1, size: 10000000, adminId: Vue.ls.get(USER_INFO).data.id })).data
            .doctors
        }
        patients = patients.map(patient => ({ ...patient, doctorName: findDoctorName(doctors, patient.doctorId) }))
        return {
          pageSize: parseInt(parameter.pageSize),
          pageNo: parseInt(res.data.page),
          totalCount: parseInt(res.data.total),
          totalPage: parseInt(res.data.total) / parseInt(parameter.pageSize),
          data: patients,
        }
      },
      clickRow: record => {
        return {
          on: {
            click: () => {
              log(`clicked id: ${record.id}`)
              this.$router.push({ path: `/patient/${record.id}` })
            },
          },
        }
      },
      options: {
        alert: false,
        rowSelection: null,
      },
      optionAlertShow: false,
    }
  }

  async created() {
    doctors = (await doctorAll(null, { page: 1, size: 10000000, adminId: Vue.ls.get(USER_INFO).data.id })).data.doctors
  }

  handleUploadChange(info) {
    if (info.file.status !== 'uploading') {
      log(info.file, info.fileList)
    }
    if (info.file.status === 'done') {
      this.$refs.table.refresh()
      this.$message.success(`${info.file.name} 文件上传成功`)
    } else if (info.file.status === 'error') {
      this.$message.error(`${info.file.name} 文件上传失败`)
    }
  }

  async uploadFile({ filename, file, data, onProgress, onSuccess, onError }) {
    log(`uploadFile ${file}`)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('doctorId', Vue.ls.get(USER_INFO).data.id)
    try {
      const res = await patientUpload(formData)
      onSuccess(res)
    } catch (error) {
      onError(error)
    }
  }

  async handleOk(parameter) {
    log('handleOk.parameter', parameter)
    const res = await patientAdd(parameter)
    if (res.code === 200) {
      this.$message.success('患者创建成功')
    } else {
      this.$message.error('患者创建失败')
    }
    this.$refs.table.refresh()
    log(`handleOk res: ${JSON.stringify(res)}`)
  }
}
</script>

<style scoped>
.ant-table-body .anticon {
  font-size: 24px;
}
</style>

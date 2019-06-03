<template>
  <div>
    <a-layout id="root-container">
      <a-layout-sider
        width="300"
        collapsedWidth="180"
        :trigger="null"
        collapsible
        v-model="collapsed"
      >
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="()=> collapsed = !collapsed"
          />
        </a-layout-header>
        <div class="patient-basic-info">
          <h1>{{ model.name }}</h1>
          <div :style="{ marginBottom:'30px'}">
            <span class="gender">{{ model.gender ? '女': '男' }}</span>
            <span class="age">{{ model.age }}</span>
          </div>
          <div :style="{ marginBottom:'10px'}">
            <span class="info-key">手机号：</span>
            <span class="info-value">{{ model.phoneNumber }}</span>
          </div>
          <div :style="{ marginBottom:'10px'}">
            <span class="info-key">身份证号：</span>
            <span class="info-value">{{ model.identityNumber }}</span>
          </div>
          <div :style="{ marginBottom:'15px'}">
            <span class="info-key">住址：</span>
            <span
              class="info-value"
            >{{ model.province + model.city + model.county + model.detailAddress }}</span>
          </div>
          <div class="hint" :style="{ marginBottom:'10px'}">（以下为最新评估结果展示）</div>
          <div :style="{ marginBottom:'10px'}">
            <span class="ill-status">慢病综合风险：</span>
            <span class="ill-value">{{ 'null' }}</span>
          </div>
          <div class="chronic-disease-status">
            <div class="item">
              <div class="title">
                <div class="disease-icon">
                  <a-icon type="meh"/>
                </div>
                <div class="name">高血压</div>
              </div>
              <div class="status">
                <span class="active">患者</span>
                <span v-if="!collapsed">高危</span>
                <span v-if="!collapsed">一般群众</span>
                <span v-if="!collapsed">不详</span>
              </div>
            </div>
            <div class="item">
              <div class="title">
                <div class="disease-icon">
                  <a-icon type="meh"/>
                </div>
                <div class="name">糖尿病</div>
              </div>
              <div class="status">
                <span v-if="!collapsed">患者</span>
                <span class="active">高危</span>
                <span v-if="!collapsed">一般群众</span>
                <span v-if="!collapsed">不详</span>
              </div>
            </div>
            <div class="item">
              <div class="title">
                <div class="disease-icon">
                  <a-icon type="meh"/>
                </div>
                <div class="name">脑卒中</div>
              </div>
              <div class="status">
                <span v-if="!collapsed">患者</span>
                <span v-if="!collapsed">高危</span>
                <span class="active">一般群众</span>
                <span v-if="!collapsed">不详</span>
              </div>
            </div>
            <div class="item">
              <div class="title">
                <div class="disease-icon">
                  <a-icon type="meh"/>
                </div>
                <div class="name">冠心病</div>
              </div>
              <div class="status">
                <span v-if="!collapsed">患者</span>
                <span v-if="!collapsed">高危</span>
                <span v-if="!collapsed">一般群众</span>
                <span class="active">不详</span>
              </div>
            </div>
            <div class="item">
              <div class="title">
                <div class="disease-icon">
                  <a-icon type="meh"/>
                </div>
                <div class="name">慢阻肺</div>
              </div>
              <div class="status">
                <span class="active">患者</span>
                <span v-if="!collapsed">高危</span>
                <span v-if="!collapsed">一般群众</span>
                <span v-if="!collapsed">不详</span>
              </div>
            </div>
          </div>
        </div>
      </a-layout-sider>
      <a-layout>
        <a-layout-content class="content">
          <a-tabs defaultActiveKey="1">
            <a-tab-pane key="1">
              <span slot="tab">
                <a-icon type="android"/>健康档案
              </span>
              <record :id="id"></record>
            </a-tab-pane>
            <a-tab-pane key="2">
              <span slot="tab">
                <a-icon type="apple"/>评估筛选
              </span>
              <assessment :id="id"></assessment>
            </a-tab-pane>
            <a-tab-pane key="3">
              <span slot="tab">
                <a-icon type="android"/>健康方案
              </span>
              <plan :id="id"></plan>
            </a-tab-pane>
          </a-tabs>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
// 健康档案
import Record from './Record'
// 评估筛选
import Assessment from './Assessment'
// 健康方案
import Plan from './Plan'

import { patientQueryById } from '@/api/patient'

@Component({
  components: {
    Record,
    Assessment,
    Plan,
  },
  props: {
    id: String,
  },
})
export default class extends Vue {
  async created() {
    console.info(`created`)
  }
  async mounted() {
    console.info(`mounted`)
  }
  async setData() {
    console.info(`setData`)
    const patientId = this.id
    const patient = await patientQueryById({ patientId })
    this.model = { ...this.model, ...patient.data }
    console.info(this.model)
  }
  async beforeRouteEnter(to, from, next) {
    console.info(`beforeRouteEnter`)
    next(async vm => vm.setData())
  }
  data() {
    return {
      model: {},
      collapsed: false,
    }
  }
}
</script>

<style lang="less" scoped>
.patient-basic-info {
  flex-direction: column;
  padding: 10px;

  h1 {
    font-weight: bold;
  }

  .age {
    margin-left: 30px;
  }

  .hint {
    color: #159bd5;
  }

  .info-key {
    color: #000;
    font-weight: bold;
  }

  .ill-status {
    color: #000;
  }

  .ill-value {
    color: #ff2520;
  }

  .chronic-disease-status {
    .item {
      border-bottom: 1px solid #d6d6d6;
      color: #000;
      display: flex;

      .title {
        border-right: 1px solid #d6d6d6;
        padding: 20px 10px 20px 10px;

        .disease-icon {
          display: block;
          margin-bottom: 10px;
          text-align: center;
        }
      }

      .status {
        color: #b3b3b3;
        padding: 40px 10px 10px 10px;
        font-weight: 600;

        span {
          padding-right: 10px;
        }

        span.active {
          color: #f39800;
        }
      }
    }
  }
}

#root-container .ant-layout-sider {
  background: #fff;
  min-height: 100vh;
}
#root-container .content {
  background: #fff;
  min-height: 100vh;
  margin: 0 10px;
  padding: 10px;
}

#root-container /deep/ .ant-tabs-content {
  // margin: 0 0 0 10px;
}

#root-container .ant-layout-header {
  display: flex;
  flex-direction: row-reverse;
}

#root-container .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#root-container .trigger:hover {
  color: #1890ff;
}

#root-container .logo {
  height: 32px;
  margin: 16px;
}
</style>

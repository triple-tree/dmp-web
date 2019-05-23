<template>
  <div class="patient">
    <a-row :gutter="24">
      <a-col
        :xl="6"
        :lg="6"
        :md="24"
        :sm="24"
        :xs="24"
        :style="{ paddingLeft:'12px',paddingRight:'12px'}"
      >
        <div class="patient-basic-info">
          <h1>陈先生</h1>
          <div :style="{ marginBottom:'30px'}">
            <span class="gender">男</span>
            <span class="age">65岁</span>
          </div>
          <div :style="{ marginBottom:'10px'}">
            <span class="info-key">手机号：</span>
            <span class="info-value">18119183829</span>
          </div>
          <div :style="{ marginBottom:'10px'}">
            <span class="info-key">身份证号：</span>
            <span class="info-value">372012192302392329</span>
          </div>
          <div :style="{ marginBottom:'15px'}">
            <span class="info-key">住址：</span>
            <span class="info-value">北京市朝阳区三元桥</span>
          </div>
          <div class="hint" :style="{ marginBottom:'10px'}">（以下为最新评估结果展示）</div>
          <div :style="{ marginBottom:'10px'}">
            <span class="ill-status">慢病综合风险：</span>
            <span class="ill-value">高危</span>
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
                <span>高危</span>
                <span>一般群众</span>
                <span>不详</span>
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
                <span>患者</span>
                <span class="active">高危</span>
                <span>一般群众</span>
                <span>不详</span>
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
                <span>患者</span>
                <span>高危</span>
                <span class="active">一般群众</span>
                <span>不详</span>
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
                <span>患者</span>
                <span>高危</span>
                <span>一般群众</span>
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
                <span>高危</span>
                <span>一般群众</span>
                <span>不详</span>
              </div>
            </div>
          </div>
        </div>
      </a-col>
      <a-col
        :xl="18"
        :lg="18"
        :md="24"
        :sm="24"
        :xs="24"
        :style="{ paddingLeft:'12px',paddingRight:'12px'}"
      >
        <a-layout id="root-container">
          <a-layout-sider
            width="300"
            collapsedWidth="200"
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
          </a-layout-sider>
          <a-layout>
            <a-layout-content class="content">
              <a-tabs defaultActiveKey="2">
                <a-tab-pane key="1">
                  <span slot="tab">
                    <a-icon type="android"/>健康档案
                  </span>
                  <record></record>
                </a-tab-pane>
                <a-tab-pane key="2">
                  <span slot="tab">
                    <a-icon type="apple"/>评估筛选
                  </span>
                  <assessment></assessment>
                </a-tab-pane>
                <a-tab-pane key="3">
                  <span slot="tab">
                    <a-icon type="android"/>健康方案
                  </span>
                  <plan></plan>
                </a-tab-pane>
              </a-tabs>
            </a-layout-content>
          </a-layout>
        </a-layout>
      </a-col>
    </a-row>
  </div>
</template>

<script>
// 健康档案
import Record from './Record'
// 评估筛选
import Assessment from './Assessment'
// 健康方案
import Plan from './Plan'

export default {
  components: {
    Record,
    Assessment,
    Plan
  },
  data() {
    return {
      collapsed: false
    }
  }
}
</script>

<style lang="less"  scoped>
.patient-basic-info {
  border: 1px solid #d6d6d6;
  border-radius: 10px;
  flex-direction: column;
  font-size: 18px;
  min-width: 382px;
  padding: 20px;

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

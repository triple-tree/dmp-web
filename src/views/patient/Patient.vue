<template>
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
      <div class="patient-basic-info">
        <h1>陈先生</h1>
        <div>
          <span class="gender">男</span>
          <span class="age">65岁</span>
        </div>
        <div>
          <span class="info-key">手机号:</span>
          <span class="info-value">18119183829</span>
        </div>
        <div>
          <span class="info-key">身份证号:</span>
          <span class="info-value">372012192302392329</span>
        </div>
        <div>
          <span class="info-key">住址</span>
          <span class="info-value">北京市朝阳区三元桥</span>
        </div>
        <div class="hint">（以下为最新提示信息）</div>
        <div>
          <span class="ill-status">慢病综合风险:</span>
          <span class="ill-value">高危</span>
        </div>
      </div>
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
<style>
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
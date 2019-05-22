<template>
  <div class="patient">
    <a-row :gutter="24">
      <a-col
        :xl="6"
        :lg="6"
        :md="24"
        :sm="24"
        :xs="24"
        :style="{ paddingLeft:'12px',paddingRight:'12px'  }"
      >
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
      </a-col>
      <a-col
        :xl="18"
        :lg="18"
        :md="24"
        :sm="24"
        :xs="24"
        :style="{ paddingLeft:'12px',paddingRight:'12px'  }"
      >
        <div class="patient-detail-info"></div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: 'Patient'
}
</script>

<style scoped>
.patient-basic-info {
  border: 1px solid #333;
  border-radius: 10px;
  flex-direction: column;
  padding: 20px;

  .gender {
    color: #eee;
  }

  h1 {
    font-family: '黑体';
    font-weight: bold;
  }
}

.patient-detail-info {
  border: 1px solid #333;
  border-radius: 10px;
}
</style>

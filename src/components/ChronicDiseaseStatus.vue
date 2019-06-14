<template>
  <div class="item">
    <div class="title">
      <div class="disease-icon">
        <icon-font class="icon-size" :type="iconType"/>
      </div>
      <div class="name">{{ label }}</div>
    </div>
    <div class="status">
      <span :class="{active: isActive('患者')}" v-if="isVisiable(this.collapsed, '患者')">患者</span>
      <span :class="{active: isActive('低危')}" v-if="isVisiable(this.collapsed, '低危')">低危</span>
      <span :class="{active: isActive('高危')}" v-if="isVisiable(this.collapsed, '高危')">高危</span>
      <span :class="{active: isActive('一般群众')}" v-if="isVisiable(this.collapsed, '一般群众')">一般群众</span>
      <span :class="{active: isActive('不详')}" v-if="isVisiable(this.collapsed, '不详')">不详</span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import IconFont from '@/components/Icon/index.js'

const iconTypeDic = {
  hypertension: { icons: ['icon_hypertension', 'icon_hypertension_red'], label: '高血压' },
  diabetes: { icons: ['icon_diabetes', 'icon_diabetes_red'], label: '糖尿病' },
  stroke: { icons: ['icon_stroke', 'icon_stroke_red'], label: '脑卒中' },
  ascvd: { icons: ['icon_ascvd', 'icon_ascvd_red'], label: '冠心病' },
  copd: { icons: ['icon_copd', 'icon_copd_red'], label: '慢阻肺' },
  dyslipidemiad: { icons: ['icon_dyslipidemiad', 'icon_dyslipidemiad_red'], label: '血脂异常' },
}

@Component({
  components: {
    IconFont,
  },
  props: {
    iconTypeName: {
      type: String,
      required: false,
      default: 'hypertension',
    },
    status: {
      type: String,
      required: false,
      default: '患者',
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
})
export default class ChronicDiseaseStatus extends Vue {
  created() {
    // console.info(
    //   `$iconTypeName: ${JSON.stringify(this.iconTypeName)}, $status: ${JSON.stringify(
    //     this.status
    //   )}, $collapsed: ${JSON.stringify(this.collapsed)}`
    // )
  }

  data() {
    const {
      icons: [iconType],
      label,
    } = iconTypeDic[this.iconTypeName]
    if (!(iconType && label)) {
      throw new Error(`iconType or label could not infer from this. (${this.iconTypeName})`)
    }
    // console.info(`iconType: ${iconType}, label: ${label}`)
    return {
      iconType,
      label,
    }
  }

  isActive(text) {
    return this.status === text
  }

  isVisiable(collapsed, text) {
    if (collapsed) {
      return this.status === text
    }
    return true
  }
}
</script>

<style lang="less" scoped>
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

.icon-size {
  font-size: 24px;
}
</style>

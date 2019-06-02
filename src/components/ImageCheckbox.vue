<template>
  <a-checkbox
    :checked="checked"
    @change="onChange"
    :class="{'image-checkbox': true, 'hide-checkbox': !showCheckbox}"
    :disabled="disabled"
  >
    <icon-font class="icon-size" :type="type"/>
    <div>{{ innerLabel }}</div>
  </a-checkbox>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import IconFont from '@/components/Icon/index.js'
import { throws } from 'assert'

const iconTypeDic = {
  hypertension: { icons: ['icon_hypertension', 'icon_hypertension_red'], label: '高血压' },
  diabetes: { icons: ['icon_diabetes', 'icon_diabetes_red'], label: '糖尿病' },
  stroke: { icons: ['icon_stroke', 'icon_stroke_red'], label: '脑卒中' },
  ascvd: { icons: ['icon_ascvd', 'icon_ascvd_red'], label: '冠心病' },
  copd: { icons: ['icon_copd', 'icon_copd_red'], label: '慢阻肺' },
  dyslipidemiad: { icons: ['icon_dyslipidemiad', 'icon_dyslipidemiad_red'], label: '血脂异常' }
}

@Component({
  components: {
    IconFont
  },
  props: {
    value: {
      type: Number,
      required: false,
      default: 0
    },
    label: {
      type: String,
      required: false,
      default: null
    },
    iconTypeName: {
      type: String,
      required: false,
      default: null
    },
    iconType: {
      type: Array,
      required: false,
      default: null
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    showCheckbox: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  watch: {
    value: [
      {
        handler: 'valueChanged',
        immediate: false,
        deep: false
      }
    ]
  }
})
export default class ImageCheckbox extends Vue {
  created() {
    if (!(this.iconType || this.iconTypeName)) {
      throw 'iconType or iconTypeName should specified'
    }
  }
  data() {
    const innerValue = this.value || 0
    const innerLabel = this.label || iconTypeDic[this.iconTypeName].label
    const innerIconType = this.iconType || iconTypeDic[this.iconTypeName].icons
    if (!innerIconType || !innerLabel) {
      throw `innerIconType or innerLabel could not calculated, $attrs: ${JSON.stringify(this.$attrs)}`
    }
    return {
      innerValue,
      innerIconType,
      innerLabel
    }
  }
  valueChanged(val = 0) {
    this.innerValue = val
  }

  get checked() {
    return this.innerValue === 1
  }
  get type() {
    return this.innerValue ? this.innerIconType[1] : this.innerIconType[0]
  }

  onChange(e) {
    const checked = e.target.checked
    this.innerValue = checked ? 1 : 0
    // Should provide an event to pass value to Form.
    this.$emit('change', this.innerValue)
  }
}
</script>

<style lang="less" scoped>
.icon-size {
  font-size: 36px;
}

.image-checkbox {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hide-checkbox /deep/ .ant-checkbox {
  display: none;
}
</style>
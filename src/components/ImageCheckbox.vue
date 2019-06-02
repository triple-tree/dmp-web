<template>
  <a-checkbox :checked="checked" @change="onChange" class="image-checkbox">
    <icon-font class="icon-size" :type="type"/>
    <div>{{ label }}</div>
  </a-checkbox>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import IconFont from '@/components/Icon/index.js'

@Component({
  components: {
    IconFont
  },
  props: ['value', 'label', 'iconType'],
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
    // console.info(`ImageCheckbox created with value: ${JSON.stringify(this.value)}`)
    // console.info(`ImageCheckbox created with label: ${this.label}`)
    // console.info(`ImageCheckbox created with iconType: ${JSON.stringify(this.iconType)}`)
  }
  data() {
    // console.info(`data, this.value: ${this.value}`)
    return {
      innerValue: this.value || 0
    }
  }
  valueChanged(val = 0) {
    // console.info(`valueChanged`)
    this.innerValue = val
  }

  get checked() {
    // console.info(`get checked`)
    return this.innerValue === 1
  }
  get type() {
    // console.info(`get type`)
    return this.innerValue ? this.iconType[1] : this.iconType[0]
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

.image-checkbox /deep/ .ant-checkbox {
  display: none;
}
</style>
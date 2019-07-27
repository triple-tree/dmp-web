<template>
  <a-checkbox :checked="checked" @change="onChange" :disabled="disabled">
    <slot></slot>
  </a-checkbox>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import debug from 'debug'
const log = debug('app:BooleanValueCheckbox')

@Component({
  props: {
    value: {
      type: String | Number,
      required: false,
      default: 0,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  watch: {
    value: [
      {
        handler: 'valueChanged',
        immediate: false,
        deep: false,
      },
    ],
  },
})
export default class BooleanValueCheckbox extends Vue {
  created() {}
  data() {
    const innerValue = this.value || 0
    log(`text: ${JSON.stringify(this.$slots)},  innerValue: ${innerValue}`)
    return {
      innerValue,
    }
  }
  valueChanged(val = 0) {
    log(`valueChanged with ${val} for text: ${JSON.stringify(this.$slots)}`)
    this.innerValue = val
  }

  get checked() {
    return +this.innerValue === 1
  }

  onChange(e) {
    const checked = e.target.checked
    this.innerValue = checked ? '1' : '0'
    this.$emit('change', this.innerValue)
  }
}
</script>

<style lang="less" scoped>
</style>

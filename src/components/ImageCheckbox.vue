<template>
  <a-checkbox
    :id="item.name"
    :checked="checked"
    @change="onChange"
    class="image-checkbox"
    :value="item.value"
  >
    <icon-font class="icon-size" :type="type"/>
    <div>{{ item.label }}</div>
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
  props: {
    item: Object
  }
})
export default class ImageCheckbox extends Vue {
  created() {
    // console.info(`ImageCheckbox created with item: ${JSON.stringify(this.item)}`)
  }
  data() {
    return {
      checked: this.item.value == 1,
      type: this.item.value ? this.item.iconType1 : this.item.iconType0,
      text: this.item.label,
      decorator: JSON.stringify([this.item.name, {}])
    }
  }
  onChange(e) {
    this.checked = e.target.checked
    this.type = this.checked ? this.item.iconType1 : this.item.iconType0
    this.item.value = this.checked ? 1 : 0
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

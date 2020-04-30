<template>
  <el-dialog
    :title="$t('common.view')"
    :width="width"
    :visible.sync="isVisible"
    class="price-view"
  >
    <el-row :gutter="10">
      <div class="view-item">
        <i class="el-icon-lollipop" /> <span>{{ $t('table.price.name') +'：' }}</span> {{ price.name }}
      </div>
    </el-row>
    <el-row :gutter="10">
      <div class="view-item">
        <i class="el-icon-suitcase" /> <span>{{ $t('table.price.price') +'：' }}</span> {{ price.price }}
      </div>
    </el-row>
    <el-row :gutter="10">
      <div class="view-item">
        <i class="el-icon-bangzhu" /> <span>{{ $t('table.price.ptype') +'：' }}</span> {{ price.ptype === 0 ? $t('common.ptype.one') : (price.ptype === 1 ? $t('common.ptype.two') : $t('common.ptype.three')) }}
      </div>
    </el-row>
  </el-dialog>
</template>
<script>
export default {
  name: 'PirceView',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      screenWidth: 0,
      width: this.initWidth(),
      price: {}
    }
  },
  computed: {
    isVisible: {
      get() {
        return this.dialogVisible
      },
      set() {
        this.close()
      }
    }
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        this.width = this.initWidth()
      })()
    }
  },
  methods: {
    initWidth() {
      this.screenWidth = document.body.clientWidth
      if (this.screenWidth < 550) {
        return '25%'
      } else if (this.screenWidth < 990) {
        return '180px'
      } else if (this.screenWidth < 1400) {
        return '300px'
      } else {
        return '400px'
      }
    },
    setPrice(val) {
      this.price = { ...val }
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>
<style lang="scss" scoped>
  .price-view {
    .img-wrapper {
      text-align: center;
      margin-top: -1.5rem;
      margin-bottom: 10px;
      img {
        width: 4rem;
        border-radius: 50%;
      }
    }
    .view-item {
      margin: 7px;
      i {
        font-size: .97rem;
      }
      span {
        margin-left: 5px;
      }
    }
  }
</style>

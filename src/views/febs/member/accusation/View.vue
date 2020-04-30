<template>
  <el-dialog
    :title="$t('common.view')"
    :width="width"
    :visible.sync="isVisible"
    class="accusation-view"
  >
    <el-row :gutter="10">
      <div class="view-item">
        <span>{{ $t('table.accusation.img1') +'：' }}</span>
        <el-image :src="accusation.img1" lazy />
      </div>
    </el-row>
    <el-row :gutter="10">
      <div class="view-item">
        <span>{{ $t('table.accusation.img2') +'：' }}</span>
        <el-image :src="accusation.img2" lazy />
      </div>
    </el-row>
    <el-row :gutter="10">
      <div class="view-item">
        <span>{{ $t('table.accusation.img3') +'：' }}</span>
        <el-image :src="accusation.img3" lazy />
      </div>
    </el-row>
    <el-row v-if="accusation.img4 !== null && accusation.img4 !== ''" :gutter="10">
      <div class="view-item">
        <span>{{ $t('table.accusation.img4') +'：' }}</span>
        <el-image :src="accusation.img4" lazy />
      </div>
    </el-row>
    <el-row v-if="accusation.img5 !== null && accusation.img5 !== ''" :gutter="10">
      <div class="view-item">
        <span>{{ $t('table.accusation.img5') +'：' }}</span>
        <el-image :src="accusation.img5" lazy />
      </div>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" plain :loading="buttonLoading" @click="isVisible = false">
        {{ $t('common.confirm') }}
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'AccusationView',
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
      buttonLoading: false,
      accusation: {}
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
        return '380px'
      } else if (this.screenWidth < 1400) {
        return '500px'
      } else {
        return '700px'
      }
    },
    setAccusation(val) {
      this.accusation = { ...val }
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>
<style lang="scss" scoped>
  .accusation-view {
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

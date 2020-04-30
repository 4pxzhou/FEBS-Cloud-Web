<template>
  <el-dialog
    :title="title"
    :width="width"
    top="50px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :visible.sync="isVisible"
  >
    <el-form ref="form" :model="member" label-position="right" label-width="150px">
      <el-form-item :label="$t('table.member.headimg')">
        <el-avatar
          shape="circle"
          :size="150"
          fit="fit"
          :src="member.headimg"
        />
      </el-form-item>
      <el-form-item :label="$t('table.member.idcard')">
        <el-input
          v-model="member.idcard"
          :disabled="true"
        />
      </el-form-item>
      <el-form-item :label="$t('table.member.frontcardphoto')">
        <el-image
          style="width: 320px; height: 180px"
          :src="member.frontcardphoto"
          fit="fit"
        />
      </el-form-item>
      <el-form-item :label="$t('table.member.marryad')">
        <el-input
          v-model="member.marryad"
          type="textarea"
          :rows="6"
          :disabled="true"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="warning" plain :loading="buttonLoading" @click="notPassForm">
        {{ $t('common.notpass') }}
      </el-button>
      <el-button type="primary" plain :loading="buttonLoading" @click="passForm">
        {{ $t('common.adopt') }}
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'MemberCheck',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      member: this.initMember(),
      buttonLoading: false,
      screenWidth: 0,
      width: this.initWidth()
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
    initMember() {
      return {
        id: ''
      }
    },
    initWidth() {
      this.screenWidth = document.body.clientWidth
      if (this.screenWidth < 991) {
        return '90%'
      } else if (this.screenWidth < 1400) {
        return '45%'
      } else {
        return '800px'
      }
    },
    setMember(val) {
      this.member = { ...val }
    },
    close() {
      this.$emit('close')
    },
    notPassForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.buttonLoading = true
          this.$put('member/member/notpass', { id: this.member.id }).then(() => {
            this.buttonLoading = false
            this.isVisible = false
            this.$message({
              message: this.$t('tips.checkSuccess'),
              type: 'success'
            })
            this.$emit('success')
          })
        } else {
          return false
        }
      })
    },
    passForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.buttonLoading = true
          this.$put('member/member/pass', { id: this.member.id }).then(() => {
            this.buttonLoading = false
            this.isVisible = false
            this.$message({
              message: this.$t('tips.checkSuccess'),
              type: 'success'
            })
            this.$emit('success')
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

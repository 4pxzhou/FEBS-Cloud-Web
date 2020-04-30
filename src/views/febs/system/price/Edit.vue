<template>
  <el-dialog
    :title="title"
    :width="width"
    top="50px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :visible.sync="isVisible"
  >
    <el-form ref="form" :model="price" :rules="rules" label-position="right" label-width="100px">
      <el-form-item :label="$t('table.price.name')" prop="name">
        <el-input v-model="price.name" />
      </el-form-item>
      <el-form-item :label="$t('table.price.price')" prop="price">
        <el-input v-model="price.price" />
      </el-form-item>
      <el-form-item :label="$t('table.price.ptype')" prop="ptype">
        <treeselect
          v-model="price.ptype"
          :multiple="false"
          :options="ptypes"
          :clear-value-text="$t('common.clear')"
          placeholder=" "
          style="width:100%"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="warning" plain :loading="buttonLoading" @click="isVisible = false">
        {{ $t('common.cancel') }}
      </el-button>
      <el-button type="primary" plain :loading="buttonLoading" @click="submitForm">
        {{ $t('common.confirm') }}
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
import { is5Integer } from '@/utils/my-validate'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  name: 'PriceEdit',
  components: { Treeselect },
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
      price: this.initprice(),
      buttonLoading: false,
      screenWidth: 0,
      width: this.initWidth(),
      ptypes: [],
      roles: [],
      rules: {
        name: [
          { required: true, message: this.$t('rules.require'), trigger: 'blur' },
          { min: 1, max: 20, message: this.$t('rules.range6to20'), trigger: 'blur' },
          { validator: (rule, value, callback) => {
            if (!this.price.id) {
              this.$get(`system/price/check/${value}`).then((r) => {
                if (!r.data) {
                  callback(this.$t('rules.pricenameExist'))
                } else {
                  callback()
                }
              })
            } else {
              callback()
            }
          }, trigger: 'blur' }
        ],
        price: [
          { required: true, message: this.$t('rules.require'), trigger: 'blur' },
          { validator: (rule, value, callback) => {
            if (value !== '' && !is5Integer(value)) {
              callback(this.$t('rules.pricenumber'))
            } else {
              callback()
            }
          }, trigger: 'blur' }
        ],
        ptype: { required: true, message: this.$t('rules.require'), trigger: 'blur' }
      }
    }
  },
  computed: {
    isVisible: {
      get() {
        return this.dialogVisible
      },
      set() {
        this.close()
        this.reset()
      }
    }
  },
  mounted() {
    this.initPtype()
    window.onresize = () => {
      return (() => {
        this.width = this.initWidth()
      })()
    }
  },
  methods: {
    initprice() {
      return {
        id: '',
        name: '',
        type: '0'
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
    initPtype() {
      this.ptypes = [
        {
          id: '0',
          label: '获取联系方式'
        },
        {
          id: '1',
          label: '诚信保证金'
        }
      ]
    },
    setPrice(val) {
      this.price = { ...val }
    },
    close() {
      this.$emit('close')
    },
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.buttonLoading = true
          if (!this.price.id) {
            // create
            this.$post('system/price', { ...this.price }).then(() => {
              this.buttonLoading = false
              this.isVisible = false
              this.$message({
                message: this.$t('tips.createSuccess'),
                type: 'success'
              })
              this.$emit('success')
            })
          } else {
            // update
            this.$put('system/price', { ...this.price }).then(() => {
              this.buttonLoading = false
              this.isVisible = false
              this.$message({
                message: this.$t('tips.updateSuccess'),
                type: 'success'
              })
              this.$emit('success')
            })
          }
        } else {
          return false
        }
      })
    },
    reset() {
      // 先清除校验，再清除表单，不然有奇怪的bug
      this.$refs.form.clearValidate()
      this.$refs.form.resetFields()
      this.price = this.initprice()
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

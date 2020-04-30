<template>
  <el-dialog
    :title="title"
    :width="width"
    top="50px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :visible.sync="isVisible"
  >
    <el-form ref="form" :model="question" :rules="rules" label-position="right" label-width="100px">
      <el-form-item :label="$t('table.question.question')" prop="question">
        <el-input v-model="question.question" type="textarea" />
      </el-form-item>
      <el-form-item :label="$t('table.question.answera')" prop="answera">
        <el-input v-model="question.answera" />
      </el-form-item>
      <el-form-item :label="$t('table.question.answerb')" prop="answerb">
        <el-input v-model="question.answerb" />
      </el-form-item>
      <el-form-item :label="$t('table.question.answerc')" prop="answerc">
        <el-input v-model="question.answerc" />
      </el-form-item>
      <el-form-item :label="$t('table.question.answerd')" prop="answerd">
        <el-input v-model="question.answerd" />
      </el-form-item>
      <el-form-item :label="$t('table.question.rightanswer')" prop="rightanswer">
        <el-select v-model="question.rightanswer" clearable :placeholder="$t('table.question.rightanswer')" value="">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
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

export default {
  name: 'QuestionEdit',
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
      options: [{
        value: 'A',
        label: 'A'
      }, {
        value: 'B',
        label: 'B'
      }, {
        value: 'C',
        label: 'C'
      }, {
        value: 'D',
        label: 'D'
      }],
      question: this.initQuestion(),
      buttonLoading: false,
      screenWidth: 0,
      width: this.initWidth(),
      ptypes: [],
      roles: [],
      rules: {
        question: [
          { required: true, message: this.$t('rules.require'), trigger: 'blur' },
          { min: 5, max: 255, message: this.$t('rules.range5to255'), trigger: 'blur' },
          { validator: (rule, value, callback) => {
            if (!this.question.id) {
              this.$get(`member/question/check/${value}`).then((r) => {
                if (!r.data) {
                  callback(this.$t('rules.questionExist'))
                } else {
                  callback()
                }
              })
            } else {
              callback()
            }
          }, trigger: 'blur' }
        ],
        answera: [
          { required: true, message: this.$t('rules.require'), trigger: 'blur' },
          { min: 1, max: 50, message: this.$t('rules.range1to50'), trigger: 'blur' }
        ],
        answerb: [
          { required: true, message: this.$t('rules.require'), trigger: 'blur' },
          { min: 1, max: 50, message: this.$t('rules.range1to50'), trigger: 'blur' }
        ],
        answerc: [
          { min: 1, max: 50, message: this.$t('rules.range1to50'), trigger: 'blur' }
        ],
        answerd: [
          { min: 1, max: 50, message: this.$t('rules.range1to50'), trigger: 'blur' }
        ],
        rightanswer: [
          { required: true, message: this.$t('rules.require'), trigger: 'blur' },
          { min: 1, max: 1, message: this.$t('rules.range1to1'), trigger: 'blur' }
        ]
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
    window.onresize = () => {
      return (() => {
        this.width = this.initWidth()
      })()
    }
  },
  methods: {
    initQuestion() {
      return {
        id: '',
        question: '',
        answera: '',
        answerb: '',
        answerc: '',
        answerd: '',
        rightanswer: ''
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
    setQuestion(val) {
      this.question = { ...val }
    },
    close() {
      this.$emit('close')
    },
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.buttonLoading = true
          if (!this.question.id) {
            // create
            this.$post('member/question', { ...this.question }).then(() => {
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
            this.$put('member/question', { ...this.question }).then(() => {
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
      this.question = this.initQuestion()
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

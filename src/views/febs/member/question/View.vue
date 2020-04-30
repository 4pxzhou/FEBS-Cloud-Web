<template>
  <el-dialog
    :title="$t('common.view')"
    :width="width"
    :visible.sync="isVisible"
    class="question-view"
  >
    <el-row :gutter="10">
      <div class="view-item">
        <i class="el-icon-edit" /> <span>{{ $t('table.question.question') +'：' }}</span> {{ question.question }}
      </div>
    </el-row>
    <el-row :gutter="10">
      <div class="view-item">
        <i class="el-icon-aim" /> <span>{{ $t('table.question.answera') +'：' }}</span> {{ question.answera }}
      </div>
    </el-row>
    <el-row :gutter="10">
      <div class="view-item">
        <i class="el-icon-aim" /> <span>{{ $t('table.question.answerb') +'：' }}</span> {{ question.answerb }}
      </div>
    </el-row>
    <el-row :gutter="10">
      <div class="view-item">
        <i class="el-icon-aim" /> <span>{{ $t('table.question.answerc') +'：' }}</span> {{ question.answerc }}
      </div>
    </el-row>
    <el-row :gutter="10">
      <div class="view-item">
        <i class="el-icon-aim" /> <span>{{ $t('table.question.answerd') +'：' }}</span> {{ question.answerd }}
      </div>
    </el-row>
    <el-row :gutter="10">
      <div class="view-item">
        <i class="el-icon-key" /> <span>{{ $t('table.question.rightanswer') +'：' }}</span> {{ question.rightanswer }}
      </div>
    </el-row>
  </el-dialog>
</template>
<script>
export default {
  name: 'QuestionView',
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
      question: {}
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
    setQuestion(val) {
      this.question = { ...val }
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>
<style lang="scss" scoped>
  .question-view {
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

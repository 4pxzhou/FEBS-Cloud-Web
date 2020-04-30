<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="queryParams.cellphone" clearable :placeholder="$t('table.member.cellphone')" class="filter-item search-item" />
      <el-button class="filter-item" type="primary" plain @click="search">
        {{ $t('table.search') }}
      </el-button>
    </div>
    <el-table
      ref="table"
      :key="tableKey"
      v-loading="loading"
      :data="list"
      border
      fit
      style="width: 100%;"
      @selection-change="onSelectChange"
      @sort-change="sortChange"
    >
      <el-table-column type="selection" align="centenpmr" width="40px" />
      <el-table-column :label="$t('table.member.cellphone')" min-width="60px" :show-overflow-tooltip="true" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.cellphone }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.member.headimg')" min-width="50px" align="center">
        <template slot-scope="scope">
          <el-avatar
            shape="circle"
            :size="20"
            fit="fit"
            :src="scope.row.headimg"
          />
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.member.nickname')" min-width="50px" :show-overflow-tooltip="true" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.member.name')" min-width="50px" :show-overflow-tooltip="true" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.member.sex')"
        :filters="[{ text: $t('common.sex.male'), value: true }, { text: $t('common.sex.female'), value: false }]"
        :filter-method="filterSex"
        class-name="status-col"
      >
        <template slot-scope="{row}">
          <el-tag :type="row.sex | sexFilter">
            {{ transSex(row.sex) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.member.idcard')" :show-overflow-tooltip="true" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.idcard }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.member.frontcardphoto')" min-width="100px" align="center">
        <template slot-scope="scope">
          <el-avatar
            shape="square"
            :size="20"
            fit="contain"
            :src="scope.row.frontcardphoto"
          />
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.member.height')" :show-overflow-tooltip="true" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.height }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.member.weight')" :show-overflow-tooltip="true" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.weight }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.member.nativeplace')" min-width="50px" :show-overflow-tooltip="true" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.nativeplace }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.member.workcity')" :show-overflow-tooltip="true" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.workcity }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.member.isverify')"
        :filters="[{ text: $t('common.isverify.tobeaudited'), value: 2 }, { text: $t('common.isverify.pass'), value: 1 }, { text: $t('common.isverify.notpass'), value: 0 }]"
        :filter-method="filterVerify"
        :show-overflow-tooltip="true"
        class-name="status-col"
      >
        <template slot-scope="{row}">
          <el-tag :type="row.isverify | verifyFilter">
            {{ transVerify(row.isverify) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.member.isdivorce')"
        :filters="[{ text: $t('common.divorce.yes'), value: true }, { text: $t('common.divorce.no'), value: false }]"
        :filter-method="filterDivorce"
        :show-overflow-tooltip="true"
        class-name="status-col"
      >
        <template slot-scope="{row}">
          <el-tag :type="row.isdivorce | divorceFilter">
            {{ transDivorce(row.isdivorce) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.member.haschildern')"
        :filters="[{ text: $t('common.hasChildern.yes'), value: true }, { text: $t('common.hasChildern.no'), value: false }]"
        :filter-method="filterChildern"
        :show-overflow-tooltip="true"
        class-name="status-col"
      >
        <template slot-scope="{row}">
          <el-tag :type="row.haschildern | childernFilter">
            {{ transChildern(row.haschildern) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.member.hasroom')"
        :show-overflow-tooltip="true"
        :filters="[{ text: $t('common.hasRoom.yes'), value: true }, { text: $t('common.hasRoom.no'), value: false }]"
        :filter-method="filterRoom"
        class-name="status-col"
      >
        <template slot-scope="{row}">
          <el-tag :type="row.hasroom | roomFilter">
            {{ transRoom(row.hasroom) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.member.hascar')"
        :show-overflow-tooltip="true"
        :filters="[{ text: $t('common.hasCar.yes'), value: true }, { text: $t('common.hasCar.no'), value: false }]"
        :filter-method="filterCar"
        class-name="status-col"
      >
        <template slot-scope="{row}">
          <el-tag :type="row.hascar | carFilter">
            {{ transCar(row.hascar) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.member.marryad')" :show-overflow-tooltip="true" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.marryad }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.operation')" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <i v-hasPermission="['member:pass']" class="el-icon-view table-operation" style="color: #2db7f5;" @click="check(row)" />
          <el-link v-has-no-permission="['member:pass']" class="no-perm">
            {{ $t('tips.noPermission') }}
          </el-link>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="pagination.num" :limit.sync="pagination.size" @pagination="fetch" />
    <member-check
      ref="check"
      :dialog-visible="dialog.isVisible"
      :title="dialog.title"
      @success="checkSuccess"
      @close="checkClose"
    />
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import memberCheck from './Check'

export default {
  name: 'MemberCheckList',
  components: { Pagination, memberCheck },
  filters: {
    sexFilter(status) {
      const map = {
        true: 'success',
        false: 'info'
      }
      return map[status]
    },
    verifyFilter(status) {
      const map = {
        1: 'success',
        0: 'info',
        2: 'danger'
      }
      return map[status]
    },
    divorceFilter(status) {
      const map = {
        true: 'success',
        false: 'info'
      }
      return map[status]
    },
    childernFilter(status) {
      const map = {
        true: 'success',
        false: 'info'
      }
      return map[status]
    },
    roomFilter(status) {
      const map = {
        true: 'success',
        false: 'info'
      }
      return map[status]
    },
    carFilter(status) {
      const map = {
        true: 'success',
        false: 'info'
      }
      return map[status]
    }
  },
  data() {
    return {
      dialog: {
        isVisible: false,
        title: ''
      },
      memberViewVisible: false,
      tableKey: 0,
      loading: false,
      list: null,
      total: 0,
      queryParams: {},
      sort: {},
      selection: [],
      pagination: {
        size: 10,
        num: 1
      }
    }
  },
  mounted() {
    this.search()
  },
  methods: {
    transSex(sex) {
      switch (sex) {
        case true:
          return this.$t('common.sex.male')
        case false:
          return this.$t('common.sex.female')
      }
    },
    transVerify(verify) {
      switch (verify) {
        case 0:
          return this.$t('common.isverify.notpass')
        case 1:
          return this.$t('common.isverify.pass')
        default:
          return this.$t('common.isverify.tobeaudited')
      }
    },
    transDivorce(divorce) {
      if (divorce === true) {
        return this.$t('common.divorce.yes')
      } else {
        return this.$t('common.divorce.no')
      }
    },
    transChildern(childern) {
      if (childern === true) {
        return this.$t('common.hasChildern.yes')
      } else {
        return this.$t('common.hasChildern.no')
      }
    },
    transRoom(room) {
      if (room === true) {
        return this.$t('common.hasRoom.yes')
      } else {
        return this.$t('common.hasRoom.no')
      }
    },
    transCar(car) {
      if (car === true) {
        return this.$t('common.hasCar.yes')
      } else {
        return this.$t('common.hasCar.no')
      }
    },
    handlePtype(command) {
      this.queryParams.ptype = command
    },
    filterSex(value, row) {
      return row.sex === value
    },
    filterVerify(value, row) {
      return row.isverify === value
    },
    filterDivorce(value, row) {
      return row.isdivorce === value
    },
    filterChildern(value, row) {
      return row.haschildern === value
    },
    filterRoom(value, row) {
      return row.hasroom === value
    },
    filterCar(value, row) {
      return row.hascar === value
    },
    onSelectChange(selection) {
      this.selection = selection
    },
    checkClose() {
      this.dialog.isVisible = false
    },
    checkSuccess() {
      this.search()
    },
    search() {
      this.fetch({
        ...this.queryParams,
        ...this.sort
      })
    },
    check(row) {
      this.$refs.check.setMember(row)
      this.dialog.title = this.$t('common.check')
      this.dialog.isVisible = true
    },
    fetch(params = {}) {
      params.pageSize = this.pagination.size
      params.pageNum = this.pagination.num
      this.loading = true
      this.$get('member/member/checklist', {
        ...params
      }).then((r) => {
        const data = r.data.data
        this.total = data.total
        this.list = data.rows
        this.loading = false
      })
    },
    sortChange(val) {
      this.sort.field = val.prop
      this.sort.order = val.order
      this.search()
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

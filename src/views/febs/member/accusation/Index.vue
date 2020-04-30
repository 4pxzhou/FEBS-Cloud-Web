<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="queryParams.hmid" clearable :placeholder="$t('table.accusation.mid')" class="filter-item search-item" />
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
      @sort-change="sortChange"
    >
      <el-table-column :label="$t('table.accusation.hmid')" min-width="100px" :show-overflow-tooltip="true" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.hmid }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.accusation.umid')" :show-overflow-tooltip="true" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.umid }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.accusation.hcontact')" min-width="150px" :show-overflow-tooltip="true" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.hcontact }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.accusation.ucontact')" min-width="100px" :show-overflow-tooltip="true" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.ucontact }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.accusation.img1')" :show-overflow-tooltip="true" align="center">
        <template slot-scope="scope">
          <el-avatar shape="square" :size="50" fit="fit" :src="scope.row.img1" />
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.accusation.img2')" :show-overflow-tooltip="true" align="center">
        <template slot-scope="scope">
          <el-avatar shape="square" :size="50" fit="fit" :src="scope.row.img2" />
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.accusation.img3')" :show-overflow-tooltip="true" align="center">
        <template slot-scope="scope">
          <el-avatar shape="square" :size="50" fit="fit" :src="scope.row.img3" />
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.accusation.img4')" :show-overflow-tooltip="true" align="center">
        <template slot-scope="scope">
          <el-avatar shape="square" :size="50" fit="fit" :src="scope.row.img4" />
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.accusation.img5')" :show-overflow-tooltip="true" align="center">
        <template slot-scope="scope">
          <el-avatar shape="square" :size="50" fit="fit" :src="scope.row.img5" />
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.accusation.status')"
        :filters="[{ text: $t('common.accusation.begin'), value: false },{ text: $t('common.accusation.end'), value: true }]"
        :filter-method="filterStatus"
        class-name="status-col"
      >
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ transStatus(row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.operation')" align="center" min-width="150px" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <i v-hasPermission="['accusation:view']" class="el-icon-view table-operation" style="color: #87d068;" @click="view(row)" />
          <el-link v-has-no-permission="['accusation:view']" class="no-perm">
            {{ $t('tips.noPermission') }}
          </el-link>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="pagination.num" :limit.sync="pagination.size" @pagination="fetch" />
    <accusation-view
      ref="view"
      :dialog-visible="accusationViewVisible"
      @close="viewClose"
    />
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import AccusationView from './View'

export default {
  name: 'AccusationList',
  components: { Pagination, AccusationView },
  filters: {
    statusFilter(status) {
      const map = {
        1: 'info',
        0: 'success'
      }
      return map[status]
    }
  },
  data() {
    return {
      accusationViewVisible: false,
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
    transStatus(status) {
      switch (status) {
        case false:
          return this.$t('common.accusation.begin')
        case true:
          return this.$t('common.accusation.end')
      }
    },
    filterStatus(value, row) {
      return row.status === value
    },
    viewClose() {
      this.accusationViewVisible = false
    },
    view(row) {
      this.$refs.view.setAccusation(row)
      this.accusationViewVisible = true
    },
    search() {
      this.fetch({
        ...this.queryParams,
        ...this.sort
      })
    },
    fetch(params = {}) {
      params.pageSize = this.pagination.size
      params.pageNum = this.pagination.num
      this.loading = true
      this.$get('member/accusation/list', {
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

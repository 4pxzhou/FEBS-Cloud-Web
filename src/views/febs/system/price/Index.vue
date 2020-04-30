<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="queryParams.name" clearable :placeholder="$t('table.price.name')" class="filter-item search-item" />
      <el-select slot="prepend" v-model="queryParams.ptype" clearable :placeholder="$t('table.price.ptype')" value="">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button class="filter-item" type="primary" plain @click="search">
        {{ $t('table.search') }}
      </el-button>
      <el-button v-has-permission="['price:add']" class="filter-item" type="success" plain @click="add">
        {{ $t('table.add') }}
      </el-button>
      <el-button v-has-permission="['price:delete']" class="filter-item" type="warning" plain @click="batchDelete">
        {{ $t('table.delete') }}
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
      <el-table-column type="selection" align="center" width="40px" />
      <el-table-column :label="$t('table.price.name')" prop="name" :show-overflow-tooltip="true" align="center" min-width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.price.price')" :show-overflow-tooltip="true" align="center" min-width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.price.ptype')"
        :filters="[{ text: $t('common.ptype.one'), value: 0 }, { text: $t('common.ptype.two'), value: 1 }, { text: $t('common.ptype.three'), value: 2 }]"
        :filter-method="filterPtype"
        class-name="status-col"
      >
        <template slot-scope="{row}">
          <el-tag :type="row.ptype | ptypeFilter">
            {{ transPtype(row.ptype) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.operation')" align="center" min-width="150px" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <i v-hasPermission="['price:view']" class="el-icon-view table-operation" style="color: #87d068;" @click="view(row)" />
          <i v-hasPermission="['price:update']" class="el-icon-setting table-operation" style="color: #2db7f5;" @click="edit(row)" />
          <i v-hasPermission="['price:delete']" class="el-icon-delete table-operation" style="color: #f50;" @click="singleDelete(row)" />
          <el-link v-has-no-permission="['price:view','price:update','price:delete']" class="no-perm">
            {{ $t('tips.noPermission') }}
          </el-link>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="pagination.num" :limit.sync="pagination.size" @pagination="fetch" />
    <price-edit
      ref="edit"
      :dialog-visible="dialog.isVisible"
      :title="dialog.title"
      @success="editSuccess"
      @close="editClose"
    />
    <price-view
      ref="view"
      :dialog-visible="priceViewVisible"
      @close="viewClose"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import priceEdit from './Edit'
import priceView from './View'

export default {
  name: 'PriceManage',
  components: { Pagination, priceEdit, priceView },
  filters: {
    ptypeFilter(status) {
      const map = {
        0: 'success',
        1: 'info',
        2: 'danger'
      }
      return map[status]
    }
  },
  data() {
    return {
      options: [{
        value: '2',
        label: '未知'
      }, {
        value: '1',
        label: '诚信保证金'
      }, {
        value: '0',
        label: '获取联系方式'
      }],
      dialog: {
        isVisible: false,
        title: ''
      },
      priceViewVisible: false,
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
    this.fetch()
  },
  methods: {
    handlePtype(command) {
      this.queryParams.ptype = command
    },
    transPtype(ptype) {
      switch (ptype) {
        case 0:
          return this.$t('common.ptype.one')
        case 1:
          return this.$t('common.ptype.two')
        default:
          return this.$t('common.ptype.three')
      }
    },
    filterPtype(value, row) {
      return row.ptype === value
    },
    viewClose() {
      this.priceViewVisible = false
    },
    editClose() {
      this.dialog.isVisible = false
    },
    editSuccess() {
      this.search()
    },
    onSelectChange(selection) {
      this.selection = selection
    },
    search() {
      this.fetch({
        ...this.queryParams,
        ...this.sort
      })
    },
    reset() {
      this.queryParams = {}
      this.sort = {}
      this.$refs.table.clearSort()
      this.$refs.table.clearFilter()
      this.search()
    },
    add() {
      this.dialog.title = this.$t('common.add')
      this.dialog.isVisible = true
    },
    update() {
      if (!this.selection.length) {
        this.$message({
          message: this.$t('tips.noDataSelected'),
          type: 'warning'
        })
        return
      }
      this.then(() => {
        const priceNames = []
        this.selection.forEach((u) => {
          priceNames.push(u.name)
        })
      }).catch(() => {
        this.clearSelections()
      })
    },
    singleDelete(row) {
      this.$refs.table.toggleRowSelection(row, true)
      this.batchDelete()
    },
    batchDelete() {
      if (!this.selection.length) {
        this.$message({
          message: this.$t('tips.noDataSelected'),
          type: 'warning'
        })
        return
      }
      this.$confirm(this.$t('tips.confirmDelete'), this.$t('common.tips'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        const ids = []
        this.selection.forEach((p) => {
          ids.push(p.id)
        })
        this.delete(ids)
      }).catch(() => {
        this.clearSelections()
      })
    },
    clearSelections() {
      this.$refs.table.clearSelection()
    },
    delete(priceIds) {
      this.loading = true
      this.$delete(`system/price/${priceIds}`).then(() => {
        this.$message({
          message: this.$t('tips.deleteSuccess'),
          type: 'success'
        })
        this.search()
      })
    },
    view(row) {
      this.$refs.view.setPrice(row)
      this.priceViewVisible = true
    },
    edit(row) {
      this.$refs.edit.setPrice(row)
      this.dialog.title = this.$t('common.edit')
      this.dialog.isVisible = true
    },
    fetch(params = {}) {
      params.pageSize = this.pagination.size
      params.pageNum = this.pagination.num
      this.loading = true
      this.$get('system/price', {
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

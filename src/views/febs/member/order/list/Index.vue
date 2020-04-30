<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select slot="prepend" v-model="queryParams.paytype" clearable :placeholder="$t('table.order.paytype')" value="">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-input v-model="queryParams.orderid" clearable :placeholder="$t('table.order.orderid')" class="filter-item search-item" />
      <el-input v-model="queryParams.mid" clearable :placeholder="$t('table.order.mid')" class="filter-item search-item" />
      <el-select slot="prepend" v-model="queryParams.otype" clearable :placeholder="$t('table.order.otype')" value="">
        <el-option
          v-for="item in optionsotype"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select slot="prepend" v-model="queryParams.status" clearable :placeholder="$t('table.order.status')" value="">
        <el-option
          v-for="item in optionsstatus"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
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
      <el-table-column
        :label="$t('table.order.paytype')"
        :filters="[{ text: $t('common.paytype.wechat'), value: false }, { text: $t('common.paytype.zfb'), value: true }]"
        :filter-method="filterPaytype"
        class-name="status-col"
      >
        <template slot-scope="{row}">
          <el-tag :type="row.paytype | paytypeFilter">
            {{ transPaytype(row.paytype) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.order.orderid')" :show-overflow-tooltip="true" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.orderid }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.order.mid')" :show-overflow-tooltip="true" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.mid }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.order.price')" :show-overflow-tooltip="true" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.order.otype')"
        :filters="[{ text: $t('common.otype.getinfo'), value: 0 }, { text: $t('common.otype.credit'), value: 1 }]"
        :filter-method="filterOtype"
        class-name="status-col"
      >
        <template slot-scope="{row}">
          <el-tag :type="row.otype | otypeFilter">
            {{ transOtype(row.otype) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.order.status')"
        :filters="[{ text: $t('common.ostatus.unpaid'), value: 0 }, { text: $t('common.ostatus.paid'), value: 1 }, { text: $t('common.ostatus.refunded'), value: 2 }, { text: $t('common.ostatus.cancelled'), value: 3 }]"
        :filter-method="filterOStatus"
        class-name="status-col"
      >
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ transOStatus(row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.order.paytime')" :show-overflow-tooltip="true" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.paytime }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="pagination.num" :limit.sync="pagination.size" @pagination="fetch" />
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'

export default {
  name: 'OrderList',
  components: { Pagination },
  filters: {
    paytypeFilter(status) {
      const map = {
        true: 'success',
        false: 'info'
      }
      return map[status]
    },
    otypeFilter(status) {
      const map = {
        0: 'success',
        1: 'info'
      }
      return map[status]
    },
    statusFilter(status) {
      const map = {
        1: 'success',
        0: 'info',
        2: 'warn',
        3: 'danger'
      }
      return map[status]
    }
  },
  data() {
    return {
      options: [{
        value: 0,
        label: '微信'
      }, {
        value: 1,
        label: '支付宝'
      }],
      optionsotype: [{
        value: 1,
        label: '诚信保证金'
      }, {
        value: 0,
        label: '获取个人信息费'
      }],
      optionsstatus: [{
        value: 0,
        label: '未支付'
      }, {
        value: 1,
        label: '已支付'
      }, {
        value: 2,
        label: '已退款'
      }, {
        value: 3,
        label: '已取消'
      }],
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
    transPaytype(paytype) {
      switch (paytype) {
        case true:
          return this.$t('common.paytype.zfb')
        case false:
          return this.$t('common.paytype.wechat')
      }
    },
    transOtype(status) {
      if (status === 1) {
        return this.$t('common.otype.credit')
      } else {
        return this.$t('common.otype.getinfo')
      }
    },
    transOStatus(status) {
      switch (status) {
        case 0:
          return this.$t('common.ostatus.unpaid')
        case 1:
          return this.$t('common.ostatus.paid')
        case 2:
          return this.$t('common.ostatus.refunded')
        default:
          return this.$t('common.ostatus.cancelled')
      }
    },
    filterPaytype(value, row) {
      return row.paytype === value
    },
    filterOtype(value, row) {
      return row.otype === value
    },
    filterOStatus(value, row) {
      return row.status === value
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
      this.$get('member/order/list', {
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

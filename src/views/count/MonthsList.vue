<template>
  <div>
    <a-form :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-row>
        <a-col :span="8">
          <a-form-item label="月份">
           <a-range-picker v-model:value="form.dateRange" format="YYYY/MM" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="类型">
            <a-radio-group v-model:value="form.typeVal">
              <a-radio value="1">收入</a-radio>
              <a-radio value="2">支出</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-button type="primary" @click="query">查询</a-button>
        </a-col>
      </a-row>
    </a-form>
     <a-table
      bordered
      :row-key="record => record.dataIndex"
      :columns="tHead"
      :data-source="tData"
      :loading="isLoad">
       <template #action="{}">
        <a-button type="link" size="small" @click="goDetail">详情</a-button>
      </template>
     </a-table>
  </div>
</template>
<script lang="ts">
import { TableState } from 'ant-design-vue/es/table/interface'
import { defineComponent, reactive, UnwrapRef, ref, computed } from 'vue'
// import { usePagination } from 'vue-request'

const tHead = [
  {
    dataIndex: 'dateRange',
    title: '月份'
  },
  {
    dataIndex: 'typeVal',
    title: '类型'
  },
  {
    dataIndex: 'money',
    title: '金额'
  },
  {
    dataIndex: 'action',
    title: '操作',
    slots: { customRender: 'action' }
  }
]

type Pagination = TableState['pagination']
interface FormState {
  dateRange: string[];
  typeVal: string;
}
type APIParams = {
  results: number;
  page?: number;
};
type APIResult = {
  results: {
    date: number;
    type: string;
  }[];
}

// const queryData = (params: APIParams) => {
//   return `https://randomuser.me/api?noinfo&${new URLSearchParams(params)}`
// }

export default defineComponent({
  name: 'countList',
  setup() {
    const form: UnwrapRef<FormState> = reactive({
      dateRange: [],
      typeVal: ''
    })

    const tData = reactive([
      {
        dateRange: '2021-01',
        typeVal: '收入',
        money: 1000
      },
      {
        dateRange: '2021-02',
        typeVal: '支出',
        money: 2000
      }
    ])
    const isLoad = ref(false)
    const current = ref(1)
    const pageSize = ref(10)

    // const { data: tData, run, loading: isLoad, current, pageSize } = usePagination<APIResult>(
    //   queryData,
    //   {
    //     formatResult: res => res.results,
    //     pagination: {
    //       currentKey: 'page',
    //       pageSizeKey: 'results'
    //     }
    //   }
    // )

    const pagination = computed(() => ({
      total: 200,
      current: current.value,
      pageSize: pageSize.value
    }))

    const goDetail = () => {
      console.log('去详情')
    }
    const query = (pag: Pagination) => {
      isLoad.value = true
      console.log('查询')
      run({
        results: pag!.pageSize!,
        page: pag?.current
      })
      isLoad.value = false
    }
    const run = (params: APIParams) => {
      console.log(params)
    }

    return {
      labelCol: { style: { width: '80px' } },
      wrapperCol: { span: 14 },
      form,
      tHead,
      tData,
      isLoad,
      pagination,

      query,
      goDetail
    }
  }
})
</script>

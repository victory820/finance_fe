<template>
  <div>
    <a-form :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-row>
        <a-col :span="8">
          <a-form-item label="日期">
           <a-date-picker v-model:value="form.date" format="YYYY/MM/DD" />
          </a-form-item>
        </a-col>
        <a-col :span="8">

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
        <a-button type="link" size="small" @click="goDetail">修改</a-button>
        <a-button type="link" size="small" @click="goDetail" danger>删除</a-button>
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
    dataIndex: 'date',
    title: '日期'
  },
  {
    dataIndex: 'profit',
    title: '收入'
  },
  {
    dataIndex: 'expend',
    title: '支出'
  },
  {
    dataIndex: 'action',
    title: '操作',
    slots: { customRender: 'action' }
  }
]

type Pagination = TableState['pagination']
interface FormState {
  date: string;
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
  name: 'dateList',
  setup() {
    const form: UnwrapRef<FormState> = reactive({
      date: ''
    })

    const tData = reactive([
      {
        date: '2021-09-29',
        profit: 300,
        expend: 100
      },
      {
        date: '2021-09-30',
        profit: 500,
        expend: 200
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

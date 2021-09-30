<template>
  <a-form
    ref="formRef"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-item label="日期" name="date">
      <a-date-picker
        v-model:value="form.date"
        type="date"
        placeholder="请选择日期"
        style="width: 100%"
      />
    </a-form-item>
    <a-form-item label="收入住宿费" name="profits">
      <a-input-number v-model:value="form.profits" :min="0" />
    </a-form-item>
    <a-form-item label="支出类型" name="expendType">
      <a-input v-model:value="form.expendType" />
    </a-form-item>
    <a-form-item label="支出金额" name="expendMoney">
      <a-input-number v-model:value="form.expendMoney" :min="0" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit" :loading="cantSave">保存</a-button>
      <a-button class="ml10" @click="resetForm">重置</a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface'
import { Moment } from 'moment'
import { defineComponent, reactive, ref, toRaw, UnwrapRef } from 'vue'

interface FormState {
  date: Moment | null;
  profits: number[];
  expends: number[];
  other: number;
}
export default defineComponent({
  name: 'dateCreate',
  setup() {
    const formRef = ref()
    const form: UnwrapRef<FormState> = reactive({
      date: null,
      profits: [],
      expends: [],
      other: 0
    })
    const rules = {
      date: [{ required: true, message: '请选择日期', trigger: 'change', type: 'object' }]
    }
    const cantSave = ref(false)

    const onSubmit = () => {
      formRef.value
        .validate()
        .then(() => {
          cantSave.value = true
          console.log('values', form, toRaw(form))
          cantSave.value = false
        })
        .catch((error: ValidateErrorEntity<FormState>) => {
          console.log('error', error)
        })
    }
    const resetForm = () => {
      formRef.value.resetFields()
    }

    return {
      formRef,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: '',
      form,
      rules,
      cantSave,

      onSubmit,
      resetForm
    }
  }
})
</script>

<template>
  <a-layout style="height: 100%;" class="layout-box">
    <a-layout-sider
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      @collapse="onCollapse">
      <div class="logo" />
      <a-menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys">
        <a-menu-item key="monthList">
          <router-link to="/monthlist">
            <user-outlined />
            <span>总账单列表</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="dateList">
          <router-link to="/datelist">
            <user-outlined />
            <span>单月列表</span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '15px 10px', padding: '10px', background: '#fff' }"
      >
        <router-view style="height: 100%; overflow: auto;"></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import {
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons-vue'
import { defineComponent, ref } from 'vue'
export default defineComponent({
  components: {
    UserOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined
  },
  setup() {
    const onCollapse = (collapsed: boolean, type: string) => {
      console.log(collapsed, type)
    }

    return {
      selectedKeys: ref<string[]>(['']),
      collapsed: ref<boolean>(false),

      onCollapse
    }
  }
})
</script>
<style>
.layout-box .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.layout-box .trigger:hover {
  color: #1890ff;
}

.layout-box .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

</style>

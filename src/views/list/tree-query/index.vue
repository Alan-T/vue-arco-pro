<template>
  <div class="container">
    <div class="sider"></div>
    <div class="main">
      <div class="header">
        <div style="height: 60px"> </div>
      </div>
      <div class="content">
        <div style="height: 1200px"> </div>
      </div>
      <div class="footer"></div>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'TreeQuery',
  };
</script>

<style lang="less" scoped>
  .container {
    padding: 16px 0px 0 20px;
    height: 100%;
    display: flex;
    .sider {
      width: 210px;
      height: 100%;
      background-color: var(--color-bg-2);
      border-radius: 4px;
      margin-right: 10px;
    }
    .main {
      flex: 1;
      display: grid;
      grid-template-rows: minmax(min-content, min-content) auto 60px;
      row-gap: 10px;
      padding-right: 20px;
      height: 100%;
      overflow: auto;
      .header {
        background-color: var(--color-bg-2);
        border-radius: 4px;
      }
      .content {
        background-color: var(--color-bg-2);
        border-radius: 4px;
      }
      .footer {
        background-color: var(--color-bg-2);
        border-radius: 4px;
      }
    }
  }
</style>

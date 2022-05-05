<template>
  <div class="container">
    <div class="header">
      <div style="height: 60px"> </div>
    </div>
    <div class="content">
      <div style="height: 1200px"> </div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'BaseQuery',
  };
</script>

<style lang="less" scoped>
  .container {
    padding: 16px 20px 0 20px;
    display: grid;
    grid-template-rows: minmax(min-content, min-content) auto 60px;
    row-gap: 10px;
    height: 100%;
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
</style>

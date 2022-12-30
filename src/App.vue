<template>
  <div class="comment__container">
    <div class="wrapper">
      <div class="comment__list">
        <ListComment />
      </div>
    </div>
  </div>
</template>

<script setup>
import ListComment from "@/components/ListComment/ListComment.vue";
</script>

<style lang="scss" scoped>
.comment__list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>

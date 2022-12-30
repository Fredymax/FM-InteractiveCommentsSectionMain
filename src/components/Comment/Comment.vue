<template>
  <div class="comment">
    <CommentLike :commentId="comment.id" :likes="comment.score"></CommentLike>
    <CommentInformation v-bind:="comment"></CommentInformation>
    <CommentActions
      :commentId="comment.id"
      :isAuth="comment.userId == Auth.id"
      :is-edit="comment.isEdit"
    ></CommentActions>
  </div>
  <ReplyComment :comment-id="comment.id" v-if="comment.isReply" :reply-to-user-id="comment.userId" />
</template>

<script setup>
import ReplyComment from "@/components/ReplyComment/ReplyComment.vue";
import CommentLike from "@/components/CommentLike/CommentLike.vue";
import CommentInformation from "@/components/CommentInformation/CommentInformation.vue";
import CommentActions from "@/components/CommentActions/CommentActions.vue";
import { toRefs } from "vue";
import useUsers from "@/composables/useUsers";

const props = defineProps({ comment: Object });
const { comment } = toRefs(props);

const { Auth } = useUsers();
</script>

<style src="./comment.scss" lang="scss" scoped></style>
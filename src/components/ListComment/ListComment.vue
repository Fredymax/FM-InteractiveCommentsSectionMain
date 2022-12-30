<template>
  <template v-for="comment in comments">
    <Comment
      v-if="!comment.replyingToCommentId"
      :key="`comment-id-${comment.id}`"
      :comment="comment ?? {}"
    />
    <template v-if="!!comment.replies.length">
      <div :key="`container-comment-id-${comment.id}`" class="comment__replies">
        <Comment
          v-for="commentReply in comment.replies"
          :comment="renderCommentById(commentReply) ?? {}"
          :key="`comment-id-${commentReply}`"
        />
      </div>
    </template>
  </template>
  <ReplyComment />
</template>

<script setup>
import ReplyComment from "@/components/ReplyComment/ReplyComment.vue";
import Comment from "@/components/Comment/Comment.vue";
import useComments from "@/composables/useComments";

const { comments, getCommentById } = useComments();
const renderCommentById = (id) => getCommentById(id);
</script>

<style lang="scss" src="./ListComment.scss"></style>
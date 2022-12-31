<template>
  <div class="reply">
    <figure class="user__avatar">
      <img :src="avatar" class="user__photo" alt="..." />
    </figure>
    <div class="user__reply">
      <textarea v-model="comment" placeholder="Reply to the comment"></textarea>
    </div>
    <div class="user__action">
      <button @click="saveComment()" :disabled="disabled">{{ commentId ? "REPLY" : "SEND" }}</button>
    </div>
  </div>
</template>

<script setup>
import useUsers from "@/composables/useUsers";
import useComments from "@/composables/useComments";
import { toRefs, watchEffect, onMounted, ref, inject, watch } from "vue";
import { getAvatar } from "@/utils";
const Swal = inject("$swal");

const props = defineProps({
  commentId: {
    type: Number,
    default: null,
  },
  replyToUserId: {
    type: Number,
    default: null,
  },
});

const { commentId, replyToUserId } = toRefs(props);
const { Auth, getUserById } = useUsers();
const { storeComment } = useComments();
const avatar = ref("");
const disabled = ref(true);
const comment = ref("");

onMounted(() => {
  const replyTo = getUserById(replyToUserId.value);
  if (replyTo) {
    comment.value = `@${replyTo.username} `;
  }
});

watchEffect(() => {
  avatar.value = getAvatar(Auth?.image?.png);
});

watch(comment, (newValue) => {
  disabled.value = newValue.length == 0;
});

function saveComment() {
  const content = comment.value;
  storeComment({ content, replies: [] }, commentId.value, commentId.value);
  Swal.fire({
    icon: "success",
    title: "Good",
    text: "Published comment",
    showConfirmButton: true,
    confirmButtonText: "Continue",
  });
  comment.value = "";
}
</script>

<style src="./ReplyComment.scss" lang="scss" scoped></style>
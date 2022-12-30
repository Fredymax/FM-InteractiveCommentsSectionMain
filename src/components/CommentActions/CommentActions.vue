<template>
  <div class="comment__actions">
    <template v-if="!isEdit">
      <template v-if="isAuth">
        <button class="button button__outline-danger" @click="removeHandleClick()">
          <TrashIcon />
          <span>Delete</span>
        </button>
        <button class="button button__outline-primary" @click="editHandleClick()">
          <EditIcon />
          <span>Edit</span>
        </button>
      </template>
      <template v-else>
        <button class="button button__outline-primary" @click="replyHandleClick()">
          <svg class="icon-reply" width="14" height="13" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
              fill="#5357B6"
            />
          </svg>
          <span>Reply</span>
        </button>
      </template>
    </template>
  </div>
</template>

<script setup>
import TrashIcon from "@/Icons/TrashIcon.vue";
import EditIcon from "@/Icons/EditIcon.vue";
import useComments from "@/composables/useComments";
import { toRefs, inject } from "vue";
const Swal = inject("$swal");

const props = defineProps({
  isAuth: Boolean,
  isEdit: Boolean,
  commentId: [Number, String],
});

const { isAuth, commentId, isEdit } = toRefs(props);
const { destroyComment, activeReplyComment, activeEditComment } = useComments();

async function removeHandleClick() {
  const { isConfirmed } = await Swal.fire({
    title: "Are you sure?",
    text:
      "Are you sure you want to delete this comment? This will remove the comment and can't be undone",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#EE6368",
    cancelButtonColor: "#68727E",
    confirmButtonText: "YES, DELETE",
    cancelButtonText: "NO, CANCEL",
    reverseButtons: true,
  });
  if (!isConfirmed) return;
  destroyComment(commentId.value);
  Swal.fire({
    icon: "success",
    title: "Deleted!",
    text: "Your comment has been deleted.",
    confirmButtonText: "Continue",
  });
}

function replyHandleClick() {
  activeReplyComment(commentId.value);
}

function editHandleClick() {
  activeEditComment(commentId.value);
}
</script>

<style src="./CommentActions.scss" lang="scss" scoped></style>
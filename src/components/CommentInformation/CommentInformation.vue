<template>
  <div class="comment__information">
    <div class="user">
      <div class="user__information">
        <figure class="user__avatar">
          <img :src="renderAvatar(user?.image?.png)" class="user__photo" :alt="user?.username" />
        </figure>
        <strong class="user__name">{{ user?.username }}</strong>
        <span v-if="Auth.id === user?.id" class="user__you">You</span>
        <span class="user__date">{{ createdAt }}</span>
      </div>
      <template v-if="Auth.id === user?.id && isEdit">
        <CommentUpdate :comment-id="id" :content="content" />
      </template>
      <template v-else>
        <p class="user__comment" v-html="transformContent(content)"></p>
      </template>
    </div>
  </div>
</template>

<script setup>
import { toRefs, computed } from "vue";
import CommentUpdate from "@/components/CommentUpdate/CommentUpdate.vue";
import useUsers from "@/composables/useUsers";
import { getAvatar } from "@/utils";

const props = defineProps({
  id: [Number, String],
  content: String,
  createdAt: String,
  userId: Number,
  replies: Array,
  isEdit: Boolean,
});

const { id, content, createdAt, userId, isEdit } = toRefs(props);

const { getUserById, Auth } = useUsers();
const user = computed(() => getUserById(userId.value));

const renderAvatar = (nameAvatar) => getAvatar(nameAvatar);

function transformContent(content = "") {
  if (content.length == 0) return content;
  let regex = /(@+[\w]+)/g;
  let regex2 = new RegExp(regex, "g");
  let newContent = content.replace(regex2, (match) => `<span>${match}</span>`);
  return newContent;
}
</script>

<style src="./CommentInformation.scss" lang="scss"></style>
<template>
  <textarea class="user__comment" v-model="comment"></textarea>
  <button :disabled="disabled" @click="handleClick()">Update</button>
</template>

<script setup>
import { toRefs, ref, onMounted, watch } from "vue";
import useComments from "@/composables/useComments";
const { updateComment } = useComments();

const props = defineProps({
  commentId: [Number, String],
  content: String,
});
const { commentId, content } = toRefs(props);

const comment = ref("");
onMounted(() => {
  comment.value = content.value;
});

const disabled = ref(true);
watch(comment, (newValue) => {
  disabled.value = newValue.length === 0;
});

function handleClick() {
  const formData = {
    id: commentId.value,
    content: comment.value,
  };
  updateComment(formData);
}
</script>
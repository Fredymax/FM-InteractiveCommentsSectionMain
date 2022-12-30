import commentsJson from "@/data/comments.json";
import useUsers from "@/composables/useUsers";
import { reactive } from "vue";
import { v4 as uuidv4 } from "uuid";
import { getLikes } from "@/utils";

const comments = reactive([...commentsJson]);
const { Auth } = useUsers();

export default function useComments() {
  function getCommentById(commentId) {
    const comment = comments.find((comment) => comment.id === commentId);
    return comment;
  }

  function storeComment(formData, commentId, replyingToCommentId) {
    const comment = {
      id: uuidv4(),
      score: getLikes(),
      createdAt: "just now",
      userId: Auth.id,
      replyingToCommentId: replyingToCommentId ?? null,
      isReply: false,
      isEdit: false,
      ...formData,
    };
    comments.push(comment);
    if (!commentId) return comment;
    updateRepliesComment(commentId, comment.id);
    return comment;
  }

  function updateRepliesComment(commentId, newCommentId) {
    const { comment, index } = getCommentWithIndex(commentId);
    comment.replies.push(newCommentId);
    comment.isReply = false;
    comments.splice(index, 1, comment);
  }

  function activeEditComment(commentId) {
    const { comment, index } = getCommentWithIndex(commentId);
    comments.splice(index, 1, {
      ...comment,
      isEdit: true,
    });
  }

  function getCommentWithIndex(commentId) {
    const comment = comments.find((comment) => comment.id == commentId);
    const index = comments.findIndex((comment) => comment.id == commentId);
    return { comment, index };
  }

  function setLike(commentId, score) {
    let comment, index;
    for (let i = 0; i < comments.length; i++) {
      let currentComment = comments[i];
      if (currentComment.id !== commentId) continue;
      comment = currentComment;
      index = i;
    }
    comment.score = score;
    comments.splice(index, 1, comment);
  }

  const destroyComment = (commentId) => {
    const { comment, index } = getCommentWithIndex(commentId);
    if (comment.replyingToCommentId) {
      const { comment: parentComment, index: parentIndex } = getCommentWithIndex(comment.replyingToCommentId);
      let commentIds = [...parentComment.replies];
      let newIndex = commentIds.findIndex((id) => id == commentId);
      commentIds.splice(newIndex, 1);
      console.log(commentIds);
      parentComment.replies = commentIds;
      console.log(parentComment.replies);
      comments.splice(parentIndex, 1, parentComment);
    }
    comments.splice(index, 1);
  };

  function activeReplyComment(commentId) {
    let comment = getCommentById(commentId);
    let index = comments.findIndex((comment) => comment.id === commentId);
    comments.splice(index, 1, {
      ...comment,
      isReply: !comment.isReply,
    });
  }

  function updateComment({ id, content }) {
    const { comment, index } = getCommentWithIndex(id);
    comments.splice(index, 1, {
      ...comment,
      isEdit: false,
      content,
    });
  }

  return {
    comments,
    getCommentById,
    storeComment,
    setLike,
    destroyComment,
    activeReplyComment,
    activeEditComment,
    updateComment,
  };
}

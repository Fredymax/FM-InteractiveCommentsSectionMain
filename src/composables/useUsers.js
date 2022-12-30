import { reactive } from "vue";
import Users from "@/data/users";

const Auth = reactive({
  id: 1,
  image: {
    png: "image-juliusomo.png",
    webp: "image-juliusomo.webp",
  },
  username: "juliusomo",
});
const users = reactive(Users);

export default function useUsers() {
  const getUserById = (id) => {
    const user = users.find((user) => user.id === id);
    return user;
  };

  return { Auth, users, getUserById };
}

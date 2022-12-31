export const getNumberRandom = () => {
  return Math.floor(Math.random() * 20);
};

export const getLikes = () => getNumberRandom();

export const getAvatar = (nameAvatar) => {
  let pathname = `../assets/images/avatars/${nameAvatar}`;
  return new URL(pathname, import.meta.url).href;
};

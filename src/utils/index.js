export const getNumberRandom = () => {
  return Math.floor(Math.random() * 20);
};

export const getLikes = () => getNumberRandom();

export const getAvatar = (nameAvatar) => {
  const pathname = `../assets/images/avatars/${nameAvatar}`;
  const urlImage = new URL(pathname, import.meta.url);
  return urlImage.href;
};

export const getNumberRandom = () => {
  return Math.floor(Math.random() * 20);
};

export const getLikes = () => getNumberRandom();

export const getAvatar = (nameAvatar) => {
  if (!nameAvatar) return null;
  let pathname = `/src/assets/images/avatars/${nameAvatar}`;
  let urlImage = new URL(pathname, import.meta.url);
  return urlImage.href;
};

export const getNumberRandom = () => {
  return Math.floor(Math.random() * 20);
};

export const getLikes = () => getNumberRandom();

export const getAvatar = (nameAvatar) => {
  const path = `/src/assets/images/avatars/${nameAvatar}`;
  return new URL(path, import.meta.url).href;
};

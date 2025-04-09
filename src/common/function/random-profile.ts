export const generateProfileImageByGender = (gender): string => {
  const randomId = Math.floor(Math.random() * 100);
  return `https://randomuser.me/api/portraits/${gender}/${randomId}.jpg`;
};

// baar-bar login na krna pade, jb kholo local storage se utha kr de de

export const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

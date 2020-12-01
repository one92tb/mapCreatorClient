import decode from 'jwt-decode';

export const authAdmin = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return false;
  }

  try {
    const { userData } = decode(token);
    if (userData.isAdmin === false) {
      return false;
    }
  } catch (e) {
    return false;
  }

  return true;
};
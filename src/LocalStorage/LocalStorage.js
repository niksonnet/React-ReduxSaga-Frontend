
export const setUser = user => {
  localStorage.setItem("user", JSON.stringify(user));
}

export const getUser = key => {
  return JSON.parse(localStorage.getItem(key));
}

export const deleteLocalStorage = key => {
  localStorage.removeItem(key);
}

export const clearLocalStorage = () => {
  // warning : removing all the localStorage items
  localStorage.clear();
}


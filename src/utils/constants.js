// const API_ROOT = "http://codeial.codingninjas.com:8000/api/v2";
const API_ROOT = "http://localhost:3001/api/v1";

// doc url - https://www.notion.so/aakashcn/Codeial-API-docs-3a4d0b5a42c54f0a94d951a42aabc13f
export const API_URLS = {
  login: () => `${API_ROOT}/users/login`,
  signup: () => `${API_ROOT}/users/register`,
  posts: (page, limit) => `${API_ROOT}/posts?page=${page}&limit=${limit}`,
  editUser: () => `${API_ROOT}/users/edit-profile`,
  userInfo: (userId) => `${API_ROOT}/users/profile/${userId}`,
  // friends: () => `${API_ROOT}/friendship/friends`,
  getUser: () => `${API_ROOT}/users/getUser`,
  createFriendship: (userId) =>
    `${API_ROOT}/friendship/create-friendship?user_id=${userId}`,
  removeFriendship: (userId) =>
    `${API_ROOT}/friendship/remove-friendship?user_id=${userId}`,

  createPost: (content) => `${API_ROOT}/posts/create`,
  toggleLike: (itemId, itemType) =>
    `${API_ROOT}/likes/toggle?likeable_id=${itemId}&likeable_type=${itemType}`, // itemType is 'Post'/'Comment'
  getLikes: (itemId, itemType) =>
    `${API_ROOT}/likes?likeable_id=${itemId}&likeable_type=${itemType}`,
  comment: () => `${API_ROOT}/comments`, // POST - create, GET - list of comments
  deleteComment: (commentId) => `${API_ROOT}/comments?comment_id=${commentId}`,
  searchUsers: (searchText) => `${API_ROOT}/users/search?text=${searchText}`,
};

export const LOCALSTORAGE_TOKEN = "access_token";

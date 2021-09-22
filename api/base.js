import axios from "axios";

const apiURL =
  process.env.NODE_ENV == "production"
    ? "https://next-ics.herokuapp.com"
    : "http://localhost:1337";

export const signup = async (payload) => {
  try {
    return await axios.post(`${apiURL}/auth/local/register`, payload);
  } catch (err) {
    throw err;
  }
};

export const login = async (payload) => {
  try {
    const res = await axios.post(`${apiURL}/auth/local`, payload);
    if (res.status === 200) {
      sessionStorage.setItem("auth", res.data.jwt);
      sessionStorage.setItem("user", JSON.stringify(res.data.user));
      return res;
    }
  } catch (err) {
    throw err;
  }
};

export const get_all_comments = async cid => {
  try {
    return await axios.get(`${apiURL}/comments?author.id=${cid}`);
  } catch (err) {
    throw err;
  }
};

export const add_comment = async (payload) => {
  try {
    return await axios.post(`${apiURL}/comments`, payload);
  } catch (err) {
    throw err;
  }
};

export const change_password = async (payload) => {
  try {
    return await axios.post(`${apiURL}/change-password`, payload);
  } catch (err) {
    throw err;
  }
};

export const update_user = async (user_id, payload) => {
  try {
    return await axios.put(`${apiURL}/users/${user_id}`, payload);
  } catch (err) {
    throw err;
  }
};

export const delete_user = async (user_id) => {
  try {
    return await axios.delete(`${apiURL}/users/${user_id}`);
  } catch (err) {
    throw err;
  }
};

export const delete_student = async (student_id) => {
  try {
      return await axios.delete(`${apiURL}/students/${student_id}`)
  } catch (err) {
    throw err;
  }
};

export const get_my_details = async () => {
  try {
    return await axios.get(`${apiURL}/users/me`)
  } catch (err) {
    throw err
  }
}

export const get_particular_student = async profile_id => {
  try {
    return await axios.get(`${apiURL}/students?profile.id=${profile_id}`)
  } catch (err) {
    throw err
  }
}

export const new_parent_announcement = async announcement => {
  try {
    return await axios.post(`${apiURL}/parentnotifications`, announcement)
  } catch (err) {
    throw err
  }
}

export const get_assignments_for_class = async class_id => {
  try {
    return await axios.get(`${apiURL}/assignments?class.id=${class_id}`)
  } catch (err) {
    throw err
  }
}
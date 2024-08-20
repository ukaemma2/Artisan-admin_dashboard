import axios from "axios";
import cookie from "cookie";
export const baseUrl = "https://xzcmpu3xj9.us-east-2.awsapprunner.com";

//Replace sessionStorage with cookies
export function parseCookies(req) {
  let user;
  if (req.headers.cookie) {
    user = cookie.parse(req.headers.cookie).user;
    user = JSON.parse(user);
    return user;
  }
}

export const post = async (data, url) => {
  const response = await axios.post(url, data).catch((err) => err.response);

  return response.data;
};

export const UNAUTHENTICATED_RESPONSE = {
  redirect: {
    destination: "/admin/authModal",
    permanent: false,
  },
};

export const authAxios = (cookie) =>
  axios.create({
    baseURL: baseUrl,
    headers: {
      authorization: `Bearer ${cookie.token}`,
    },
  });

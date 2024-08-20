import axios from 'axios';
import Cookies from 'cookies';
import { baseUrl } from '../../utility/apihelp';

export default async (req, res) => {
  const cookies = new Cookies(req, res);
  const loginParams = {
    email: req.body.email,
    password: req.body.password,
  };

  return axios
    .post(`${baseUrl}/auth/admin/login`, loginParams )
    .then((response) => {
      if (response.data.status === 'success') {
        cookies.set('jwt', response.data.token, {
          httpOnly: true,
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
          sameSite: 'lax',
        });

        return res.status(200).json({
          status: 'success', 
        });
      }

      return res.status(409).json({
        stadus: 'fail'
      });
    })
    .catch((err) => {
      return res.status(401).json({
        status: 'fail',
        message: err.response,
      });
    });
};

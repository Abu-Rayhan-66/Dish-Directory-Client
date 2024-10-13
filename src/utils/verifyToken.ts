import { jwtDecode } from 'jwt-decode';

type IJwt = {
  id: string,
  role: string,
  iat: number,
  exp: number
}

export const verifyToken = (token: string): IJwt => {
  return jwtDecode<IJwt>(token); 
};
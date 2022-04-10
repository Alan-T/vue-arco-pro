import axios from 'axios';
import type { RouteRecordRaw } from 'vue-router';

export interface LoginData {
  username: string;
  password: string;
}

export function getRoutesInfo() {
  return axios.post<RouteRecordRaw[]>('/api/user/route');
}

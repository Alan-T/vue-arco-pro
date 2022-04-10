import { createPinia } from 'pinia';
import useAppStore from './modules/app';
import useUserStore from './modules/user';
import useTabBarStore from './modules/tab-bar';
import useMemuStore from './modules/menu';

const pinia = createPinia();

export { useAppStore, useUserStore, useTabBarStore, useMemuStore };
export default pinia;

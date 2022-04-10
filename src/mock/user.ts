import Mock from 'mockjs';
import setupMock, {
  successResponseWrap,
  failResponseWrap,
} from '@/utils/setup-mock';

import { MockParams } from '@/types/mock';
import { isLogin } from '@/utils/auth';

setupMock({
  setup() {
    // Mock.XHR.prototype.withCredentials = true;

    // 用户信息
    Mock.mock(new RegExp('/api/user/info'), () => {
      if (isLogin()) {
        const role = window.localStorage.getItem('userRole') || 'admin';
        return successResponseWrap({
          name: '王立群',
          avatar:
            '//lf1-xgcdn-tos.pstatp.com/obj/vcloud/vadmin/start.8e0e4855ee346a46ccff8ff3e24db27b.png',
          email: 'wangliqun@email.com',
          job: 'frontend',
          jobName: '前端艺术家',
          organization: 'Frontend',
          organizationName: '前端',
          location: 'beijing',
          locationName: '北京',
          introduction: '人潇洒，性温存',
          personalWebsite: 'https://www.arco.design',
          phone: '150****0000',
          registrationDate: '2013-05-10 12:10:00',
          accountId: '15012312300',
          certification: 1,
          role,
        });
      }
      return failResponseWrap(null, '未登录', 50008);
    });

    // 用户菜单
    Mock.mock(new RegExp('/api/user/route'), () => {
      if (isLogin()) {
        return successResponseWrap([
          {
            path: 'dashboard',
            name: 'dashboard',
            component: '/dashboard/index',
            meta: {
              locale: 'menu.dashboard',
              requiresAuth: true,
              icon: 'icon-dashboard',
              order: 0,
            },
            children: [
              {
                path: 'workplace',
                name: 'Workplace',
                component: '/dashboard/workplace/index',
                meta: {
                  locale: 'menu.dashboard.workplace',
                  requiresAuth: true,
                  roles: ['*'],
                },
              },
            ],
          },
          {
            path: 'home',
            name: 'home',
            component: '/home/index',
            meta: {
              locale: '首页',
              requiresAuth: true,
              icon: 'icon-home',
              roles: ['*'],
              order: 1,
            },
          },
          {
            path: 'settings',
            name: 'settings',
            component: '/settings/index',
            meta: {
              locale: '设置中心',
              requiresAuth: true,
              icon: 'icon-settings',
              order: 2,
            },
            children: [
              {
                path: 'personal',
                name: 'personal',
                component: '/settings/personal/index',
                meta: {
                  locale: '个人信息',
                  requiresAuth: true,
                  roles: ['*'],
                },
              },
            ],
          },
          {
            path: 'system',
            name: 'system',
            component: '/system/index',
            meta: {
              locale: '系统设置',
              requiresAuth: true,
              icon: 'icon-settings',
              order: 3,
            },
            children: [
              {
                path: 'user',
                name: 'user',
                component: '/system/user/index',
                meta: {
                  locale: '用户信息',
                  requiresAuth: true,
                  roles: ['*'],
                },
              },
              {
                path: 'log',
                name: 'log',
                component: '/system/log/index',
                meta: {
                  locale: '日志',
                  requiresAuth: true,
                  roles: ['*'],
                },
                children: [
                  {
                    path: 'apilog',
                    name: 'apilog',
                    component: '/system/log/api/index',
                    meta: {
                      locale: 'api日志',
                      requiresAuth: true,
                      roles: ['*'],
                    },
                  },
                ],
              },
            ],
          },
        ]);
      }
      return failResponseWrap(null, '未登录', 50008);
    });

    // 登录
    Mock.mock(new RegExp('/api/user/login'), (params: MockParams) => {
      const { username, password } = JSON.parse(params.body);
      if (!username) {
        return failResponseWrap(null, '用户名不能为空', 50000);
      }
      if (!password) {
        return failResponseWrap(null, '密码不能为空', 50000);
      }
      if (username === 'admin' && password === 'admin') {
        window.localStorage.setItem('userRole', 'admin');
        return successResponseWrap({
          token: '12345',
        });
      }
      if (username === 'user' && password === 'user') {
        window.localStorage.setItem('userRole', 'user');
        return successResponseWrap({
          token: '54321',
        });
      }
      return failResponseWrap(null, '账号或者密码错误', 50000);
    });
    // 登出
    Mock.mock(new RegExp('/api/user/logout'), () => {
      return successResponseWrap(null);
    });
  },
});

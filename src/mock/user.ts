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
          name: 'Alan',
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
            path: 'list',
            name: 'list',
            component: '/list/index',
            meta: {
              locale: '列表页',
              requiresAuth: true,
              icon: 'icon-settings',
              order: 2,
            },
            children: [
              {
                path: 'base-query',
                name: 'base-query',
                component: '/list/base-query/index',
                meta: {
                  locale: '基础查询',
                  requiresAuth: true,
                  roles: ['*'],
                },
              },
              {
                path: 'tree-query',
                name: 'tree-query',
                component: '/list/tree-query/index',
                meta: {
                  locale: '树级查询',
                  requiresAuth: true,
                  roles: ['*'],
                },
              },
            ],
          },
          {
            path: 'first',
            name: 'first',
            component: '/first/index',
            meta: {
              locale: '一级导航',
              requiresAuth: true,
              icon: 'icon-settings',
              order: 3,
            },
            children: [
              {
                path: 'second',
                name: 'second',
                component: '/first/second/index',
                meta: {
                  locale: '二级导航',
                  requiresAuth: true,
                  icon: 'icon-settings',
                  roles: ['*'],
                },
                children: [
                  {
                    path: 'third',
                    name: 'third',
                    component: '/first/second/third/index',
                    meta: {
                      locale: '三级导航',
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

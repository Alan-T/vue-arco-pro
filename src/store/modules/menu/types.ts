export interface RouteRecord {
  path: string;
  name: string;
  component: string;
  meta: {
    locale: string;
    requiresAuth: boolean;
    icon: string;
    roles: string[];
    order: number;
  };
}

export interface MenuState {
  routeList: RouteRecord[];
}

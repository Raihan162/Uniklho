import MainLayout from '@layouts/MainLayout';
import AdminLayout from '@layouts/AdminLayout';

import Home from '@pages/Home';
import Login from '@pages/Login';
import NotFound from '@pages/NotFound';
import Dashboard from '@pages/Admin/Dashboard';
import Product from '@pages/Admin/Product';
import Category from '@pages/Admin/Category';
import Transaction from '@pages/Admin/Transaction';
import User from '@pages/Admin/User';
import Register from '@pages/Register';

const routes = [
  {
    path: '/',
    name: 'Home',
    protected: false,
    component: Home,
    layout: MainLayout,
  },
  {
    path: '/login',
    name: 'Login',
    protected: false,
    component: Login,
    layout: MainLayout,
  },
  {
    path: '/register',
    name: 'Register',
    protected: false,
    component: Register,
    layout: MainLayout,
  },
  {
    path: '/admin/dashboard',
    name: 'Admin Dashboard',
    protected: true,
    component: Dashboard,
    layout: AdminLayout,
  },
  {
    path: '/admin/product',
    name: 'Admin Product',
    protected: true,
    component: Product,
    layout: AdminLayout,
  },
  {
    path: '/admin/category',
    name: 'Admin Category',
    protected: true,
    component: Category,
    layout: AdminLayout,
  },
  {
    path: '/admin/transaction',
    name: 'Admin Transaction',
    protected: true,
    component: Transaction,
    layout: AdminLayout,
  },
  {
    path: '/admin/user',
    name: 'Admin User',
    protected: true,
    component: User,
    layout: AdminLayout,
  },
  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout, protected: false },
];

export default routes;

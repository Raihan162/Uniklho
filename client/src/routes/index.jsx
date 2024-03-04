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
import ProductDetail from '@pages/ProductDetail';
import Cart from '@pages/Cart';
import Checkout from '@pages/Checkout';
import MyOrder from '@pages/MyOrder';
import Wishlist from '@pages/Wishlist';
import Profile from '@pages/Profile';

const routes = [
  {
    path: '/',
    name: 'Home',
    protected: false,
    component: Home,
    layout: MainLayout,
  },
  {
    path: '/product/detail/:id',
    name: 'Product Detail',
    protected: false,
    component: ProductDetail,
    layout: MainLayout,
  },
  {
    path: '/cart',
    name: 'Cart',
    protected: false,
    component: Cart,
    layout: MainLayout,
  },
  {
    path: '/checkout',
    name: 'Checkout',
    protected: false,
    component: Checkout,
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
    path: '/my-order',
    name: 'My Order',
    protected: false,
    component: MyOrder,
    layout: MainLayout,
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    protected: false,
    component: Wishlist,
    layout: MainLayout,
  },
  {
    path: '/profile',
    name: 'Profile',
    protected: false,
    component: Profile,
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

import DashboardIcon from '@material-ui/icons/Dashboard';
import Dashboard from './views/Dashboard/Dashboard.js';
import LoginPage from './views/Pages/LoginPage';
import RecoverPassword from './views/Pages/RecoverPassword';
import RegisterPage from './views/Pages/RegisterPage';
import Wizard from './views/Forms/Wizard.js';

import UserProfile from './views/Pages/UserProfile.js';

const dashRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: DashboardIcon,
    component: Dashboard,
    layout: '/admin',
    sidebar: true,
  },
  {
    path: '/login-page',
    name: 'Login Page',
    mini: 'L',
    component: LoginPage,
    layout: '/auth',
    sidebar: false,
  },
  {
    path: '/recover-password-page',
    name: 'Recover Password',
    mini: 'R',
    component: RecoverPassword,
    layout: '/auth',
    sidebar: false,
  },
  {
    path: '/register-page',
    name: 'Register Page',
    mini: 'R',
    component: RegisterPage,
    layout: '/auth',
    sidebar: false,
  },
  {
    path: '/user-page',
    name: 'User Profile',
    mini: 'UP',
    component: UserProfile,
    layout: '/admin',
  },
  {
    path: '/wizard',
    name: 'Wizard',
    mini: 'W',
    component: Wizard,
    layout: '/auth',
  },
];
export default dashRoutes;

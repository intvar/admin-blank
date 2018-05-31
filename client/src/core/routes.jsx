import React from 'react';
import EventLog from '../event_logs/containers/event_log';
import { Users, UserEditor } from '../user/';
import { Admins, AdminEditor } from '../admins';
import SignIn from '../auth/sign_in_form';
import ForgotPassword from '../auth/forgot_password_form';
import RecoveryPasswordForm from '../auth/recovery_password_form';
import ChangePasswordForm from '../auth/change_password_form';

export default [
  {
    path: '/signin',
    component: SignIn,
    isPrivate: false,
  },
  {
    path: '/forgot_password',
    component: ForgotPassword,
    isPrivate: false,
  },
  {
    path: '/recovery_password/:verify_pass_code',
    component: RecoveryPasswordForm,
    isPrivate: false,
  },
  {
    path: '/change_password',
    component: ChangePasswordForm,
    isPrivate: true,
    title: () => <div>Change password</div>,
  },
  {
    path: '/event-log',
    component: EventLog,
    isPrivate: true,
    title: () => <div>Events</div>,
  },
  {
    path: '/users/:id',
    component: UserEditor,
    isPrivate: true,
    title: () => <div>Users</div>,
  },
  {
    path: '/users',
    component: Users,
    isPrivate: true,
    title: () => <div>Users</div>,
  },
  {
    path: '/admins/add',
    component: AdminEditor,
    isPrivate: true,
    title: () => <div>Admins</div>,
  },
  {
    path: '/admins/:id',
    component: AdminEditor,
    isPrivate: true,
    title: () => <div>Admins</div>,
  },
  {
    path: '/admins',
    component: Admins,
    isPrivate: true,
    title: () => <div>Admins</div>,
  },
];

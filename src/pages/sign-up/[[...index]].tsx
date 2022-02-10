import { NextPageWithLayout } from 'next';
import React, { ReactElement } from 'react';
import AuthenticationLayout from '@/features/authentication/AuthenticationLayout';
import SignUp from '@/features/authentication/SignUp';

const SignUpPage: NextPageWithLayout = () => <SignUp />;

SignUpPage.getLayout = (page: ReactElement) => (
  <AuthenticationLayout signUp>{page}</AuthenticationLayout>
);

export default SignUpPage;

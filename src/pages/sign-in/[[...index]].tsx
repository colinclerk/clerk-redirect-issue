import { NextPageWithLayout } from 'next';
import React, { ReactElement } from 'react';
import AuthenticationLayout from '@/features/authentication/AuthenticationLayout';
import SignIn from '@/features/authentication/SignIn';

const SignInPage: NextPageWithLayout = () => <SignIn />

SignInPage.getLayout = (page: ReactElement) => <AuthenticationLayout>{page}</AuthenticationLayout>;

export default SignInPage;

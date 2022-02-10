import { NextPage } from 'next';
import { AuthenticateWithRedirectCallback } from '@clerk/nextjs';
import React from 'react';

const SocialLoginCallbackPage: NextPage = () => <AuthenticateWithRedirectCallback />;

export default SocialLoginCallbackPage;

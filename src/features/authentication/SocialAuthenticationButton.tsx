import React, { useEffect, useState } from 'react';
import { useSignIn, useSignUp } from '@clerk/nextjs';
import type { OAuthStrategy, OAuthProvider } from '@clerk/types';
import { useRouter } from 'next/router';

const socialIcons: Partial<Record<OAuthProvider, JSX.IntrinsicElements['svg']>> = {
  discord: {
    viewBox: '0 0 24 24',
    href: 'M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z',
  },
  twitter: {
    viewBox: '0 0 20 20',
    href: 'M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84',
  },
  google: {
    viewBox: '0 0 488 512',
    href: 'M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z',
  },
};

type SocialLoginButtonProps = {
  provider: OAuthProvider;
  signUp?: true;
};

const SocialAuthenticationButton: React.VFC<SocialLoginButtonProps> = ({ provider, signUp }) => {
  const { authenticateWithRedirect: signInWithRedirect } = useSignIn();
  const { authenticateWithRedirect: signUpWithRedirect } = useSignUp();
  const authenticateWithRedirect = signUp ? signUpWithRedirect : signInWithRedirect;

  const router = useRouter();
  const [requestedUrl, setRequestedUrl] = useState('');

  useEffect(() => {
    if (router.isReady && router.query.redirect_url) {
      setRequestedUrl(router.query.redirect_url as string);
    }
  }, [router.isReady, router.query]);

  const authenticate = () => {
    const strategy: OAuthStrategy = `oauth_${provider}`;

    return authenticateWithRedirect({
      strategy,
      redirectUrl: '/social-login-callback',
      redirectUrlComplete: requestedUrl || '/',
    });
  };

  return (
    <button
      type="button"
      onClick={() => authenticate()}
      className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
    >
      <span className="sr-only">Sign up with Discord</span>
      <svg
        className="h-5 w-5"
        aria-hidden="true"
        fill="currentColor"
        viewBox={socialIcons[provider]?.viewBox}
      >
        <path d={socialIcons[provider]?.href} />
      </svg>
    </button>
  );
};

export default SocialAuthenticationButton;

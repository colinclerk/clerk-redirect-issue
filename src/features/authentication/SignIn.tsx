import React, { FormEventHandler, useState } from 'react';
import { useRouter } from 'next/router';
import { useClerk, useMagicLink, useSignIn } from '@clerk/nextjs';
import type { EmailLinkFactor } from '@clerk/types/dist/signIn';
import { MailIcon } from '@heroicons/react/outline';
import Divider from '@/features/common/Divider';
import SocialAuthenticationButton from './SocialAuthenticationButton';
import MagicLinkExpired from './MagicLinkExpired';
import EmailVerified from './EmailVerified';
import MagicLinkStarted from './MagicLinkStarted';

const SignIn: React.VFC = () => {
  const [emailAddress, setEmailAddress] = useState('');
  const [signInWithMagicLinkStarted, setSignInWithMagicLinkStarted] = useState(false);
  const [magicLinkExpired, setMagicLinkExpired] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  const router = useRouter();
  const { setSession } = useClerk();
  const signIn = useSignIn();

  const { startMagicLinkFlow } = useMagicLink(signIn);

  const executeMagicLinkFlow = async () => {
    setMagicLinkExpired(false);
    setEmailVerified(false);

    // Start the sign-in flow
    const signInResource = await signIn.create({ identifier: emailAddress });
    const { email_address_id: emailAddressId } = signInResource.supportedFirstFactors.find(
      (firstFactor) =>
        firstFactor.strategy === 'email_link' && firstFactor.safe_identifier === emailAddress
    ) as EmailLinkFactor;

    // Start the magic link flow.
    // Pass your app URL that users will be navigated
    // when they click the magic link from their
    // email inbox.
    const updatedSignIn = await startMagicLinkFlow({
      emailAddressId,
      redirectUrl: `${process.env.NEXT_PUBLIC_SITE_URL_ORIGIN}/verify-magic-link`,
    });

    // Check the email verification result.
    const verification = updatedSignIn.firstFactorVerification;
    if (verification.verifiedFromTheSameClient()) {
      setEmailVerified(true);
      return;
    }
    if (verification.status === 'expired') {
      setMagicLinkExpired(true);
    }

    // When email is verified from a different client
    if (updatedSignIn.status === 'complete') {
      // Sign in is complete, we have a session.
      // Navigate to the after sign in URL.
      setSession(updatedSignIn.createdSessionId, () => router.push('/'));
    }
  };

  const signInWithMagicLink = async () => {
    setSignInWithMagicLinkStarted(true);

    // Change URL path to allow the user to return to the sign-in form
    router.beforePopState(() => {
      setSignInWithMagicLinkStarted(false);
      return true;
    });
    router.push('/sign-in?verify=email-address', undefined, { shallow: true });

    executeMagicLinkFlow();
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (formEvent) => {
    formEvent.preventDefault();
    signInWithMagicLink();
  };

  if (magicLinkExpired) {
    return <MagicLinkExpired resendMagicLink={executeMagicLinkFlow} />;
  }

  if (emailVerified) {
    return <EmailVerified />;
  }

  if (signInWithMagicLinkStarted) {
    return <MagicLinkStarted emailAddress={emailAddress} resendMagicLink={executeMagicLinkFlow} />;
  }

  return (
    <>
      <div>
        <p className="text-sm font-medium text-gray-700">Sign in with</p>

        <div className="mt-1 grid grid-cols-3 gap-3">
          <SocialAuthenticationButton provider="google" />
          <SocialAuthenticationButton provider="twitter" />
          <SocialAuthenticationButton provider="discord" />
        </div>
      </div>

      <Divider label="Or continue with" className="mt-6" />

      <div className="mt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MailIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={emailAddress}
                  onChange={(event) => setEmailAddress(event.target.value)}
                  required
                  placeholder="you@example.com"
                  className="block w-full rounded-md border-gray-300 pl-10 focus:border-brand focus:ring-brand sm:text-sm"
                />
              </div>
            </label>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-brand py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-brand focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignIn;

import React, { FormEventHandler, useState } from 'react';
import { useRouter } from 'next/router';
import { useClerk, useMagicLink, useSignUp } from '@clerk/nextjs';
import { MailIcon } from '@heroicons/react/outline';
import Divider from '@/features/common/Divider';
import SocialAuthenticationButton from './SocialAuthenticationButton';
import MagicLinkExpired from './MagicLinkExpired';
import EmailVerified from './EmailVerified';
import MagicLinkStarted from './MagicLinkStarted';

const SignUp: React.VFC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');

  const [signUpWithMagicLinkStarted, setSignUpWithMagicLinkStarted] = useState(false);
  const [magicLinkExpired, setMagicLinkExpired] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  const router = useRouter();
  const { setSession } = useClerk();
  const signUp = useSignUp();

  const { startMagicLinkFlow } = useMagicLink(signUp);

  const executeMagicLinkFlow = async () => {
    setMagicLinkExpired(false);
    setEmailVerified(false);

    // Start the magic link flow.
    // Pass your app URL that users will be navigated
    // when they click the magic link from their
    // email inbox.
    const updatedSignUp = await startMagicLinkFlow({
      redirectUrl: `${process.env.NEXT_PUBLIC_SITE_URL_ORIGIN}/verify-magic-link`,
    });

    // Check the email verification result.
    const verification = updatedSignUp.verifications.emailAddress;
    if (verification.verifiedFromTheSameClient()) {
      setEmailVerified(true);
      return;
    }
    if (verification.status === 'expired') {
      setMagicLinkExpired(true);
    }

    // When email is verified from a different client
    if (updatedSignUp.status === 'complete') {
      // Sign up is complete, we have a session.
      // Navigate to the after sign up URL.
      setSession(updatedSignUp.createdSessionId, () => router.push('/'));
    }
  };

  const signUpWithMagicLink = async () => {
    setSignUpWithMagicLinkStarted(true);

    // Change URL path to allow the user to return to the sign up form
    router.beforePopState(() => {
      setSignUpWithMagicLinkStarted(false);
      return true;
    });
    router.push('/sign-up?verify=email-address', undefined, { shallow: true });

    // Start the sign up flow
    await signUp.create({ firstName, lastName, emailAddress });
    executeMagicLinkFlow();
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (formEvent) => {
    formEvent.preventDefault();
    signUpWithMagicLink();
  };

  if (magicLinkExpired) return <MagicLinkExpired resendMagicLink={executeMagicLinkFlow} />;
  if (emailVerified) return <EmailVerified />;

  if (signUpWithMagicLinkStarted) {
    return <MagicLinkStarted emailAddress={emailAddress} resendMagicLink={executeMagicLinkFlow} />;
  }

  return (
    <>
      <div>
        <p className="text-sm font-medium text-gray-700">Sign up with</p>

        <div className="mt-1 grid grid-cols-3 gap-3">
          <SocialAuthenticationButton signUp provider="google" />
          <SocialAuthenticationButton signUp provider="twitter" />
          <SocialAuthenticationButton signUp provider="discord" />
        </div>
      </div>

      <Divider label="Or continue with" className="mt-6" />

      <div className="mt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                First name
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  value={firstName}
                  placeholder="Jane"
                  onChange={(event) => setFirstName(event.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand focus:ring-brand sm:text-sm"
                />
              </label>
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                Last name
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  value={lastName}
                  placeholder="Doe"
                  onChange={(event) => setLastName(event.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand focus:ring-brand sm:text-sm"
                />
              </label>
            </div>
          </div>

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
              Sign up
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;

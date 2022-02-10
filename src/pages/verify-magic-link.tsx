import { NextPage } from 'next';
import { isMagicLinkError, MagicLinkErrorCode, useClerk } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import Spinner from '@/features/common/Spinner';

const VerifyMagicLinkPage: NextPage = () => {
  const [verificationStatus, setVerificationStatus] = useState('loading');

  const { handleMagicLinkVerification } = useClerk();

  useEffect(() => {
    async function verify() {
      try {
        await handleMagicLinkVerification({
          redirectUrl: '/',
          redirectUrlComplete: '/',
        });
        // If we're not redirected at this point, it means
        // that the flow has completed on another device.
        setVerificationStatus('verified');
      } catch (error) {
        // Verification has failed.
        let status = 'failed';
        if (isMagicLinkError(error) && error.code === MagicLinkErrorCode.Expired) {
          status = 'expired';
        }
        setVerificationStatus(status);
      }
    }
    verify();
  }, [handleMagicLinkVerification]);

  if (verificationStatus === 'loading') {
    return (
      <div className="h-96">
        <Spinner />
      </div>
    );
  }

  if (verificationStatus === 'failed') {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <span className="text-lg font-medium leading-6 text-gray-900">
          Magic link verification failed
        </span>
      </div>
    );
  }

  if (verificationStatus === 'expired') {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <span className="text-lg font-medium leading-6 text-gray-900">Magic link expired</span>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <span className="text-lg font-medium leading-6 text-gray-900">
        Successfully signed in. Return to the original tab to continue.
      </span>
    </div>
  );
};

export default VerifyMagicLinkPage;

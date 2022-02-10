import React from 'react';
import { SwitchHorizontalIcon } from '@heroicons/react/outline';

const EmailVerified: React.VFC = () => (
  <>
    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
      <SwitchHorizontalIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
    </div>
    <div className="mt-3 text-center sm:mt-5">
      <h3 className="text-lg font-medium leading-6 text-gray-900">Signed in on other tab</h3>
      <div className="mt-5 text-sm text-gray-500">
        <p>Switch to the tab opened by the magic link to continue.</p>
        <p className="mt-4">You may close this tab.</p>
      </div>
    </div>
  </>
);

export default EmailVerified;

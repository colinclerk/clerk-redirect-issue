import React from 'react';
import { ExclamationCircleIcon, MailIcon } from '@heroicons/react/outline';

type MagicLinkExpiredProps = {
  resendMagicLink: () => Promise<void>;
};

const MagicLinkExpired: React.VFC<MagicLinkExpiredProps> = ({ resendMagicLink }) => (
  <>
    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
      <ExclamationCircleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
    </div>
    <div className="mt-3 text-center sm:mt-5">
      <h3 className="text-lg font-medium leading-6 text-gray-900">Magic link has expired</h3>
      <div className="mt-5 text-sm text-gray-500">
        <p>Send a new one, or go back and select another method to continue.</p>
      </div>
    </div>
    <div className="mt-3 text-center sm:mt-6">
      <button
        type="button"
        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
        onClick={() => resendMagicLink()}
      >
        Resend magic link
        <MailIcon className="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  </>
);

export default MagicLinkExpired;

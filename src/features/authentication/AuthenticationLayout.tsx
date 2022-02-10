import Link from 'next/link';

type AuthenticationLayoutProps = {
  signUp?: true;
};

const AuthenticationLayout: React.FC<AuthenticationLayoutProps> = ({ children, signUp }) => (
  <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {signUp ? 'Sign up' : 'Sign in to your account'}
      </h1>
      <p className="mt-2 text-center text-sm text-gray-600">
        Or{' '}
        <Link href={signUp ? '/sign-in' : '/sign-up'}>
          <a className="font-medium text-brand-600 hover:text-brand-500">
            {signUp ? 'Sign in' : 'Sign up'}
          </a>
        </Link>
      </p>
    </div>
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <main className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">{children}</main>
    </div>
  </div>
);

export default AuthenticationLayout;

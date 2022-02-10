import classNames from '@/features/common/utils/classNames';

type SpinnerProps = {
  small?: true;
};

const Spinner: React.VFC<SpinnerProps> = ({ small }) => (
  <div className="flex h-full items-center justify-center">
    <svg
      className={classNames(small ? 'h-4 w-4' : 'h-7 w-7', 'animate-spin text-brand')}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  </div>
);

export default Spinner;
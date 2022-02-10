import React from 'react';
import classNames from '@/features/common/utils/classNames';

type DividerProps = {
  label?: string;
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
  color?: string;
};

const Divider: React.VFC<DividerProps> = ({ label, className, color }) => (
  <div className={classNames('relative', className)}>
    <div className="absolute inset-0 flex items-center" aria-hidden="true">
      <div
        className={classNames('w-full border-t', color ? `border-${color}` : 'border-gray-300')}
      />
    </div>
    <div className="relative flex justify-center">
      {label ? <span className="bg-white px-2 text-sm text-gray-500">{label}</span> : undefined}
    </div>
  </div>
);

export default Divider;

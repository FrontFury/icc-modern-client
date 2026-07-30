
export default function CustomLoader({ variant = 'spinner', size = 'md', label = 'Loading...' }) {

  const sizeClasses = {
    sm: 'w-5 h-5 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  const dotSizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 p-4">
      {/* 1. Spinner Variant */}
      {variant === 'spinner' && (
        <div className={`relative ${sizeClasses[size]}`}>
          <div className="w-full h-full border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
        </div>
      )}

      {/* 2. Pulsing Dots Variant */}
      {variant === 'dots' && (
        <div className="flex items-center gap-1.5">
          <span className={`${dotSizes[size]} bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.3s]`} />
          <span className={`${dotSizes[size]} bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.15s]`} />
          <span className={`${dotSizes[size]} bg-indigo-600 rounded-full animate-bounce`} />
        </div>
      )}

      {/* 3. Progress Bar Variant */}
      {variant === 'bar' && (
        <div className="w-48 h-2 bg-indigo-100 rounded-full overflow-hidden relative">
          <div className="h-full bg-indigo-600 rounded-full animate-[pulse_1.5s_ease-in-out_infinite] w-full origin-left scale-x-50" />
        </div>
      )}

      {label && (
        <span className="text-gray-600 font-medium tracking-wide animate-pulse">
          {label}
        </span>
      )}
    </div>
  );
}
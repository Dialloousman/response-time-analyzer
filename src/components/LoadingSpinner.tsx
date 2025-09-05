/**
 * Props for the loading spinner component.
 * Controls spinner size and optional loading text display.
 */
interface LoadingSpinnerProps {
  /** Size variant of the spinner */
  size?: "sm" | "md" | "lg";
  /** Optional text to display below the spinner */
  text?: string;
}

/**
 * Displays a customizable loading spinner with optional text.
 * Supports different sizes and can show loading messages to users.
 */
export function LoadingSpinner({ size = "md", text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-gray-300 border-t-blue-600`}
      />
      {text && (
        <p className={`text-gray-600 ${textSizeClasses[size]}`}>{text}</p>
      )}
    </div>
  );
}

export function Button({ children, className = "", variant = "default", ...props }) {
  const base = "px-4 py-2 rounded text-sm font-medium transition";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
    outline: "border border-gray-300 text-gray-800 hover:bg-gray-50",
    destructive: "bg-red-600 text-white hover:bg-red-700",
  };
  return (
    <button className={`${base} ${variants[variant] || ""} ${className}`} {...props}>
      {children}
    </button>
  );
}

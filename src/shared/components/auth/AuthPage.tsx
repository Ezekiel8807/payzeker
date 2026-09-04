type AuthPageProps = {
  children: React.ReactNode;
  className?: string;
};

export default function AuthPage({ children, className = "" }: AuthPageProps) {
  return (
    <div className={`flex items-center justify-center bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        {children}
      </div>
    </div>
  );
}

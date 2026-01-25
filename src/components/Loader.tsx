export default function PageLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full bg-gray-300 rounded-3xl p-8 shadow-inner">
      <div className="relative flex items-center justify-center">
        <div className="absolute animate-ping h-16 w-16 rounded-full bg-main opacity-20"></div>

        <div className="h-12 w-12 border-4 border-t-main border-r-transparent border-b-gray-400 border-l-transparent rounded-full animate-spin"></div>
      </div>

      <div className="mt-6 flex flex-col items-center gap-2">
        <span className="text-main font-bold tracking-widest uppercase text-sm animate-pulse">
          Loading...
        </span>
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-main rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-main rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-main rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}

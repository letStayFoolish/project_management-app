import { Hourglass } from "lucide-react";

function LoadingDots() {
  return (
    <div className="fixed inset-0 flex w-full flex-1 items-center justify-center space-x-2 bg-white dark:bg-dark-bg">
      <span className="sr-only">Loading...</span>
      <div className="mr-12 flex items-center text-lg font-semibold md:text-base">
        <Hourglass className="animate-rotate" />
        <span className="ml-2 hidden font-bold md:block lg:text-xl">
          Loading
        </span>
        <span className="sr-only">Loading...</span>
      </div>
      <div className="h-8 w-8 animate-bounce rounded-full bg-dark-bg [animation-delay:-0.3s] dark:bg-white"></div>
      <div className="h-8 w-8 animate-bounce rounded-full bg-dark-bg [animation-delay:-0.15s] dark:bg-white"></div>
      <div className="h-8 w-8 animate-bounce rounded-full bg-dark-bg dark:bg-white"></div>
    </div>
  );
}

export default LoadingDots;

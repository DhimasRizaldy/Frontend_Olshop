const Preloader = () => {
  return (
    <div
      x-show="loaded"
      x-init="window.addEventListener('DOMContentLoaded', () => {setTimeout(() => loaded = false, 500)})"
      className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-white z-999999">
      <div className="w-16 h-16 border-4 border-solid rounded-full animate-spin border-primary border-t-transparent"></div>
    </div>
  );
};

export default Preloader;

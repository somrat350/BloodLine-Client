const Loading = () => {
  return (
    <div className="w-full py-20 flex flex-col gap-2 justify-center items-center">
      <div className="flex items-center text-4xl font-bold gap-3 text-secondary">
        <span>L</span>
        <div className="w-8 h-8 border-[6px] border-gray-400 border-y-secondary rounded-full animate-spin duration-1000"></div>
        <span>A</span>
        <span>D</span>
        <span>I</span>
        <span>N</span>
        <span>G</span>
        <span className="loading loading-dots loading-xl"></span>
      </div>
    </div>
  );
};

export default Loading;

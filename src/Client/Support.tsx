const Support = () => {
  return (
    <div className="relative w-full h-full overflow-y-auto bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 flex items-center justify-center px-4">
      {/* Background Visuals */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-16 right-20 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Support Card */}
      <div className="relative  w-[70%] max-md:w-[90%] max-w-3xl bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl shadow-lg shadow-blue-500/10 p-8 max-md:p-6 text-gray-200 space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold text-white">
            HexaGuard Trading Platform
          </h1>
          <p className="text-gray-400 text-sm max-md:text-xs">
            For inquiries, suggestions or complaints, reach out via email
          </p>
          <p className="text-blue-400 underline underline-offset-4 cursor-pointer hover:text-blue-300 transition text-base max-md:text-sm">
            support@hexaguard.com
          </p>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            className="w-full h-40 bg-white/10 text-white p-3 rounded-lg border border-white/20 outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            placeholder="Type your message here..."
          ></textarea>
          <button className="w-full h-12 bg-blue-600 hover:bg-blue-500 transition text-white font-semibold rounded-lg">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Support;

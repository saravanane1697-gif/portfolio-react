function Footer() {
  return (
    <footer className="border-t border-white/10 bg-gray-950 py-8 mt-20">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()}{" "}
          <span className="text-gray-300 font-medium">Saravanan Elangovan</span>
          . All Rights Reserved.
        </p>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Built with React & ASP.NET Core
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

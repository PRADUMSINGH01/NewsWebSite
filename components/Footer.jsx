// app/components/Footer.jsx

// Reusable Icon component for social media links
const SocialIcon = ({ href, path }) => (
  <a
    href={href}
    className="text-slate-400 hover:text-blue-400 transition-colors"
  >
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d={path} />
    </svg>
  </a>
);

export default function Footer() {
  const categories = [
    { name: "खेल", href: "#" },
    { name: "राजनीति", href: "#" },
    { name: "मनोरंजन", href: "#" },
    { name: "व्यापार", href: "#" },
    { name: "तकनीक", href: "#" },
  ];

  const companyLinks = [
    { name: "हमारे बारे में", href: "#" },
    { name: "संपर्क करें", href: "#" },
    { name: "करियर", href: "#" },
    { name: "गोपनीयता नीति", href: "#" },
  ];

  const socialIcons = [
    {
      href: "#",
      path: "M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 2.9,4.79C2.53,5.42 2.33,6.16 2.33,6.94C2.33,8.43 3.1,9.75 4.18,10.53C3.47,10.51 2.82,10.31 2.26,10V10.06C2.26,12.2 3.78,13.95 5.8,14.34C5.45,14.43 5.08,14.48 4.7,14.48C4.42,14.48 4.15,14.45 3.89,14.4C4.45,16.18 6.09,17.43 8.08,17.47C6.56,18.63 4.69,19.34 2.67,19.34C2.32,19.34 1.98,19.32 1.64,19.28C3.65,20.55 6.01,21.33 8.58,21.33C16,21.33 20.32,14.97 20.32,9.65C20.32,9.47 20.32,9.3 20.31,9.12C21.1,8.55 21.85,7.82 22.46,6Z",
    },
    {
      href: "#",
      path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163m0-1.001c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98C15.668 1.175 15.259 1.162 12 1.162zM12 7.163c-2.705 0-4.887 2.182-4.887 4.887s2.182 4.887 4.887 4.887 4.887-2.182 4.887-4.887-2.182-4.887-4.887-4.887zm0 7.773c-1.595 0-2.887-1.292-2.887-2.887s1.292-2.887 2.887-2.887 2.887 1.292 2.887 2.887-1.292 2.887-2.887 2.887zm4.965-6.417c-.777 0-1.408.631-1.408 1.408s.631 1.408 1.408 1.408 1.408-.631 1.408-1.408-.631-1.408-1.408-1.408z",
    },
    {
      href: "#",
      path: "M20.9,2H3.1C2.5,2,2,2.5,2,3.1v17.8C2,21.5,2.5,22,3.1,22h9.58v-7.7H9.89V11.5h2.79V9.4c0-2.75,1.65-4.25,4.13-4.25C17.91,5.15,18.5,5.25,18.5,5.25v2.6h-1.5c-1.33,0-1.59,0.63-1.59,1.56V11.5h2.95l-0.38,2.8H15.42V22h5.48c0.6,0,1.1-0.5,1.1-1.1V3.1C22,2.5,21.5,2,20.9,2z",
    },
  ];

  return (
    <footer className="bg-slate-800 dark:bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Logo and Social */}
          <div className="col-span-2 lg:col-span-1">
            <h2 className="text-2xl font-bold text-white mb-4">ताजा खबरें</h2>
            <p className="text-sm text-slate-400 mb-6">
              हर पल की खबर, आपके साथ।
            </p>
            <div className="flex space-x-4">
              {socialIcons.map((icon, index) => (
                <SocialIcon key={index} href={icon.href} path={icon.path} />
              ))}
            </div>
          </div>

          {/* Categories Links */}
          <div>
            <h3 className="font-semibold text-white mb-4 tracking-wider">
              श्रेणियाँ
            </h3>
            <ul className="space-y-3">
              {categories.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-white mb-4 tracking-wider">
              कंपनी
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 lg:col-span-2">
            <h3 className="font-semibold text-white mb-4 tracking-wider">
              न्यूज़लेटर के लिए साइन अप करें
            </h3>
            <p className="text-sm text-slate-400 mb-4">
              नवीनतम समाचार, लेख और संसाधन, सीधे आपके इनबॉक्स में।
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="अपना ईमेल दर्ज करें"
                className="flex-grow px-4 py-2 rounded-md bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition-colors"
              >
                सब्सक्राइब
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-700 text-center text-slate-400 text-sm">
          <p>
            &copy; {new Date().getFullYear()} ताजा खबरें. सर्वाधिकार सुरक्षित।
          </p>
        </div>
      </div>
    </footer>
  );
}

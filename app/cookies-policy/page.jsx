const CookiePolicy = () => {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-yellow-600 text-2xl">🍪</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900">Cookie Policy</h1>
            </div>
            <p className="text-lg text-gray-600">
              Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <div className="w-24 h-1 bg-yellow-500 mx-auto mt-4"></div>
          </div>
  
          {/* Main Content */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-8">
              {/* Introduction */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Introduction</h2>
                <p className="text-gray-600 mb-4">
                  At <strong>Hmarduniya.in</strong>, we use cookies and similar technologies to enhance your 
                  browsing experience, analyze website traffic, and personalize content. This Cookie Policy 
                  explains what cookies are, how we use them, and how you can manage your cookie preferences.
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                  <p className="text-blue-700">
                    By using our website, you consent to the use of cookies in accordance with this policy. 
                    You can manage your cookie preferences at any time through your browser settings.
                  </p>
                </div>
              </section>
  
              {/* What are Cookies */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm font-bold mr-3">1</span>
                  What Are Cookies?
                </h2>
                <div className="bg-green-50 p-6 rounded-lg">
                  <p className="text-gray-600 mb-4">
                    Cookies are small text files that are stored on your computer or mobile device when 
                    you visit a website. They are widely used to make websites work more efficiently 
                    and provide information to the website owners.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-white p-4 rounded border">
                      <h4 className="font-semibold text-gray-800 mb-2">How Cookies Work</h4>
                      <p className="text-gray-600 text-sm">
                        When you visit our site, we may place cookies on your device to remember your 
                        preferences and improve your experience.
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded border">
                      <h4 className="font-semibold text-gray-800 mb-2">Cookie Lifespan</h4>
                      <p className="text-gray-600 text-sm">
                        Cookies can be session-based (deleted when you close your browser) or persistent 
                        (remain until they expire or are deleted).
                      </p>
                    </div>
                  </div>
                </div>
              </section>
  
              {/* Types of Cookies We Use */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-sm font-bold mr-3">2</span>
                  Types of Cookies We Use
                </h2>
                
                <div className="space-y-6">
                  {/* Essential Cookies */}
                  <div className="border-l-4 border-green-500 pl-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">🍃 Essential Cookies</h4>
                    <p className="text-gray-600 mb-2">
                      These cookies are necessary for the website to function properly and cannot be switched off.
                    </p>
                    <ul className="list-disc list-inside text-gray-600 text-sm space-y-1 ml-4">
                      <li>User authentication and security</li>
                      <li>Remembering your privacy preferences</li>
                      <li>Load balancing and website performance</li>
                      <li>Session management</li>
                    </ul>
                  </div>
  
                  {/* Analytics Cookies */}
                  <div className="border-l-4 border-blue-500 pl-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">📊 Analytics & Performance Cookies</h4>
                    <p className="text-gray-600 mb-2">
                      These cookies help us understand how visitors interact with our website.
                    </p>
                    <ul className="list-disc list-inside text-gray-600 text-sm space-y-1 ml-4">
                      <li>Google Analytics for traffic analysis</li>
                      <li>Page view and click tracking</li>
                      <li>Website performance monitoring</li>
                      <li>User behavior analysis</li>
                    </ul>
                  </div>
  
                  {/* Functionality Cookies */}
                  <div className="border-l-4 border-yellow-500 pl-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">⚙️ Functionality Cookies</h4>
                    <p className="text-gray-600 mb-2">
                      These cookies enable enhanced functionality and personalization.
                    </p>
                    <ul className="list-disc list-inside text-gray-600 text-sm space-y-1 ml-4">
                      <li>Remembering your language preferences</li>
                      <li>Storing your reading history</li>
                      <li>Personalized content recommendations</li>
                      <li>Social media integration</li>
                    </ul>
                  </div>
  
                  {/* Advertising Cookies */}
                  <div className="border-l-4 border-red-500 pl-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">🎯 Advertising & Targeting Cookies</h4>
                    <p className="text-gray-600 mb-2">
                      These cookies are used to deliver relevant advertisements and track ad performance.
                    </p>
                    <ul className="list-disc list-inside text-gray-600 text-sm space-y-1 ml-4">
                      <li>Google AdSense for content-based ads</li>
                      <li>Interest-based advertising</li>
                      <li>Ad performance measurement</li>
                      <li>Frequency capping</li>
                    </ul>
                  </div>
                </div>
              </section>
  
              {/* Third-Party Cookies */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-sm font-bold mr-3">3</span>
                  Third-Party Cookies
                </h2>
                <div className="bg-orange-50 p-6 rounded-lg">
                  <p className="text-gray-600 mb-4">
                    We work with third-party companies that may set cookies on our website to provide:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold text-orange-700 mb-2">Analytics Services</h5>
                      <ul className="text-orange-600 text-sm space-y-1">
                        <li>• Google Analytics</li>
                        <li>• Hotjar</li>
                        <li>• Similar technologies</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-orange-700 mb-2">Advertising Networks</h5>
                      <ul className="text-orange-600 text-sm space-y-1">
                        <li>• Google AdSense</li>
                        <li>• Media.net</li>
                        <li>• Other ad partners</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-white rounded border">
                    <p className="text-orange-700 text-sm">
                      <strong>Note:</strong> Third-party cookies are subject to the respective privacy policies 
                      of these companies. We recommend reviewing their policies for more information.
                    </p>
                  </div>
                </div>
              </section>
  
              {/* How We Use Cookies */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-sm font-bold mr-3">4</span>
                  How We Use Cookies
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-indigo-800 mb-2">User Experience</h4>
                    <ul className="text-indigo-700 text-sm space-y-2">
                      <li className="flex items-start">
                        <span className="text-indigo-500 mr-2">✓</span>
                        Remember your login details and preferences
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-500 mr-2">✓</span>
                        Provide personalized content and news recommendations
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-500 mr-2">✓</span>
                        Maintain your session across pages
                      </li>
                    </ul>
                  </div>
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-indigo-800 mb-2">Website Improvement</h4>
                    <ul className="text-indigo-700 text-sm space-y-2">
                      <li className="flex items-start">
                        <span className="text-indigo-500 mr-2">✓</span>
                        Analyze how users navigate our website
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-500 mr-2">✓</span>
                        Identify popular content and sections
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-500 mr-2">✓</span>
                        Improve website performance and speed
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
  
              {/* Managing Cookies */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-sm font-bold mr-3">5</span>
                  Managing Your Cookie Preferences
                </h2>
                <div className="bg-red-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-red-800 mb-4">Browser Settings</h4>
                  <p className="text-red-700 mb-4">
                    You can control and manage cookies through your browser settings. Most browsers allow you to:
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-white p-2 rounded-full mr-4">
                        <span className="text-red-500 font-bold">🌐</span>
                      </div>
                      <div>
                        <h5 className="font-semibold text-red-800">Google Chrome</h5>
                        <p className="text-red-700 text-sm">
                          Settings → Privacy and security → Cookies and other site data
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-white p-2 rounded-full mr-4">
                        <span className="text-red-500 font-bold">🦊</span>
                      </div>
                      <div>
                        <h5 className="font-semibold text-red-800">Mozilla Firefox</h5>
                        <p className="text-red-700 text-sm">
                          Options → Privacy & Security → Cookies and Site Data
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-white p-2 rounded-full mr-4">
                        <span className="text-red-500 font-bold">🅂</span>
                      </div>
                      <div>
                        <h5 className="font-semibold text-red-800">Safari</h5>
                        <p className="text-red-700 text-sm">
                          Preferences → Privacy → Cookies and website data
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-white p-2 rounded-full mr-4">
                        <span className="text-red-500 font-bold">𝐄</span>
                      </div>
                      <div>
                        <h5 className="font-semibold text-red-800">Microsoft Edge</h5>
                        <p className="text-red-700 text-sm">
                          Settings → Privacy, search, and services → Cookies
                        </p>
                      </div>
                    </div>
                  </div>
  
                  <div className="mt-6 p-4 bg-white rounded border">
                    <p className="text-red-700 text-sm font-semibold">
                      ⚠️ Please note: Disabling certain cookies may affect the functionality of our website 
                      and your ability to access certain features.
                    </p>
                  </div>
                </div>
              </section>
  
              {/* Cookie Duration */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cookie Duration</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="py-3 px-4 border-b text-left font-semibold text-gray-700">Cookie Type</th>
                        <th className="py-3 px-4 border-b text-left font-semibold text-gray-700">Duration</th>
                        <th className="py-3 px-4 border-b text-left font-semibold text-gray-700">Purpose</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-3 px-4 border-b text-gray-600">Session Cookies</td>
                        <td className="py-3 px-4 border-b text-gray-600">Until browser closed</td>
                        <td className="py-3 px-4 border-b text-gray-600">Temporary session management</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 border-b text-gray-600">Preference Cookies</td>
                        <td className="py-3 px-4 border-b text-gray-600">Up to 1 year</td>
                        <td className="py-3 px-4 border-b text-gray-600">Remember user settings</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 border-b text-gray-600">Analytics Cookies</td>
                        <td className="py-3 px-4 border-b text-gray-600">Up to 2 years</td>
                        <td className="py-3 px-4 border-b text-gray-600">Website usage analysis</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 border-b text-gray-600">Advertising Cookies</td>
                        <td className="py-3 px-4 border-b text-gray-600">Up to 1 year</td>
                        <td className="py-3 px-4 border-b text-gray-600">Ad targeting and measurement</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
  
              {/* Updates & Contact */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Updates to This Policy</h2>
                <div className="bg-gray-100 p-6 rounded-lg">
                  <p className="text-gray-600 mb-4">
                    We may update this Cookie Policy from time to time to reflect changes in technology, 
                    legislation, or our data practices. We encourage you to check this page periodically 
                    for the latest information about our use of cookies.
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="font-semibold mr-2">Last updated:</span>
                    {new Date().toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
              </section>
  
              {/* Contact Information */}
              <div className="mt-8 p-6 bg-yellow-50 rounded-lg border-2 border-yellow-200 text-center">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                  Questions About Our Cookie Policy?
                </h3>
                <p className="text-yellow-700">
                  If you have any questions or concerns about our use of cookies, please contact us at:
                </p>
                <p className="text-yellow-800 font-semibold text-lg mt-2">
                  privacy@hmarduniya.in
                </p>
              </div>
  
              {/* Cookie Consent Reminder */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  You can manage your cookie preferences at any time by accessing our 
                  cookie settings or through your browser preferences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default CookiePolicy;
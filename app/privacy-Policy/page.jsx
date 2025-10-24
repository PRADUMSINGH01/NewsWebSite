const PrivacyPolicy = () => {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-lg text-gray-600">
              Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
  
          {/* Main Content */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-8">
              {/* Introduction */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Introduction</h2>
                <p className="text-gray-600 mb-4">
                  <strong>Hmarduniya.in</strong> ("we," "our," or "us") recognizes the importance of your privacy 
                  and is committed to protecting it. This Privacy Policy explains how we collect, use, and share 
                  your information when you visit our website, <strong>hmarduniya.in</strong>, a portal for the latest 
                  Hindi news from across India (collectively, the "Services").
                </p>
                <p className="text-gray-600 mb-4">
                  By using our Services, you agree to the terms of this Privacy Policy. We encourage you to 
                  read it carefully to understand our practices regarding your personal data.
                </p>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                  <p className="text-yellow-700 font-semibold">
                    We reserve the right to modify this Privacy Policy at any time. Any changes will be 
                    effective immediately upon posting the updated policy on our website.
                  </p>
                </div>
              </section>
  
              {/* Information We Collect */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Information We Collect</h2>
                <p className="text-gray-600 mb-4">
                  We collect information to provide and improve our Services. The information we collect 
                  falls into the following categories:
                </p>
  
                <div className="mb-6">
                  <h3 className="text-xl font-medium text-gray-700 mb-3">Information You Provide Directly:</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                    <li>When you register for an account, we may collect your name, email address, age, gender, and contact number</li>
                    <li>When you post a comment, contact us via email or phone, or participate in a survey</li>
                    <li>When you subscribe to our newsletters or push notifications</li>
                  </ul>
                </div>
  
                <div className="mb-6">
                  <h3 className="text-xl font-medium text-gray-700 mb-3">Information Collected Automatically:</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                    <li>
                      <strong>Log and Device Data:</strong> We automatically collect information about your 
                      interaction with our Services, such as your IP address, browser type, device type, 
                      operating system, pages you view, and the dates/times of your visits
                    </li>
                    <li>
                      <strong>Location Information:</strong> With your consent (by enabling GPS in your 
                      browser or app), we may collect general location data
                    </li>
                    <li>
                      <strong>Cookies and Tracking Technologies:</strong> We use cookies, web beacons, 
                      and similar technologies to collect information about your browsing behavior and preferences
                    </li>
                  </ul>
                </div>
  
                <div className="mb-6">
                  <h3 className="text-xl font-medium text-gray-700 mb-3">Information from Third Parties:</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                    <li>
                      You can register or log in using third-party services like Facebook or Google. 
                      If you do this, they will provide us with certain information as authorized by 
                      your privacy settings on those platforms
                    </li>
                    <li>
                      We may receive information about you from other sources, such as advertising partners 
                      and analytics providers
                    </li>
                  </ul>
                </div>
              </section>
  
              {/* How We Use Your Information */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. How We Use Your Information</h2>
                <p className="text-gray-600 mb-4">
                  We use the information we collect for the following purposes:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Service Provision</h4>
                    <p className="text-blue-700 text-sm">
                      To operate and maintain hmarduniya.in, deliver news content, allow you to post comments, 
                      and manage your account
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Personalization</h4>
                    <p className="text-green-700 text-sm">
                      To show you content and news stories that are more relevant to your interests and location
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">Communication</h4>
                    <p className="text-purple-700 text-sm">
                      To send you administrative emails, news updates, and responses to your queries
                    </p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-2">Advertising</h4>
                    <p className="text-orange-700 text-sm">
                      To display targeted advertisements from us and our partners on our website
                    </p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">Analytics</h4>
                    <p className="text-red-700 text-sm">
                      To understand how users interact with our Services and improve our website's performance
                    </p>
                  </div>
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-indigo-800 mb-2">Security & Compliance</h4>
                    <p className="text-indigo-700 text-sm">
                      To detect and prevent fraud, and comply with applicable laws and regulations
                    </p>
                  </div>
                </div>
              </section>
  
              {/* How We Share Your Information */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. How We Share Your Information</h2>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-gray-700">Service Providers</h4>
                    <p className="text-gray-600 text-sm">
                      With trusted third-party vendors who help us operate our website (hosting providers, 
                      email service providers, analytics partners)
                    </p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold text-gray-700">Advertising Partners</h4>
                    <p className="text-gray-600 text-sm">
                      We allow third-party advertisers to use cookies and tracking technologies to serve 
                      relevant ads on and off our site
                    </p>
                  </div>
                  <div className="border-l-4 border-red-500 pl-4">
                    <h4 className="font-semibold text-gray-700">Legal Requirements</h4>
                    <p className="text-gray-600 text-sm">
                      When required by law, to comply with legal process, or to protect the rights and 
                      safety of our users and the public
                    </p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold text-gray-700">Business Transfers</h4>
                    <p className="text-gray-600 text-sm">
                      In connection with a merger, sale of company assets, financing, or acquisition
                    </p>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                  <p className="text-gray-600 text-sm">
                    <strong>Note:</strong> We may also share aggregated, non-personally identifiable information 
                    with third parties for research and analysis purposes.
                  </p>
                </div>
              </section>
  
              {/* Cookie Policy */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Cookie Policy</h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-700 mb-3">What are Cookies?</h3>
                  <p className="text-gray-600 mb-4">
                    Cookies are small text files stored on your device when you visit a website. They help 
                    the site remember your actions and preferences over time.
                  </p>
  
                  <h3 className="text-lg font-medium text-gray-700 mb-3">How We Use Cookies:</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4 ml-4">
                    <li>Remember your login details and preferences</li>
                    <li>Understand how you use our site to improve user experience</li>
                    <li>Deliver personalized content and advertisements</li>
                    <li>Analyze site traffic and user behavior</li>
                  </ul>
  
                  <h3 className="text-lg font-medium text-gray-700 mb-3">Your Choices:</h3>
                  <p className="text-gray-600 mb-2">
                    You can choose to disable cookies through your browser settings. However, please note 
                    that if you do this, some features of hmarduniya.in may not function correctly.
                  </p>
                  <p className="text-gray-600 text-sm">
                    Most browsers allow you to refuse cookies, delete cookies, or be notified when a cookie 
                    is set. Check your browser's help documentation for instructions.
                  </p>
                </div>
              </section>
  
              {/* User Rights */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Your Rights and Choices</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-4">
                      <span className="text-blue-600 font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700">Access and Correction</h4>
                      <p className="text-gray-600 text-sm">
                        You can access and update your personal information by logging into your account 
                        on our website
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-green-100 p-2 rounded-full mr-4">
                      <span className="text-green-600 font-bold">✉</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700">Opt-Out of Marketing</h4>
                      <p className="text-gray-600 text-sm">
                        You can unsubscribe from our promotional emails by clicking the "unsubscribe" 
                        link at the bottom of any marketing email
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-purple-100 p-2 rounded-full mr-4">
                      <span className="text-purple-600 font-bold">↶</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700">Withdrawal of Consent</h4>
                      <p className="text-gray-600 text-sm">
                        You may withdraw your consent for data collection by contacting us. Note this may 
                        affect service availability
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-red-100 p-2 rounded-full mr-4">
                      <span className="text-red-600 font-bold">🗑</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700">Account Deletion</h4>
                      <p className="text-gray-600 text-sm">
                        You can request to close your account. We retain certain information as required 
                        by law or for legitimate business purposes
                      </p>
                    </div>
                  </div>
                </div>
              </section>
  
              {/* Data Retention & Contact */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Data Retention</h2>
                <p className="text-gray-600 mb-6">
                  We retain your personal information only for as long as necessary to fulfill the purposes 
                  outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
                </p>
  
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Contact Us</h2>
                <div className="bg-gray-50 p-6 rounded-lg border-2 border-blue-200">
                  <p className="text-gray-600 mb-4">
                    If you have any questions, concerns, or complaints about this Privacy Policy or our 
                    data practices, please contact us at:
                  </p>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-blue-600 mb-2">
                      hmarduniya@gmail.com
                    </p>
                    <p className="text-gray-500 text-sm">
                      We typically respond to privacy-related inquiries within 3-5 business days
                    </p>
                  </div>
                </div>
              </section>
  
              {/* Compliance Notice */}
              <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 text-sm text-center">
                  <strong>Compliance Note:</strong> This privacy policy is designed to meet the requirements 
                  of Google Ads policies and other relevant data protection regulations. We are committed 
                  to maintaining transparency about our data practices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default PrivacyPolicy;
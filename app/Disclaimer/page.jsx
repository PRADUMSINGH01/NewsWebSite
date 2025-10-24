const Disclaimer = () => {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-red-600 text-2xl">⚠️</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900">Disclaimer</h1>
            </div>
            <p className="text-lg text-gray-600">
              Important Legal Notice Regarding Content and Information
            </p>
            <div className="w-24 h-1 bg-red-600 mx-auto mt-4"></div>
          </div>
  
          {/* Main Content */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-8">
              {/* Warning Banner */}
              <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <span className="text-red-400 text-xl">⚠</span>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Important Legal Notice
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>
                        Please read this disclaimer carefully before using our website. 
                        By accessing and using Hmarduniya.in, you acknowledge and agree 
                        to the terms outlined below.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
  
              {/* General Information Disclaimer */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-bold mr-3">1</span>
                  General Information Purpose
                </h2>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <p className="text-gray-600 mb-4">
                    At <strong>Hmarduniya.in</strong>, we strive to provide our readers with 
                    accurate and up-to-date information on a wide range of topics. However, 
                    we understand that errors can occur despite our best efforts, and we 
                    want to be transparent about our policies and limitations.
                  </p>
                  <p className="text-gray-600">
                    Therefore, we would like to emphasize that the information provided 
                    on our website is for <strong>general informational purposes only</strong>. 
                    While we strive to ensure the accuracy of our reporting, we do not 
                    guarantee or warrant the accuracy, completeness, or reliability of 
                    any information provided on our website.
                  </p>
                </div>
              </section>
  
              {/* External Links Disclaimer */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm font-bold mr-3">2</span>
                  External Links and Third-Party Content
                </h2>
                <div className="border-l-4 border-green-500 pl-6 ml-3">
                  <p className="text-gray-600 mb-4">
                    Our website contains links to external websites and sources that are 
                    not controlled or maintained by us. We are not responsible for:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                    <li>The content, accuracy, or reliability of any information or materials provided by these external sources</li>
                    <li>The privacy practices or policies of third-party websites</li>
                    <li>Any damages or losses resulting from the use of external links</li>
                    <li>The availability of linked external resources</li>
                  </ul>
                  <div className="mt-4 p-4 bg-green-50 rounded-lg">
                    <p className="text-green-700 text-sm font-medium">
                      💡 <strong>Tip:</strong> We strongly encourage our readers to review the 
                      privacy policies and terms of service of any third-party websites they visit.
                    </p>
                  </div>
                </div>
              </section>
  
              {/* No Endorsement Section */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-sm font-bold mr-3">3</span>
                  No Endorsement or Recommendation
                </h2>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <p className="text-gray-600 mb-4">
                    We strongly encourage our readers to conduct their own research and 
                    verification of any information provided on our website or through 
                    external sources.
                  </p>
                  <p className="text-gray-600">
                    We do not endorse any specific products, services, opinions, or views 
                    expressed by any individual or organization, unless otherwise explicitly 
                    stated. Any mention of third-party products, services, or organizations 
                    is for informational purposes only.
                  </p>
                </div>
              </section>
  
              {/* Professional Advice Disclaimer */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-sm font-bold mr-3">4</span>
                  No Professional Advice
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start p-4 bg-orange-50 rounded-lg">
                    <span className="text-orange-500 font-bold text-lg mr-3">⚖️</span>
                    <div>
                      <h4 className="font-semibold text-orange-800 mb-1">Legal Matters</h4>
                      <p className="text-orange-700 text-sm">
                        The content on our website does not constitute legal advice and 
                        should not be relied upon for legal decisions.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start p-4 bg-orange-50 rounded-lg">
                    <span className="text-orange-500 font-bold text-lg mr-3">💰</span>
                    <div>
                      <h4 className="font-semibold text-orange-800 mb-1">Financial Guidance</h4>
                      <p className="text-orange-700 text-sm">
                        We do not provide financial advice. Consult qualified financial 
                        advisors for investment decisions.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start p-4 bg-orange-50 rounded-lg">
                    <span className="text-orange-500 font-bold text-lg mr-3">🏥</span>
                    <div>
                      <h4 className="font-semibold text-orange-800 mb-1">Medical Information</h4>
                      <p className="text-orange-700 text-sm">
                        Health-related content is for informational purposes only. 
                        Always consult healthcare professionals for medical advice.
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 mt-4">
                    Furthermore, we do not provide any legal, financial, medical, or 
                    professional advice, and any information provided on our website 
                    should not be relied upon as such. We recommend consulting with 
                    qualified professionals for any specific concerns or issues.
                  </p>
                </div>
              </section>
  
              {/* User Responsibility */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-sm font-bold mr-3">5</span>
                  User Responsibility
                </h2>
                <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                  <p className="text-red-700 mb-4 font-medium">
                    Readers assume full responsibility for how they use the information 
                    provided on our website.
                  </p>
                  <ul className="list-disc list-inside text-red-700 space-y-2 ml-4">
                    <li>Verify information through multiple reliable sources</li>
                    <li>Consider the date of publication and potential updates</li>
                    <li>Consult professionals for important decisions</li>
                    <li>Use discretion when sharing personal information</li>
                  </ul>
                </div>
              </section>
  
              {/* Summary Section */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Summary</h2>
                <div className="bg-gray-100 p-6 rounded-lg">
                  <p className="text-gray-600 mb-4">
                    In summary, our news website strives to provide accurate and up-to-date 
                    information, but we cannot guarantee the accuracy, completeness, or 
                    reliability of any information provided on our website.
                  </p>
                  <p className="text-gray-600 font-semibold">
                    We encourage our readers to conduct their own research and verification, 
                    and we are not responsible for any actions or decisions made based on 
                    the information provided on our website or through external sources.
                  </p>
                </div>
              </section>
  
              {/* Contact Information */}
              <div className="mt-8 p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
                <h3 className="text-lg font-semibold text-blue-800 mb-2 text-center">
                  Questions or Concerns?
                </h3>
                <p className="text-blue-700 text-center">
                  If you have any questions about this disclaimer or believe any content 
                  requires correction, please contact us at:{' '}
                  <strong>hmarduniya@gmail.com</strong>
                </p>
              </div>
  
              {/* Last Updated */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  Last updated: {new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Disclaimer;
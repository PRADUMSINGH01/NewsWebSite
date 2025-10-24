const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-800 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About Hmarduniya.in</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Your Trusted Source for Latest Hindi News from Across India
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Our Mission & Vision
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300 border-t-4 border-blue-500">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To deliver accurate, reliable, and timely Hindi news to readers worldwide, 
                keeping them informed and connected with India's diverse stories.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300 border-t-4 border-green-500">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Our Vision</h3>
              <p className="text-gray-600">
                To become the most trusted digital Hindi news platform, bridging the gap 
                between traditional journalism and modern technology.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300 border-t-4 border-purple-500">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Our Values</h3>
              <p className="text-gray-600">
                Integrity, accuracy, impartiality, and commitment to serving the public 
                interest through responsible journalism.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
              Our Story
            </h2>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                <strong>Hmarduniya.in</strong> was founded in 2023 with a simple yet powerful vision: 
                to create a digital platform that delivers comprehensive Hindi news coverage to 
                millions of Hindi-speaking readers around the world.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                In an era of digital transformation, we recognized the need for a reliable, 
                fast, and accessible Hindi news source that could keep pace with the evolving 
                media landscape while maintaining the highest standards of journalistic integrity.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Today, we have grown into a trusted news portal with a dedicated team of 
                experienced journalists, editors, and technical experts committed to bringing 
                you the most important stories from every corner of India.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-50 p-6 rounded-lg text-center hover:bg-white hover:shadow-lg transition-all duration-300">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                👨‍💼
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Editorial Team</h4>
              <p className="text-gray-600">
                Seasoned editors and journalists with decades of combined experience 
                in Hindi journalism and digital media.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg text-center hover:bg-white hover:shadow-lg transition-all duration-300">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                📡
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Reporters Network</h4>
              <p className="text-gray-600">
                Dedicated correspondents spread across India, bringing you ground reports 
                and local perspectives.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg text-center hover:bg-white hover:shadow-lg transition-all duration-300">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                💻
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Technical Team</h4>
              <p className="text-gray-600">
                Digital experts ensuring our platform remains fast, secure, and 
                accessible across all devices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Areas */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            What We Cover
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { icon: '🏛️', title: 'Politics & Governance', desc: 'National and state politics, government policies, and administration' },
              { icon: '💰', title: 'Economy & Business', desc: 'Markets, industry updates, economic policies, and business news' },
              { icon: '⚽', title: 'Sports & Entertainment', desc: 'Cricket, films, sports events, and entertainment industry' },
              { icon: '🔬', title: 'Science & Technology', desc: 'Innovations, tech updates, scientific discoveries, and digital trends' },
              { icon: '🏥', title: 'Health & Education', desc: 'Healthcare updates, educational policies, and wellness information' },
              { icon: '🌆', title: 'State & Local News', desc: 'Regional stories, local events, and community news from across India' }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Our Commitment to You
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <span className="text-green-600 font-bold text-xl">✓</span>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Fact-Checked Reporting</h4>
                <p className="text-gray-600">
                  Every story undergoes rigorous verification and cross-checking before publication.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <span className="text-blue-600 font-bold text-xl">⚡</span>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Real-Time Updates</h4>
                <p className="text-gray-600">
                  Breaking news and live coverage of important events as they happen.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <span className="text-purple-600 font-bold text-xl">🎯</span>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">In-Depth Analysis</h4>
                <p className="text-gray-600">
                  Expert commentary and comprehensive analysis of complex issues.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-indigo-100 p-3 rounded-full">
                <span className="text-indigo-600 font-bold text-xl">🔒</span>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Privacy Protection</h4>
                <p className="text-gray-600">
                  Your privacy is respected and protected in accordance with our strict policies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-4xl mx-auto">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">50K+</div>
              <div className="text-blue-100">Monthly Readers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">25+</div>
              <div className="text-blue-100">Indian States Covered</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">100+</div>
              <div className="text-blue-100">Daily News Stories</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">News Coverage</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Join Our Growing Community
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Stay informed with the latest news from across India. Subscribe to our newsletter 
            and never miss important updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg">
              Subscribe to Newsletter
            </button>
            <button className="border-2 border-gray-400 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300">
              Contact Our Team
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
// app/components/ArticlePage.jsx

import Image from "next/image";

// Reusable News Card for the "Related Posts" section
const RelatedPostCard = ({ post }) => (
  <a href={post.link} className="group block">
    <div className="relative w-full h-40 rounded-lg overflow-hidden mb-3">
      <Image
        src={post.image}
        alt={post.title}
        layout="fill"
        objectFit="cover"
        className="transition-transform duration-300 group-hover:scale-105"
      />
    </div>
    <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
      {post.category}
    </p>
    <h3 className="mt-1 font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
      {post.title}
    </h3>
  </a>
);

export default function ArticlePage() {
  const article = {
    title: "चंद्रयान-4: भारत के अगले महत्वाकांक्षी चंद्र मिशन की पूरी कहानी",
    subtitle:
      "सतह पर नरम लैंडिंग से लेकर नमूना वापसी तक, इसरो का लक्ष्य चंद्रमा पर नई ऊंचाइयां छूना है।",
    category: "विज्ञान और तकनीक",
    author: {
      name: "आलोक सिंह",
      imageUrl:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1",
    },
    date: {
      display: "जुलाई 23, 2025",
      iso: "2025-07-23",
    },
    readTime: "8 मिनट पढ़ा",
    heroImage: {
      src: "https://images.pexels.com/photos/1769356/pexels-photo-1769356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      caption: "चंद्रमा की सतह का एक प्रतीकात्मक दृश्य।",
    },
    content: [
      {
        type: "paragraph",
        text: "चंद्रयान-3 की ऐतिहासिक सफलता के बाद, भारतीय अंतरिक्ष अनुसंधान संगठन (इसरो) अब अपने अगले बड़े मिशन, चंद्रयान-4, की तैयारी में जुट गया है। यह मिशन न केवल भारत के चंद्र अन्वेषण कार्यक्रम को आगे बढ़ाएगा, बल्कि यह दुनिया के लिए भी महत्वपूर्ण वैज्ञानिक डेटा प्रदान करेगा।",
      },
      {
        type: "paragraph",
        text: "इसरो के अध्यक्ष डॉ. एस. सोमनाथ के अनुसार, चंद्रयान-4 का मुख्य उद्देश्य चंद्रमा की सतह से नमूने (सैंपल) एकत्र करना और उन्हें सफलतापूर्वक पृथ्वी पर वापस लाना है। यह एक अत्यंत जटिल प्रक्रिया है जिसे 'सैंपल रिटर्न मिशन' कहा जाता है, और कुछ ही देशों ने इसमें सफलता हासिल की है।",
      },
      { type: "heading", text: "मिशन के प्रमुख चरण" },
      {
        type: "paragraph",
        text: "मिशन को कई चरणों में विभाजित किया गया है। पहला चरण एक शक्तिशाली रॉकेट के माध्यम से चंद्रयान-4 को लॉन्च करना होगा। इसके बाद, अंतरिक्ष यान चंद्रमा की कक्षा में प्रवेश करेगा, जहां से एक लैंडर मॉड्यूल सतह पर उतरेगा।",
      },
      {
        type: "blockquote",
        text: "यह सिर्फ एक इंजीनियरिंग चुनौती नहीं है, बल्कि यह भविष्य की पीढ़ियों के लिए विज्ञान और अन्वेषण की सीमाओं का विस्तार करने का एक प्रयास है।",
      },
      {
        type: "image",
        src: "https://images.pexels.com/photos/41162/moon-landing-apollo-11-nasa-buzz-aldrin-41162.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        caption:
          "अपोलो मिशन के दौरान अंतरिक्ष यात्री। चंद्रयान-4 का लक्ष्य रोबोटिक रूप से नमूने एकत्र करना है।",
      },
    ],
    tags: ["इसरो", "चंद्रयान-4", "अंतरिक्ष", "विज्ञान"],
    relatedPosts: [
      {
        id: 1,
        title: "गगनयान: भारत का पहला मानवयुक्त अंतरिक्ष मिशन कब लॉन्च होगा?",
        category: "अंतरिक्ष",
        image:
          "https://images.pexels.com/photos/5439/earth-space.jpg?auto=compress&cs=tinysrgb&w=400",
        link: "#",
      },
      {
        id: 2,
        title: "मंगलयान-2 की तैयारी: क्या भारत मंगल पर इंसान भेजेगा?",
        category: "विश्लेषण",
        image:
          "https://images.pexels.com/photos/58603/mars-mars-rover-space-travel-robot-58603.jpeg?auto=compress&cs=tinysrgb&w=400",
        link: "#",
      },
      {
        id: 3,
        title: "ब्लैक होल के रहस्य: नई खोजों ने क्या खुलासा किया",
        category: "खगोल विज्ञान",
        image:
          "https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg?auto=compress&cs=tinysrgb&w=400",
        link: "#",
      },
    ],
  };
  // Helper function to render different content blocks
  const renderContent = (block, index) => {
    switch (block.type) {
      case "heading":
        return (
          <h2
            key={index}
            className="text-2xl md:text-3xl font-bold my-8 text-slate-900 dark:text-slate-100"
          >
            {block.text}
          </h2>
        );
      case "paragraph":
        return (
          <p
            key={index}
            className="mb-6 text-lg leading-relaxed text-slate-700 dark:text-slate-300"
          >
            {block.text}
          </p>
        );
      case "image":
        return (
          <figure key={index} className="my-8">
            <Image
              src={block.src}
              alt={block.caption}
              width={1200}
              height={800}
              className="rounded-lg"
            />
            <figcaption className="text-center text-sm text-slate-500 mt-2">
              {block.caption}
            </figcaption>
          </figure>
        );
      case "blockquote":
        return (
          <blockquote
            key={index}
            className="my-8 pl-6 border-l-4 border-blue-500"
          >
            <p className="text-xl italic text-slate-800 dark:text-slate-200">
              "{block.text}"
            </p>
          </blockquote>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 py-8 sm:py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Article Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6 sm:p-10">
          <article>
            {/* Article Header */}
            <header className="mb-8 border-b border-slate-200 dark:border-slate-700 pb-8">
              <p className="text-base font-semibold text-blue-600 tracking-wider uppercase">
                {article.category}
              </p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mt-3 mb-4 leading-tight">
                {article.title}
              </h1>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400">
                {article.subtitle}
              </p>
              <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mt-6">
                <div className="flex items-center gap-3">
                  <Image
                    src={article.author.imageUrl}
                    alt={article.author.name}
                    width={44}
                    height={44}
                    className="rounded-full"
                  />
                  <div>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {article.author.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <time dateTime={article.date.iso}>
                        {article.date.display}
                      </time>
                      <span>&bull;</span>
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            {/* Hero Image */}
            <figure className="my-8">
              <Image
                src={article.heroImage.src}
                alt={article.heroImage.caption}
                width={1200}
                height={800}
                className="rounded-xl shadow-lg"
              />
              <figcaption className="text-center text-sm text-slate-500 mt-3">
                {article.heroImage.caption}
              </figcaption>
            </figure>

            {/* Article Body */}
            <div className="article-content">
              {article.content.map(renderContent)}
            </div>
          </article>
        </div>

        {/* Related Posts Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
            आपके लिए अनुशंसित
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {article.relatedPosts.map((post) => (
              <RelatedPostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

 const ArticleCard = ({ article }) => (
        <article className="group rounded-lg overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
          <div className="relative h-48 overflow-hidden">
            <img
              src={article.img}
              alt={article.title}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <span className="absolute top-3 left-3 bg-[#0f4c4c] text-white text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wide">
              {article.tag}
            </span>
          </div>
          <div className="p-5">
            <h3 className="font-bold text-lg leading-snug line-clamp-2 text-gray-900 group-hover:text-[#0f4c4c] font-['Noto_Sans_Devanagari'] transition-colors">
              {article.title}
            </h3>
            <p className="mt-3 text-sm text-gray-600 line-clamp-2 leading-relaxed">
              {article.excerpt}
            </p>
            <div className="mt-4 flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <img
                  src={article.avatar}
                  alt={article.author}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <div className="font-medium">{article.author}</div>
                  <div className="text-xs">{article.time}</div>
                </div>
              </div>
              <a
                href="#"
                className="text-sm font-semibold text-[#0f4c4c] hover:text-[#0a7f7f] transition-colors"
              >
                और पढ़ें →
              </a>
            </div>
          </div>
        </article>
      );
      
export default ArticleCard
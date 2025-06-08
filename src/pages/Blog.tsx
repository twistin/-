import React, { useState } from 'react';
import { Calendar, ArrowRight, Tag } from 'lucide-react';
import { blogPosts, BlogPost, getAllTags } from '../data/blogPosts';

const Blog: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Filtrar posts por tag si hay uno seleccionado
  const filteredPosts = selectedTag 
    ? blogPosts.filter(post => post.tags?.includes(selectedTag))
    : blogPosts;
  
  const allTags = getAllTags();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-white pt-20 md:pt-12">
        <div className="max-w-4xl mx-auto px-6">
          <button
            onClick={() => setSelectedPost(null)}
            className="text-gray-500 hover:text-gray-700 mb-8 inline-flex items-center transition-colors"
          >
            ← Volver al blog
          </button>
          
          <article>
            <header className="mb-12">
              <h1 className="text-4xl md:text-5xl font-light mb-6 leading-tight">
                {selectedPost.title}
              </h1>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center text-gray-500 text-sm">
                  <Calendar size={16} className="mr-2" />
                  {formatDate(selectedPost.date)}
                </div>
                {selectedPost.tags && selectedPost.tags.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <Tag size={14} className="text-gray-400" />
                    {selectedPost.tags.map((tag, index) => (
                      <span 
                        key={tag}
                        className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </header>
            
            <div className="prose prose-lg max-w-none">
              {selectedPost.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-6 leading-relaxed text-gray-800">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20 md:pt-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-light mb-4 tracking-wide">
            Blog
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
            Reflexiones sobre el arte sonoro, proceso creativo y experiencias
          </p>
          
          {/* Filtros por tags */}
          {allTags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-4 py-2 text-sm rounded-full transition-colors ${
                  selectedTag === null 
                    ? 'bg-black text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Todos
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  className={`px-4 py-2 text-sm rounded-full transition-colors ${
                    selectedTag === tag 
                      ? 'bg-black text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}
        </header>

        {/* Lista de posts */}
        <div className="grid gap-12 md:gap-16">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                {selectedTag ? `No hay posts con el tag "${selectedTag}"` : 'No hay posts disponibles'}
              </p>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <article 
                key={post.id}
                className="border-b border-gray-100 pb-12 last:border-b-0 cursor-pointer group"
                onClick={() => setSelectedPost(post)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar size={16} className="mr-2" />
                    {formatDate(post.date)}
                  </div>
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex items-center space-x-1">
                      {post.tags.map((tag) => (
                        <span 
                          key={tag}
                          className="text-xs px-2 py-1 bg-gray-100 text-gray-500 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                <h2 className="text-2xl md:text-3xl font-light mb-4 group-hover:text-gray-600 transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-gray-700 leading-relaxed mb-6">
                  {post.excerpt}
                </p>
                
                <div className="inline-flex items-center text-black hover:text-gray-600 transition-colors">
                  Leer más <ArrowRight size={16} className="ml-2" />
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;

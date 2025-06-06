import React, { useState, useEffect } from 'react';
import { Plus, Calendar, ArrowRight } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  date: string;
  excerpt: string;
}

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isAddingPost, setIsAddingPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    excerpt: ''
  });

  // Cargar posts desde localStorage al inicializar
  useEffect(() => {
    const savedPosts = localStorage.getItem('blog-posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      // Posts de ejemplo iniciales
      const initialPosts: BlogPost[] = [
        {
          id: '1',
          title: 'Reflexiones sobre el Espacio Sonoro',
          excerpt: 'Una exploración de cómo el sonido define y transforma nuestros espacios íntimos.',
          content: 'El espacio sonoro es más que un concepto acústico; es una dimensión emocional y perceptiva que nos conecta con lo invisible. En mis últimas composiciones, he estado explorando cómo los silencios pueden ser tan elocuentes como los sonidos más intensos.\n\nCada obra nace de la observación del entorno, de la escucha atenta de esos momentos donde el mundo parece suspenderse. Es en esa suspensión donde encuentro la materia prima de mi trabajo: la tensión entre lo que se oye y lo que se siente.',
          date: '2024-06-01'
        },
        {
          id: '2',
          title: 'Proceso Creativo: Entre el Control y el Azar',
          excerpt: 'Cómo equilibrar la intención artística con los elementos aleatorios en la composición sonora.',
          content: 'Mi proceso creativo se mueve constantemente entre dos polos: el control absoluto de cada elemento y la apertura total al azar. Esta tensión no es un conflicto, sino el motor de mis obras.\n\nTrabajo con sistemas que permiten que el sonido evolucione de manera impredecible, pero dentro de parámetros que defino cuidadosamente. Es como crear un jardín: plantas las semillas, preparas el terreno, pero no puedes controlar exactamente cómo crecerá cada planta.',
          date: '2024-05-15'
        }
      ];
      setPosts(initialPosts);
      localStorage.setItem('blog-posts', JSON.stringify(initialPosts));
    }
  }, []);

  // Guardar posts en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('blog-posts', JSON.stringify(posts));
  }, [posts]);

  const handleAddPost = () => {
    if (newPost.title.trim() && newPost.content.trim()) {
      const post: BlogPost = {
        id: Date.now().toString(),
        title: newPost.title,
        content: newPost.content,
        excerpt: newPost.excerpt || newPost.content.substring(0, 150) + '...',
        date: new Date().toISOString().split('T')[0]
      };
      
      setPosts([post, ...posts]);
      setNewPost({ title: '', content: '', excerpt: '' });
      setIsAddingPost(false);
    }
  };

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
              <div className="flex items-center text-gray-500 text-sm">
                <Calendar size={16} className="mr-2" />
                {formatDate(selectedPost.date)}
              </div>
            </header>
            
            <div className="prose prose-lg max-w-none">
              {selectedPost.content.split('\n').map((paragraph, index) => (
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
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Reflexiones sobre el arte sonoro, proceso creativo y experiencias
          </p>
          
          <button
            onClick={() => setIsAddingPost(true)}
            className="mt-8 inline-flex items-center px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors rounded-full"
          >
            <Plus size={16} className="mr-2" />
            Nuevo Post
          </button>
        </header>

        {/* Formulario para agregar post */}
        {isAddingPost && (
          <div className="mb-16 bg-gray-50 p-8 rounded-2xl">
            <h2 className="text-2xl font-light mb-6">Nuevo Post</h2>
            
            <div className="space-y-6">
              <input
                type="text"
                placeholder="Título del post"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
              />
              
              <input
                type="text"
                placeholder="Extracto (opcional)"
                value={newPost.excerpt}
                onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
              />
              
              <textarea
                placeholder="Contenido del post"
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                rows={8}
                className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none resize-vertical"
              />
              
              <div className="flex space-x-4">
                <button
                  onClick={handleAddPost}
                  className="px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors rounded-lg"
                >
                  Publicar
                </button>
                <button
                  onClick={() => setIsAddingPost(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors rounded-lg"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Lista de posts */}
        <div className="grid gap-12 md:gap-16">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                No hay posts aún. ¡Crea el primero!
              </p>
            </div>
          ) : (
            posts.map((post) => (
              <article 
                key={post.id}
                className="border-b border-gray-100 pb-12 last:border-b-0 cursor-pointer group"
                onClick={() => setSelectedPost(post)}
              >
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <Calendar size={16} className="mr-2" />
                  {formatDate(post.date)}
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

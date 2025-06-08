import React, { useState } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  date: string;
  excerpt: string;
}

const Blog: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Posts estáticos - gestionados localmente
  const posts: BlogPost[] = [
    {
      id: '3',
      title: 'La Geometría del Silencio',
      excerpt: 'Explorando cómo los espacios vacíos en la música pueden ser tan expresivos como las notas mismas.',
      content: `El silencio no es la ausencia de sonido, sino su complemento más profundo. En mis últimas composiciones he estado trabajando con lo que llamo "geometría del silencio" - la forma en que los espacios vacíos crean estructuras tan sólidas como las más densas texturas sonoras.

Cada pausa tiene su peso específico, su densidad emocional. Un silencio de dos segundos después de un crescendo no es igual que el mismo silencio después de un susurro. La diferencia no está en la duración, sino en la expectativa que genera.

He comenzado a mapear estos silencios como si fueran objetos tridimensionales, con volumen, textura y temperatura. Algunos silencios son fríos y metálicos, otros cálidos y envolventes. Esta materialización del vacío me permite componer con él como si fuera otro instrumento.`,
      date: '2024-12-15'
    },
    {
      id: '2',
      title: 'Reflexiones sobre el Espacio Sonoro',
      excerpt: 'Una exploración de cómo el sonido define y transforma nuestros espacios íntimos.',
      content: `El espacio sonoro es más que un concepto acústico; es una dimensión emocional y perceptiva que nos conecta con lo invisible. En mis últimas composiciones, he estado explorando cómo los silencios pueden ser tan elocuentes como los sonidos más intensos.

Cada obra nace de la observación del entorno, de la escucha atenta de esos momentos donde el mundo parece suspenderse. Es en esa suspensión donde encuentro la materia prima de mi trabajo: la tensión entre lo que se oye y lo que se siente.

El espacio no es solo el contenedor del sonido, sino su co-creador. Una misma pieza suena completamente diferente en una catedral gótica que en un estudio de grabación. Esta variabilidad no es un problema a resolver, sino una característica fundamental que abrazo en mi trabajo.`,
      date: '2024-11-28'
    },
    {
      id: '1',
      title: 'Proceso Creativo: Entre el Control y el Azar',
      excerpt: 'Cómo equilibrar la intención artística con los elementos aleatorios en la composición sonora.',
      content: `Mi proceso creativo se mueve constantemente entre dos polos: el control absoluto de cada elemento y la apertura total al azar. Esta tensión no es un conflicto, sino el motor de mis obras.

Trabajo con sistemas que permiten que el sonido evolucione de manera impredecible, pero dentro de parámetros que defino cuidadosamente. Es como crear un jardín: plantas las semillas, preparas el terreno, pero no puedes controlar exactamente cómo crecerá cada planta.

En mis últimas piezas he desarrollado lo que llamo "algoritmos orgánicos" - sistemas de generación que imitan procesos naturales. No se trata de usar tecnología por usar, sino de encontrar en ella metáforas para fenómenos que me interesan: la erosión, el crecimiento celular, los patrones fractales.`,
      date: '2024-10-15'
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Vista de post individual
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

  // Vista de lista de posts - SIN BOTÓN NUEVO POST
  return (
    <div className="min-h-screen bg-white pt-20 md:pt-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header - SIN BOTÓN NUEVO POST */}
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-light mb-4 tracking-wide">
            Blog
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Reflexiones sobre el arte sonoro, proceso creativo y experiencias
          </p>
        </header>

        {/* Lista de posts - SOLO LECTURA */}
        <div className="grid gap-12 md:gap-16">
          {posts.map((post) => (
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
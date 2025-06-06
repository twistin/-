import React, { useState, useEffect } from 'react';
import { Play, Pause, Calendar, Clock, ExternalLink } from 'lucide-react';

interface Work {
  id: string;
  title: string;
  year: number;
  duration: string;
  description: string;
  audioUrl?: string;
  isPlaying?: boolean;
  category: 'installation' | 'composition' | 'performance' | 'collaboration';
}

const Works: React.FC = () => {
  const [works, setWorks] = useState<Work[]>([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    // Obras de ejemplo
    const initialWorks: Work[] = [
      {
        id: '1',
        title: 'Resonancias del Vacío',
        year: 2024,
        duration: '23:15',
        description: 'Una exploración de los espacios negativos en la composición sonora. Esta pieza utiliza frecuencias bajas y silencios estratégicos para crear una experiencia inmersiva que cuestiona nuestra percepción del tiempo y el espacio.',
        category: 'composition'
      },
      {
        id: '2',
        title: 'Instalación φ',
        year: 2023,
        duration: 'Variable',
        description: 'Instalación sonora interactiva que responde a la presencia del público. Los visitantes pueden modificar la composición simplemente moviéndose por el espacio, creando una obra en constante transformación.',
        category: 'installation'
      },
      {
        id: '3',
        title: 'Diálogos Espectrales',
        year: 2023,
        duration: '18:42',
        description: 'Composición electroacústica que explora la relación entre sonidos orgánicos e intervenidos digitalmente. Grabaciones de campo procesadas en tiempo real crean texturas sonoras únicas.',
        category: 'composition'
      },
      {
        id: '4',
        title: 'Performance: Eco y Memoria',
        year: 2022,
        duration: '45:00',
        description: 'Performance en vivo que combina improvisación vocal, objetos cotidianos y procesamiento digital. Una reflexión sobre cómo el sonido porta memoria y construye identidad.',
        category: 'performance'
      },
      {
        id: '5',
        title: 'Colaboración: Paisajes Virtuales',
        year: 2022,
        duration: '31:28',
        description: 'Trabajo colaborativo con artistas visuales que explora la sinestesia a través de soundscapes generativos sincronizados con visuales procedurales.',
        category: 'collaboration'
      }
    ];
    
    setWorks(initialWorks);
  }, []);

  const categories = [
    { key: 'all', label: 'Todos' },
    { key: 'composition', label: 'Composiciones' },
    { key: 'installation', label: 'Instalaciones' },
    { key: 'performance', label: 'Performances' },
    { key: 'collaboration', label: 'Colaboraciones' }
  ];

  const filteredWorks = selectedCategory === 'all' 
    ? works 
    : works.filter(work => work.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    const colors = {
      composition: 'bg-blue-100 text-blue-800',
      installation: 'bg-green-100 text-green-800',
      performance: 'bg-purple-100 text-purple-800',
      collaboration: 'bg-orange-100 text-orange-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      composition: 'Composición',
      installation: 'Instalación',
      performance: 'Performance',
      collaboration: 'Colaboración'
    };
    return labels[category as keyof typeof labels] || category;
  };

  const handlePlay = (workId: string) => {
    if (currentlyPlaying === workId) {
      setCurrentlyPlaying(null);
    } else {
      setCurrentlyPlaying(workId);
      // Aquí se implementaría la lógica real de reproducción de audio
      // Por ahora simulamos con un timeout
      setTimeout(() => {
        setCurrentlyPlaying(null);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-20 md:pt-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-light mb-4 tracking-wide">
            Trabajos
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Portfolio de obras sonoras, instalaciones y performances
          </p>
        </header>

        {/* Filtros por categoría */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-6 py-2 rounded-full transition-all ${
                  selectedCategory === category.key
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de trabajos */}
        <div className="grid gap-8 md:gap-12">
          {filteredWorks.map((work) => (
            <article 
              key={work.id}
              className="border border-gray-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(work.category)}`}>
                      {getCategoryLabel(work.category)}
                    </span>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-light mb-3">
                    {work.title}
                  </h2>
                  
                  <div className="flex items-center gap-6 text-gray-500 text-sm mb-4">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-2" />
                      {work.year}
                    </div>
                    <div className="flex items-center">
                      <Clock size={16} className="mr-2" />
                      {work.duration}
                    </div>
                  </div>
                </div>
                
                {/* Controles de reproducción */}
                <div className="flex items-center gap-4 mt-4 md:mt-0">
                  <button
                    onClick={() => handlePlay(work.id)}
                    className="flex items-center justify-center w-12 h-12 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                    disabled={currentlyPlaying !== null && currentlyPlaying !== work.id}
                  >
                    {currentlyPlaying === work.id ? (
                      <Pause size={16} />
                    ) : (
                      <Play size={16} className="ml-1" />
                    )}
                  </button>
                  
                  <button className="flex items-center justify-center w-12 h-12 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
                    <ExternalLink size={16} />
                  </button>
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed">
                {work.description}
              </p>
              
              {/* Barra de progreso cuando está reproduciéndose */}
              {currentlyPlaying === work.id && (
                <div className="mt-6">
                  <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-black rounded-full animate-pulse"
                      style={{ width: '30%' }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Reproduciendo muestra...</p>
                </div>
              )}
            </article>
          ))}
        </div>
        
        {filteredWorks.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              No hay trabajos en esta categoría.
            </p>
          </div>
        )}
        
        {/* Nota sobre reproducción */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            Los botones de reproducción muestran muestras breves de las obras. 
            Para escuchar las composiciones completas o experimentar las instalaciones, 
            contacta directamente con el artista.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Works;

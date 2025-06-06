import React from 'react';
import { Mail, ExternalLink, Award, Users, Calendar } from 'lucide-react';

const About: React.FC = () => {
  const achievements = [
    {
      icon: <Award size={20} />,
      title: 'Premio de Arte Sonoro 2023',
      description: 'Reconocimiento por la instalación "φ" en el Festival Internacional de Arte Digital'
    },
    {
      icon: <Users size={20} />,
      title: 'Residencia Artística',
      description: 'Seleccionado para residencia en el Centro de Arte Experimental (2022-2023)'
    },
    {
      icon: <Calendar size={20} />,
      title: 'Exposiciones',
      description: 'Participación en más de 15 exposiciones y festivales internacionales'
    }
  ];

  const education = [
    {
      period: '2018-2020',
      title: 'Maestría en Arte Sonoro',
      institution: 'Instituto Superior de Artes Digitales'
    },
    {
      period: '2014-2018',
      title: 'Licenciatura en Composición Musical',
      institution: 'Conservatorio Nacional de Música'
    },
    {
      period: '2019',
      title: 'Curso de Especialización',
      institution: 'Técnicas Avanzadas de Síntesis Sonora - IRCAM París'
    }
  ];

  const collaborations = [
    'Orquesta Sinfónica Nacional',
    'Colectivo de Arte Digital "Pixeles"',
    'Festival Internacional de Música Electroacústica',
    'Centro de Investigación Sonora Experimental'
  ];

  return (
    <div className="min-h-screen bg-white pt-20 md:pt-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <header className="mb-16 text-center">
          <div className="w-32 h-32 bg-gray-100 rounded-full mx-auto mb-8 flex items-center justify-center">
            <span className="text-4xl font-light" style={{ fontFamily: 'Georgia, serif' }}>
              φ
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-light mb-6 tracking-wide">
            Sobre el Artista
          </h1>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Artista sonoro dedicado a la exploración de espacios acústicos y la creación 
              de experiencias inmersivas que desafían la percepción tradicional del sonido.
            </p>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Columna principal */}
          <div className="lg:col-span-2 space-y-12">
            {/* Bio */}
            <section>
              <h2 className="text-2xl font-light mb-6 border-b border-gray-200 pb-2">
                Biografía
              </h2>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p>
                  Mi trabajo se centra en la investigación de los límites entre el sonido y el silencio, 
                  explorando cómo estas fronteras definen nuestra experiencia del espacio y el tiempo. 
                  A través de composiciones electroacústicas, instalaciones interactivas y performances 
                  en vivo, busco crear momentos de contemplación y asombro.
                </p>
                <p>
                  Fascinado por la proporción áurea y su manifestación en fenómenos naturales, 
                  adopté el símbolo φ (phi) como representación de mi búsqueda artística: 
                  la armonía perfecta entre elementos aparentemente opuestos.
                </p>
                <p>
                  Mi proceso creativo combina técnicas tradicionales de composición con tecnologías 
                  emergentes, siempre manteniendo el foco en la experiencia humana del sonido. 
                  Cada obra es una invitación a redescubrir nuestra relación con el entorno acústico.
                </p>
              </div>
            </section>

            {/* Filosofía artística */}
            <section>
              <h2 className="text-2xl font-light mb-6 border-b border-gray-200 pb-2">
                Filosofía Artística
              </h2>
              <div className="bg-gray-50 p-8 rounded-2xl">
                <blockquote className="text-lg font-light italic text-gray-800 leading-relaxed">
                  "El sonido no solo llena el espacio, lo transforma. Mi trabajo busca revelar 
                  las dimensiones ocultas de nuestro entorno acústico, creando puentes entre 
                  lo audible y lo sentido, lo consciente y lo intuitivo."
                </blockquote>
              </div>
            </section>

            {/* Reconocimientos */}
            <section>
              <h2 className="text-2xl font-light mb-6 border-b border-gray-200 pb-2">
                Reconocimientos
              </h2>
              <div className="space-y-6">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center">
                      {achievement.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">
                        {achievement.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-12">
            {/* Contacto */}
            <section>
              <h3 className="text-xl font-light mb-6 border-b border-gray-200 pb-2">
                Contacto
              </h3>
              <div className="space-y-4">
                <a 
                  href="mailto:contacto@phiartist.com"
                  className="flex items-center space-x-3 text-gray-600 hover:text-black transition-colors"
                >
                  <Mail size={18} />
                  <span>contacto@phiartist.com</span>
                </a>
                <a 
                  href="#"
                  className="flex items-center space-x-3 text-gray-600 hover:text-black transition-colors"
                >
                  <ExternalLink size={18} />
                  <span>Portfolio Completo</span>
                </a>
              </div>
            </section>

            {/* Formación */}
            <section>
              <h3 className="text-xl font-light mb-6 border-b border-gray-200 pb-2">
                Formación
              </h3>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index}>
                    <div className="text-sm text-gray-500 mb-1">
                      {edu.period}
                    </div>
                    <div className="font-medium text-gray-900 mb-1">
                      {edu.title}
                    </div>
                    <div className="text-sm text-gray-600">
                      {edu.institution}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Colaboraciones */}
            <section>
              <h3 className="text-xl font-light mb-6 border-b border-gray-200 pb-2">
                Colaboraciones
              </h3>
              <div className="space-y-3">
                {collaborations.map((collab, index) => (
                  <div key={index} className="text-sm text-gray-600">
                    • {collab}
                  </div>
                ))}
              </div>
            </section>

            {/* Ubicación */}
            <section>
              <h3 className="text-xl font-light mb-6 border-b border-gray-200 pb-2">
                Ubicación
              </h3>
              <div className="text-gray-600">
                <p className="mb-2">Basado en Barcelona, España</p>
                <p className="text-sm">
                  Disponible para proyectos internacionales
                </p>
              </div>
            </section>
          </div>
        </div>

        {/* Call to action */}
        <section className="mt-16 text-center bg-black text-white p-12 rounded-2xl">
          <h2 className="text-2xl font-light mb-4">
            ¿Interesado en colaborar?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Siempre abierto a nuevos proyectos, colaboraciones artísticas 
            y exploraciones sonoras. Conectemos para crear algo único.
          </p>
          <a 
            href="mailto:contacto@phiartist.com"
            className="inline-flex items-center px-8 py-3 bg-white text-black hover:bg-gray-100 transition-colors rounded-full"
          >
            <Mail size={16} className="mr-2" />
            Iniciar Conversación
          </a>
        </section>
      </div>
    </div>
  );
};

export default About;

// Archivo para gestionar los posts del blog
// Para agregar un nuevo post, simplemente agrega un objeto al array blogPosts
export interface BlogPost {
id: string;
title: string;
content: string;
date: string;
excerpt: string;
tags?: string[];
}
export const blogPosts: BlogPost[] = [
{
id: '3',
title: 'La Geometría del Silencio',
excerpt: 'Explorando cómo los espacios vacíos en la música pueden ser tan expresivos como las notas mismas.',
content: `El silencio no es la ausencia de sonido, sino su complemento más profundo. En mis últimas composiciones he estado trabajando con lo que llamo "geometría del silencio" - la forma en que los espacios vacíos crean estructuras tan sólidas como las más densas texturas sonoras.
Cada pausa tiene su peso específico, su densidad emocional. Un silencio de dos segundos después de un crescendo no es igual que el mismo silencio después de un susurro. La diferencia no está en la duración, sino en la expectativa que genera.
He comenzado a mapear estos silencios como si fueran objetos tridimensionales, con volumen, textura y temperatura. Algunos silencios son fríos y metálicos, otros cálidos y envolventes. Esta materialización del vacío me permite componer con él como si fuera otro instrumento.`,
date: '2024-12-15',
tags: ['silencio', 'composición', 'proceso creativo']
},
{
id: '2',
title: 'Reflexiones sobre el Espacio Sonoro',
excerpt: 'Una exploración de cómo el sonido define y transforma nuestros espacios íntimos.',
content: `El espacio sonoro es más que un concepto acústico; es una dimensión emocional y perceptiva que nos conecta con lo invisible. En mis últimas composiciones, he estado explorando cómo los silencios pueden ser tan elocuentes como los sonidos más intensos.
Cada obra nace de la observación del entorno, de la escucha atenta de esos momentos donde el mundo parece suspenderse. Es en esa suspensión donde encuentro la materia prima de mi trabajo: la tensión entre lo que se oye y lo que se siente.
El espacio no es solo el contenedor del sonido, sino su co-creador. Una misma pieza suena completamente diferente en una catedral gótica que en un estudio de grabación. Esta variabilidad no es un problema a resolver, sino una característica fundamental que abrazo en mi trabajo.
Recientemente he estado experimentando con grabaciones de campo realizadas en diferentes arquitecturas, no para documentar sus sonidos, sino para capturar sus silencios específicos. Cada lugar tiene su propia forma de estar en silencio.`,
date: '2024-11-28',
tags: ['espacio', 'arquitectura sonora', 'grabación de campo']
},
{
id: '1',
title: 'Proceso Creativo: Entre el Control y el Azar',
excerpt: 'Cómo equilibrar la intención artística con los elementos aleatorios en la composición sonora.',
content: `Mi proceso creativo se mueve constantemente entre dos polos: el control absoluto de cada elemento y la apertura total al azar. Esta tensión no es un conflicto, sino el motor de mis obras.
Trabajo con sistemas que permiten que el sonido evolucione de manera impredecible, pero dentro de parámetros que defino cuidadosamente. Es como crear un jardín: plantas las semillas, preparas el terreno, pero no puedes controlar exactamente cómo crecerá cada planta.
En mis últimas piezas he desarrollado lo que llamo "algoritmos orgánicos" - sistemas de generación que imitan procesos naturales. No se trata de usar tecnología por usar, sino de encontrar en ella metáforas para fenómenos que me interesan: la erosión, el crecimiento celular, los patrones fractales.
El azar controlado me permite sorprenderme a mí mismo. Hay momentos en el estudio donde escucho algo que técnicamente yo he creado, pero que nunca podría haber imaginado conscientemente. Esos son los momentos más preciados del proceso creativo.`,
date: '2024-10-15',
tags: ['proceso', 'azar', 'algoritmos', 'generative']
}
];
// Función para obtener un post por ID
export const getPostById = (id: string): BlogPost | undefined => {
return blogPosts.find(post => post.id === id);
};
// Función para obtener posts por tag
export const getPostsByTag = (tag: string): BlogPost[] => {
return blogPosts.filter(post => post.tags?.includes(tag));
};
// Función para obtener todos los tags únicos
export const getAllTags = (): string[] => {
const allTags = blogPosts.flatMap(post => post.tags || []);
return [...new Set(allTags)].sort();
};

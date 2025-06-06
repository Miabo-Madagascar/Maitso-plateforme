import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Search, Calendar, User, ArrowRight } from 'lucide-react';
import { formatDate } from '../lib/utils';

// Sample blog posts
const blogPosts = [
  {
    id: 1,
    title: "L'intelligence artificielle au service de l'écologie",
    excerpt: "Comment l'IA peut aider à lutter contre le changement climatique et optimiser l'utilisation des ressources naturelles.",
    category: "IA",
    author: "Rakoto Jean",
    date: new Date(2025, 2, 15),
    image: "https://images.pexels.com/photos/8438923/pexels-photo-8438923.jpeg?auto=compress&cs=tinysrgb&w=1600"
  },
  {
    id: 2,
    title: "5 manières de réduire votre empreinte carbone au bureau",
    excerpt: "Des astuces pratiques pour rendre votre environnement de travail plus écologique et réduire son impact environnemental.",
    category: "Conseils",
    author: "Rasoamanana Soa",
    date: new Date(2025, 2, 8),
    image: "https://images.pexels.com/photos/5498296/pexels-photo-5498296.jpeg?auto=compress&cs=tinysrgb&w=1600"
  },
  {
    id: 3,
    title: "Les énergies renouvelables à Madagascar : état des lieux",
    excerpt: "Un aperçu des progrès et défis dans le développement des énergies renouvelables à Madagascar.",
    category: "Énergie",
    author: "Rakotonirina Michel",
    date: new Date(2025, 1, 25),
    image: "https://images.pexels.com/photos/7790181/pexels-photo-7790181.jpeg?auto=compress&cs=tinysrgb&w=1600"
  },
  {
    id: 4,
    title: "L'IoT pour une agriculture plus durable",
    excerpt: "Comment les capteurs et l'Internet des objets révolutionnent l'agriculture en la rendant plus efficace et respectueuse de l'environnement.",
    category: "IoT",
    author: "Rakotondrabe Faly",
    date: new Date(2025, 1, 12),
    image: "https://images.pexels.com/photos/4417769/pexels-photo-4417769.jpeg?auto=compress&cs=tinysrgb&w=1600"
  },
  {
    id: 5,
    title: "Repenser la mobilité urbaine à Antananarivo",
    excerpt: "Des solutions innovantes pour réduire la congestion et la pollution dans la capitale malgache.",
    category: "Mobilité",
    author: "Razafindrabe Hasina",
    date: new Date(2025, 0, 30),
    image: "https://images.pexels.com/photos/3254983/pexels-photo-3254983.jpeg?auto=compress&cs=tinysrgb&w=1600"
  },
  {
    id: 6,
    title: "Le recyclage des déchets électroniques : un enjeu majeur",
    excerpt: "Pourquoi et comment recycler correctement vos appareils électroniques usagés.",
    category: "Recyclage",
    author: "Rakoto Jean",
    date: new Date(2025, 0, 15),
    image: "https://images.pexels.com/photos/7659764/pexels-photo-7659764.jpeg?auto=compress&cs=tinysrgb&w=1600"
  }
];

// Categories for filtering
const categories = [
  { id: 'all', name: 'Tous' },
  { id: 'IA', name: 'Intelligence Artificielle' },
  { id: 'IoT', name: 'Internet des Objets' },
  { id: 'Énergie', name: 'Énergies Renouvelables' },
  { id: 'Conseils', name: 'Conseils Pratiques' },
  { id: 'Recyclage', name: 'Recyclage' },
  { id: 'Mobilité', name: 'Mobilité Durable' }
];

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = blogPosts
    .filter(post => selectedCategory === 'all' || post.category === selectedCategory)
    .filter(post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="pt-24 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-green-600 dark:bg-green-800">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Blog et Sensibilisation
            </h1>
            <p className="text-green-100 md:text-lg">
              Découvrez nos articles, guides et conseils sur l'écologie, la technologie verte et le développement durable.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Search */}
              <div className="mb-8">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Catégories
                </h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`block px-3 py-2 rounded-md w-full text-left ${
                        selectedCategory === category.id
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400'
                          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Newsletter
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                  Recevez nos derniers articles et conseils directement dans votre boîte mail.
                </p>
                <input
                  type="email"
                  placeholder="Votre email"
                  className="block w-full mb-2 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
                <Button className="w-full">S'abonner</Button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            {/* Display search results count */}
            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-400">
                {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} trouvé{filteredPosts.length !== 1 ? 's' : ''}
                {selectedCategory !== 'all' && ` dans ${categories.find(c => c.id === selectedCategory)?.name}`}
                {searchQuery && ` pour "${searchQuery}"`}
              </p>
            </div>

            {/* Blog posts grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPosts.map(post => (
                <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow duration-300" hover>
                  <div className="aspect-w-16 aspect-h-9 relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="inline-block bg-green-600 text-white text-xs px-2 py-1 rounded">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{formatDate(post.date)}</span>
                        <span className="mx-2">•</span>
                        <User className="h-4 w-4 mr-1" />
                        <span>{post.author}</span>
                      </div>
                      <Link to={`/blog/${post.id}`} className="text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400 inline-flex items-center">
                        <span>Lire</span>
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Aucun article trouvé pour cette recherche.
                </p>
                <Button onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}>
                  Réinitialiser les filtres
                </Button>
              </div>
            )}

            {filteredPosts.length > 0 && (
              <div className="mt-8 flex justify-center">
                <Button variant="outline">
                  Charger plus d'articles
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;

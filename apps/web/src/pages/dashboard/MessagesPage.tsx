import React, { useState } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { User, Clock, X, Send } from 'lucide-react';

const messages = [
  {
    id: 1,
    sender: "Support MAITSO",
    content: "Bonjour ! Comment pouvons-nous vous aider aujourd'hui ?",
    timestamp: "Il y a 2 heures",
    unread: true
  },
  {
    id: 2,
    sender: "Équipe Formation",
    content: "Nouveau module de formation disponible sur les énergies renouvelables !",
    timestamp: "Hier",
    unread: false
  },
  {
    id: 3,
    sender: "Système IA",
    content: "Nouvelles recommandations disponibles basées sur vos dernières données.",
    timestamp: "Il y a 2 jours",
    unread: false
  }
];

const MessagesPage = () => {
  const [isNewMessageOpen, setIsNewMessageOpen] = useState(false);
  const [newMessage, setNewMessage] = useState({
    recipient: '',
    subject: '',
    content: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the message to your backend
    console.log('New message:', newMessage);
    setNewMessage({ recipient: '', subject: '', content: '' });
    setIsNewMessageOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Messagerie
        </h1>
        <Button onClick={() => setIsNewMessageOpen(true)}>
          Nouveau message
        </Button>
      </div>
      
      <div className="space-y-4">
        {messages.map((message) => (
          <Card 
            key={message.id} 
            className={`hover:shadow-md transition-shadow ${
              message.unread ? 'border-l-4 border-green-500' : ''
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-700 dark:text-green-400">
                    <User className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {message.sender}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {message.content}
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="h-4 w-4 mr-1" />
                  {message.timestamp}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* New Message Modal */}
      {isNewMessageOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Nouveau message
              </h2>
              <button
                onClick={() => setIsNewMessageOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Destinataire
                  </label>
                  <input
                    type="text"
                    value={newMessage.recipient}
                    onChange={(e) => setNewMessage({ ...newMessage, recipient: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Nom du destinataire"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Sujet
                  </label>
                  <input
                    type="text"
                    value={newMessage.subject}
                    onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Sujet du message"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    value={newMessage.content}
                    onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Votre message..."
                    required
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsNewMessageOpen(false)}
                >
                  Annuler
                </Button>
                <Button type="submit">
                  <Send className="h-4 w-4 mr-2" />
                  Envoyer
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesPage;
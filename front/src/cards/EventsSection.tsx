import React, { useState } from "react";
import {
  Plus,
  Calendar,
  Users,
  ChevronDown,
  ChevronUp,
  MapPin,
  User,
  LinkIcon,
} from "lucide-react";

const MOCK_EVENTS = [
  {
    title: "Réunion d'équipe",
    date: "15 Juin 2023",
    time: "10:00",
    responsible: "Marie Dupont",
    location: "Salle A",
    link: "https://meet.example.com/team-meeting",
    type: "réunion",
    attendees: 12,
    priority: "high",
    description:
      "Réunion hebdomadaire pour faire le point sur les projets en cours et planifier les prochaines étapes.",
  },
  {
    title: "Présentation client",
    date: "17 Juin 2023",
    time: "14:30",
    responsible: "Pierre Martin",
    location: "Salle B",
    link: "https://meet.example.com/client-presentation",
    type: "présentation",
    attendees: 8,
    priority: "medium",
    description:
      "Présentation des nouvelles fonctionnalités au client principal. Préparer les démonstrations et les supports visuels.",
  },
  {
    title: "Formation technique",
    date: "20 Juin 2023",
    time: "09:00",
    responsible: "Sophie Lambert",
    location: "Espace formation",
    link: "https://meet.example.com/tech-training",
    type: "formation",
    attendees: 20,
    priority: "low",
    description:
      "Session de formation sur les nouvelles technologies et outils adoptés par l'entreprise.",
  },
  {
    title: "Atelier brainstorming",
    date: "22 Juin 2023",
    time: "11:00",
    responsible: "Lucas Bernard",
    location: "Salle C",
    link: "https://meet.example.com/brainstorming",
    type: "atelier",
    attendees: 15,
    priority: "medium",
    description:
      "Atelier collaboratif pour générer de nouvelles idées et solutions pour les projets à venir.",
  },
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-100/70 text-red-900";
    case "medium":
      return "bg-yellow-100/70 text-yellow-900";
    case "low":
      return "bg-green-100/70 text-green-900";
    default:
      return "bg-gray-100/70 text-gray-800";
  }
};

interface Event {
  title: string;
  date: string;
  time: string;
  responsible: string;
  location: string;
  link: string;
  type: string;
  attendees: number;
  priority: string;
  description: string;
}

const EventsSection: React.FC = () => {
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  const toggleEvent = (index: number) => {
    setExpandedEvent(expandedEvent === index ? null : index);
  };

  return (
    <div className="w-full h-screen p-3 sm:p-4 bg-white/30 backdrop-blur-xl border border-white/30 shadow-lg text-gray-900 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base sm:text-lg font-bold flex items-center gap-2 text-indigo-900">
          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
          Événements
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1 sm:gap-2 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-lg px-3 py-2 sm:px-4 sm:py-2 shadow-md hover:brightness-110 transition text-xs sm:text-sm"
        >
          <Plus className="w-4 h-4" />
          Nouveau
        </button>
      </div>

      {/* Formulaire */}
      {showForm && (
        <div className="mb-4 p-3 bg-white/70 backdrop-blur-md border border-white/40 rounded-xl shadow-md">
          <h3 className="font-semibold text-indigo-900 mb-2 text-sm">
            Ajouter un événement
          </h3>
          <form className="grid gap-2 text-sm">
            <input
              type="text"
              placeholder="Titre"
              className="p-2 rounded-lg border bg-white/80 focus:ring-2 focus:ring-indigo-500"
            />
            <div className="flex gap-2">
              <input
                type="date"
                className="p-2 rounded-lg border bg-white/80 w-1/2 focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="time"
                className="p-2 rounded-lg border bg-white/80 w-1/2 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <input
              type="text"
              placeholder="Responsable"
              className="p-2 rounded-lg border bg-white/80 focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              placeholder="Lieu"
              className="p-2 rounded-lg border bg-white/80 focus:ring-2 focus:ring-indigo-500"
            />
            <textarea
              placeholder="Description"
              rows={2}
              className="p-2 rounded-lg border bg-white/80 resize-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="w-full py-2 bg-green-600 rounded-lg text-white font-semibold hover:bg-green-700 transition text-sm"
            >
              Enregistrer
            </button>
          </form>
        </div>
      )}

      {/* Liste des événements en grille 2x2 */}
      <div className="flex-1 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
        {MOCK_EVENTS.map((e: Event, i: number) => (
          <div
            key={i}
            className="rounded-lg border border-white/30 bg-white/30 backdrop-blur-md shadow-md hover:shadow-lg transition cursor-pointer p-3 text-sm flex flex-col justify-between"
            onClick={() => toggleEvent(i)}
          >
            <div>
              <h3 className="font-semibold text-indigo-900 text-sm sm:text-base">{e.title}</h3>
              <div className="flex flex-wrap items-center gap-2 mt-1 text-indigo-700 text-xs">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> {e.date} {e.time}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> {e.location}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" /> {e.attendees} participant{e.attendees > 1 ? "s" : ""}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center mt-2">
              <div className="flex flex-col gap-1">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${getPriorityColor(e.priority)}`}>
                  {e.priority === "high" ? "Haute" : e.priority === "medium" ? "Moyenne" : "Basse"}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 text-[10px] capitalize font-medium">
                  {e.type}
                </span>
              </div>

              <div className="text-indigo-500 text-[11px] select-none flex items-center gap-1">
                {expandedEvent === i ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </div>

            {expandedEvent === i && (
              <div className="mt-2 pt-2 border-t border-white/40 text-indigo-900">
                <p className="text-xs mb-2 flex items-center gap-1">
                  <User className="w-4 h-4" /> Responsable : <strong>{e.responsible}</strong>
                </p>
                <p className="text-xs mb-3">{e.description}</p>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-blue-600 rounded-lg text-white text-xs font-semibold hover:bg-blue-700">
                    Participer
                  </button>
                  <a
                    href={e.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => event.stopPropagation()}
                    className="px-3 py-1 bg-gray-600 rounded-lg text-white text-xs font-semibold hover:bg-gray-700 flex items-center gap-1"
                  >
                    <LinkIcon className="w-3 h-3" /> Rejoindre
                  </a>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsSection;

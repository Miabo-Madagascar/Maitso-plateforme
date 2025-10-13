# Backend MAITSO

API Node.js pour récupérer, analyser et prédire les données de capteurs.
Ce projet utilise Express.js, DynamoDB et communique avec un service de prédiction ML externe.

---

## Table des matières

- [Fonctionnalités](#fonctionnalités)
- [Technologies](#technologies)
- [Installation](#installation)
- [Configuration](#configuration)
- [Démarrage](#démarrage)
- [Endpoints](#endpoints)
- [Exemple de réponse de prédiction](#exemple-de-réponse-de-prédiction)
- [Contributions](#contributions)

---

## Fonctionnalités

- Récupération de toutes les données ou données filtrées par device_id, timestamp, période.
- Support du filtrage par intervalle de temps et par métriques.
- Pagination des résultats.
- Calcul de moyennes (`avg`) et statistiques (`min`, `max`, `avg`) par device et par période (`hour`, `day`, `week`, `month`).
- Récupération de la dernière donnée d’un capteur.
- Prédictions via un modèle ML (`lstm` ou `cnn`) pour un device spécifique.
- Support des recommandations et alertes basées sur les prédictions.

---

## Technologies

- Node.js
- Express.js
- Axios
- DynamoDB
- OpenAPI 3.0 (pour la documentation API)

---

## Installation

```bash
git clone https://github.com/ton-utilisateur/sensors-api.git
cd sensors-api
npm install
```

---

## Configuration

Créer un fichier `.env` à la racine du projet avec les variables suivantes :

```bash
PORT=8080
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_region
DYNAMO_TABLE_NAME=your_table_name
PREDICTION_SERVICE_URL=http://localhost:8000/predict
```

---

## Démarrage

```bash
npm start
```

Le serveur tourne par défaut sur `http://localhost:8080`.

---

## Endpoints

### Données capteurs

* `GET /sensors/data` : Récupère toutes les données, supporte `from`, `to`, `metrics`, `group_by`, `limit`, `page`.
* `GET /sensors/data/{device_id}` : Données d’un capteur spécifique.
* `GET /sensors/data/{device_id}/timestamp/{ts}` : Données à un timestamp précis.
* `GET /sensors/data/{device_id}/latest` : Dernière donnée d’un capteur.
* `GET /sensors/data/{device_id}/avg` : Moyenne des métriques pour un capteur.
* `GET /sensors/data/{device_id}/stats` : Statistiques des métriques pour un capteur.

### Prédiction

* `POST /sensors/{device_id}/predict` : Prédiction ML pour un device avec `model_type` (`lstm` ou `cnn`).

---

## Exemple de réponse de prédiction

```json
{
  "model": "lstm",
  "prediction": {
    "TMP": 24.5945,
    "HUM": 60.4184,
    "PCO": 460.5865,
    "TCO": 1.5933,
    "BR": 120.3443,
    "PA": 1012.8773,
    "EAU": 9480.0918,
    "DEC_ORG": 97.6083,
    "DEC_MGP": 48.2943,
    "DEC_PAP": 37.9784
  },
  "risk_score": 0.6098,
  "alerts": {
    "ALERT_CO2": false
  },
  "recommendation": [
    {
      "TS": "2025-10-13",
      "ALERT_RSE": 1,
      "priority": 4,
      "domain": "env/éco",
      "recommendation": "Upcycling plastique + contrat recyclage renforcé"
    },
    {
      "TS": "2025-10-13",
      "ALERT_RSE": 1,
      "priority": 3,
      "domain": "social",
      "recommendation": "Traitement acoustique + EPI + plages horaires"
    }
  ]
}
```

---

import { Tool } from '@/types'

export const tools: Tool[] = [
  {
    slug: 'chatgpt',
    name: 'ChatGPT',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/240px-ChatGPT_logo.svg.png',
    category: 'Productivité',
    tagline: 'L\'assistant IA de référence. Le point de départ obligatoire.',
    rating: 5,
    verdict: 'Incontournable. Si vous ne devez utiliser qu\'un seul outil IA, c\'est celui-là.',
    pricing: 'Gratuit / 20€/mois (Plus)',
    affiliateUrl: 'https://chat.openai.com',
    affiliateLabel: 'Essayer ChatGPT',
    content: `
## Qu'est-ce que ChatGPT ?

ChatGPT est l'assistant IA conversationnel développé par OpenAI. C'est l'outil qui a popularisé l'IA auprès du grand public fin 2022, et il reste aujourd'hui la référence absolue.

## Ce qu'il fait

ChatGPT peut rédiger, analyser, coder, traduire, résumer, expliquer, brainstormer — et bien plus encore. C'est un couteau suisse intellectuel disponible 24h/24.

**Cas d'usage principaux :**
- Rédaction et reformulation de textes
- Réponse à des questions complexes
- Génération d'idées et brainstorming
- Analyse de documents et données
- Aide à la programmation

## Version gratuite vs Plus

La version gratuite (GPT-3.5) est déjà très capable pour la plupart des usages quotidiens.

La version Plus à 20€/mois donne accès à GPT-4o — nettement plus puissant pour les tâches complexes, l'analyse et la génération de contenu de qualité.

## Points forts

- Interface simple et intuitive
- Capacités extraordinairement larges
- Amélioration continue et rapide
- Mémoire des conversations (version Plus)

## Points faibles

- Peut "halluciner" des informations fausses
- Connaissance limitée des événements récents (version de base)
- Nécessite de bonnes instructions pour de bons résultats

## Verdict

Si vous ne devez commencer qu'avec un seul outil IA, c'est ChatGPT. Commencez par la version gratuite, passez à Plus quand vous en aurez besoin.
    `.trim(),
  },
  {
    slug: 'perplexity',
    name: 'Perplexity AI',
    logo: 'https://www.perplexity.ai/favicon.ico',
    category: 'Productivité',
    tagline: 'Le moteur de recherche IA qui cite ses sources. Google version 2.0.',
    rating: 4,
    verdict: 'Remplace Google pour toute recherche qui nécessite une vraie synthèse. Indispensable.',
    pricing: 'Gratuit / 20$/mois (Pro)',
    affiliateUrl: 'https://perplexity.ai',
    affiliateLabel: 'Essayer Perplexity',
    content: `
## Qu'est-ce que Perplexity ?

Perplexity est un moteur de recherche alimenté par l'IA. Contrairement à ChatGPT qui répond depuis sa mémoire d'entraînement, Perplexity cherche sur internet en temps réel et cite ses sources.

## Ce qu'il fait

Vous posez une question, Perplexity cherche sur le web, synthétise les informations et vous donne une réponse structurée avec les liens sources.

**Cas d'usage principaux :**
- Recherche d'informations récentes
- Veille sur un sujet ou une industrie
- Vérification de faits
- Résumé de l'actualité

## Pourquoi c'est différent de Google

Google vous donne une liste de liens. Perplexity vous donne une réponse directe avec les sources. Vous économisez 80% du temps de lecture.

## Points forts

- Sources citées et vérifiables
- Informations à jour en temps réel
- Interface claire et épurée
- Version gratuite très complète

## Points faibles

- Moins créatif que ChatGPT pour la rédaction
- Parfois trop concis pour les sujets complexes

## Verdict

Utilisez Perplexity pour tout ce qui touche à la recherche d'informations. Utilisez ChatGPT pour tout ce qui touche à la création et à la réflexion. Les deux sont complémentaires.
    `.trim(),
  },
  {
    slug: 'make',
    name: 'Make.com',
    logo: 'https://www.make.com/en/help/image/uuid-d56e970a-7218-4141-aa17-d6cf5f8aaa75.png',
    category: 'Automatisation',
    tagline: 'Automatisez tout sans coder. Connectez vos outils entre eux en quelques clics.',
    rating: 5,
    verdict: 'L\'outil d\'automatisation le plus puissant et accessible du marché. Transforme votre façon de travailler.',
    pricing: 'Gratuit (1000 ops/mois) / 9€/mois',
    affiliateUrl: 'https://make.com',
    affiliateLabel: 'Essayer Make gratuitement',
    content: `
## Qu'est-ce que Make.com ?

Make (anciennement Integromat) est un outil d'automatisation no-code. Il permet de connecter vos applications entre elles et de créer des workflows automatisés sans écrire une ligne de code.

## Ce qu'il fait

Imaginez que chaque fois qu'un client remplit votre formulaire de contact, son information est automatiquement ajoutée dans votre CRM, un email de confirmation lui est envoyé, et vous recevez une notification sur Slack. Tout ça sans que vous fassiez quoi que ce soit.

C'est Make.

**Automatisations populaires :**
- Formulaire → CRM automatique
- Email → tâche dans Notion/Trello
- Publication sociale media automatisée
- Facturation automatique
- Notifications et alertes personnalisées

## Pourquoi Make plutôt que Zapier ?

Make est plus puissant, plus flexible, et moins cher que Zapier. L'interface visuelle est plus intuitive pour les workflows complexes.

## Points forts

- Interface visuelle drag-and-drop
- Plus de 1000 applications connectables
- Version gratuite généreuse
- Scénarios complexes possibles

## Points faibles

- Courbe d'apprentissage initiale (2-3 heures)
- Peut devenir complexe pour les workflows avancés

## Verdict

Make est l'outil qui fait le plus grande différence dans la productivité quotidienne. Commencez par une automatisation simple (ex: formulaire → email), et vous serez accro en moins d'une heure.
    `.trim(),
  },
]

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find(t => t.slug === slug)
}

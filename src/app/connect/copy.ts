/**
 * The connect page's words, by the browser's language, because this one page talks to a cook about
 * their account. The words never name a particular assistant: any MCP client can connect, and the
 * name a client gives is its own claim, so it appears only on the approval screen, marked as such.
 */
export type Copy = {
  loading: string
  genericFailure: string
  notConfigured: string
  framed: string
  signInTitle: string
  signInBody: string
  signInFailed: string
  google: string
  apple: string
  or: string
  approveTitle: (client: string) => string
  selfReported: string
  sendsYouBackTo: (host: string) => string
  account: (email: string) => string
  noEmail: string
  household: (name: string) => string
  notYou: string
  allow: string
  refuse: string
  noHousehold: string
  allowedTitle: string
  allowedBody: string
  refusedTitle: string
  refusedBody: string
  expiredTitle: string
  expiredBody: string
  connectionsTitle: string
  noConnections: string
  disconnect: string
}

export const COPY: Record<"en" | "fr", Copy> = {
  en: {
    loading: "One moment…",
    genericFailure: "Something went wrong. Try again.",
    notConfigured: "This page is not available right now.",
    framed: "Open this page in its own tab to continue.",
    signInTitle: "Sign in to Cuisko",
    signInBody: "Use the account you use in the app. Your assistant never sees your sign-in.",
    signInFailed: "That sign-in did not work. Try again.",
    google: "Continue with Google",
    apple: "Continue with Apple",
    or: "or",
    approveTitle: (client) => `Connect ${client} to Cuisko?`,
    selfReported: "This name is what the assistant says about itself.",
    sendsYouBackTo: (host) => `It will send you back to ${host}.`,
    account: (email) => `Signed in as ${email}`,
    noEmail: "your account",
    household: (name) => `Meals go on the week of ${name}`,
    notYou: "Not you?",
    allow: "Allow",
    refuse: "Refuse",
    noHousehold: "Create a household in the app first, then try again.",
    allowedTitle: "Connected",
    allowedBody: "Going back to your assistant.",
    refusedTitle: "Nothing was connected",
    refusedBody: "Going back to your assistant.",
    expiredTitle: "This request has ended",
    expiredBody: "Start again from your assistant.",
    connectionsTitle: "Connected assistants",
    noConnections: "Nothing is connected to your account.",
    disconnect: "Disconnect",
  },
  fr: {
    loading: "Un instant…",
    genericFailure: "Quelque chose n'a pas marché. Réessaie.",
    notConfigured: "Cette page n'est pas disponible pour le moment.",
    framed: "Ouvre cette page dans son propre onglet pour continuer.",
    signInTitle: "Connexion à Cuisko",
    signInBody: "Utilise le compte de l'app. Ton assistant ne voit jamais ta connexion.",
    signInFailed: "La connexion n'a pas marché. Réessaie.",
    google: "Continuer avec Google",
    apple: "Continuer avec Apple",
    or: "ou",
    approveTitle: (client) => `Connecter ${client} à Cuisko ?`,
    selfReported: "Ce nom est celui que l'assistant se donne lui-même.",
    sendsYouBackTo: (host) => `Il te renverra vers ${host}.`,
    account: (email) => `Connecté en tant que ${email}`,
    noEmail: "ton compte",
    household: (name) => `Les repas iront sur la semaine de ${name}`,
    notYou: "Ce n'est pas toi ?",
    allow: "Autoriser",
    refuse: "Refuser",
    noHousehold: "Crée d'abord un foyer dans l'app, puis réessaie.",
    allowedTitle: "C'est connecté",
    allowedBody: "Retour vers ton assistant.",
    refusedTitle: "Rien n'a été connecté",
    refusedBody: "Retour vers ton assistant.",
    expiredTitle: "Cette demande est terminée",
    expiredBody: "Recommence depuis ton assistant.",
    connectionsTitle: "Assistants connectés",
    noConnections: "Rien n'est connecté à ton compte.",
    disconnect: "Déconnecter",
  },
}

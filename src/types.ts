export interface InvitationData {
  childName: string;
  age: number;
  date: string; // e.g., "2026-06-20"
  time: string; // e.g., "17:00"
  locationName: string; // e.g., "Salón de Fiestas 'Mis Dulces Pasos'"
  locationAddress: string; // e.g., "Av. Libertador 1420, Palermo, CABA"
  locationUrl: string; // Google Maps URL
  theme: 'blue' | 'pink' | 'green' | 'peach';
  welcomePhrase: string; // e.g. "¡Hola! Te invito a soplar mi primer velita..."
  hasGiftTable: boolean;
  giftDetailsType: 'alias' | 'box' | 'other';
  giftAlias: string;
  giftCbu: string;
  giftBank: string;
  whatsappContact: string; // Number to receive RSVPs
  musicPlaying: boolean;
}

export interface RSVPResponse {
  guestName: string;
  confirmed: boolean;
  dietRestrictions: string;
  customMessage: string;
  plusOnes: number;
}

export type ThemeColors = {
  primary: string;
  secondary: string;
  bg: string;
  cardBg: string;
  accent: string;
  text: string;
  textMuted: string;
  gradientFrom: string;
  gradientTo: string;
  badge: string;
};

import React, { useState } from 'react';
import { InvitationData } from './types';
import InvitationPreview from './components/InvitationPreview';
import RSVPModal from './components/RSVPModal';
import GiftsModal from './components/GiftsModal';

export default function App() {
  // Configuración de la invitación para los invitados (fija y lista para leer)
  const [invitation, setInvitation] = useState<InvitationData>({
    childName: 'Benjamín',
    age: 1,
    date: '2026-06-20',
    time: '17:00',
    locationName: 'Salón Dulces Sonrisas',
    locationAddress: 'Av. del Libertador 3200, Palermo, CABA',
    locationUrl: '',
    theme: 'peach',
    welcomePhrase: '¡Hola! Te invito a soplar mi primer velita y divertirte conmigo en un día cargado de globos, ositos y aventuras inolvidables. ¡No faltes!',
    hasGiftTable: true,
    giftDetailsType: 'alias',
    giftAlias: 'bauti.primer.anito',
    giftCbu: '0000003100029348293471',
    giftBank: 'Mercado Pago',
    whatsappContact: '+5491112345678',
    musicPlaying: false
  });

  // States para modales interactivos
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [isGiftsOpen, setIsGiftsOpen] = useState(false);

  const handleToggleMusic = (play: boolean) => {
    setInvitation(prev => ({
      ...prev,
      musicPlaying: play
    }));
  };

  return (
    <div id="app-root-container" className="min-h-screen bg-[#F5F2ED] flex flex-col items-center justify-center font-sans select-none antialiased relative overflow-hidden p-0 sm:p-4 md:p-6">
      
      {/* Decorative hand-painted style watercolor shapes */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#DCE8F2] rounded-full opacity-30 filter blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 -right-32 w-[450px] h-[450px] bg-[#F9E8D9] rounded-full opacity-40 filter blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-[#E2F0D9] rounded-full opacity-25 filter blur-3xl pointer-events-none"></div>

      {/* Standalone card mockup viewport */}
      <main id="main-studio-workspace" className="w-full flex justify-center items-center h-full z-10">
        <InvitationPreview 
          data={invitation} 
          onOpenRsvp={() => setIsRsvpOpen(true)}
          onOpenGifts={() => setIsGiftsOpen(true)}
          musicPlaying={invitation.musicPlaying}
          onToggleMusic={handleToggleMusic}
        />
      </main>

      {/* Interactive overlay modals for RSVPing & Gifts */}
      <RSVPModal 
        isOpen={isRsvpOpen} 
        onClose={() => setIsRsvpOpen(false)} 
        data={invitation} 
      />

      <GiftsModal 
        isOpen={isGiftsOpen} 
        onClose={() => setIsGiftsOpen(false)} 
        data={invitation} 
      />

    </div>
  );
}

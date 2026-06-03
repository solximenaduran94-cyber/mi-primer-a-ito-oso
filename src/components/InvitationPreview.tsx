import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Gift, 
  Users, 
  Sparkles, 
  ExternalLink,
  ChevronRight,
  Heart,
  Baby,
  Smile,
  Music4
} from 'lucide-react';
import { InvitationData, ThemeColors } from '../types';
import ConfettiSparkles from './ConfettiSparkles';
import teddyBearImg from '../assets/images/teddy_bear_pastel_1780456970664.png';
import MusicBox from './MusicBox';

interface InvitationPreviewProps {
  data: InvitationData;
  onOpenRsvp: () => void;
  onOpenGifts: () => void;
  musicPlaying: boolean;
  onToggleMusic: (play: boolean) => void;
}

export default function InvitationPreview({ data, onOpenRsvp, onOpenGifts, musicPlaying, onToggleMusic }: InvitationPreviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [showConfetti, setShowConfetti] = useState(false);

  // Pastel & Earth toned coordinate system
  const themePalettes: Record<InvitationData['theme'], ThemeColors> = {
    blue: {
      primary: 'text-[#6B5A46]',
      secondary: 'text-[#8C7A66]',
      bg: 'bg-[#F5F2ED]',
      cardBg: 'bg-white border-[#E8E1D9]',
      accent: 'bg-[#E8E1D9] hover:bg-[#D1C4B5] text-[#6B5A46]',
      text: 'text-[#6B5A46]',
      textMuted: 'text-[#A69076]',
      gradientFrom: 'from-[#F5F2ED]',
      gradientTo: 'to-[#DCE8F2]/40',
      badge: 'bg-[#DCE8F2] text-[#4A607A] border-[#DCE8F2]',
    },
    pink: {
      primary: 'text-[#6B5A46]',
      secondary: 'text-[#8C7A66]',
      bg: 'bg-[#F5F2ED]',
      cardBg: 'bg-white border-[#E8E1D9]',
      accent: 'bg-[#E8E1D9] hover:bg-[#D1C4B5] text-[#6B5A46]',
      text: 'text-[#6B5A46]',
      textMuted: 'text-[#A69076]',
      gradientFrom: 'from-[#F5F2ED]',
      gradientTo: 'to-[#F9E8D9]/50',
      badge: 'bg-[#F9E8D9] text-[#855B4C] border-[#F9E8D9]',
    },
    green: {
      primary: 'text-[#6B5A46]',
      secondary: 'text-[#8C7A66]',
      bg: 'bg-[#F5F2ED]',
      cardBg: 'bg-white border-[#E8E1D9]',
      accent: 'bg-[#E8E1D9] hover:bg-[#D1C4B5] text-[#6B5A46]',
      text: 'text-[#6B5A46]',
      textMuted: 'text-[#A69076]',
      gradientFrom: 'from-[#F5F2ED]',
      gradientTo: 'to-[#E2F0D9]/40',
      badge: 'bg-[#E2F0D9] text-[#556F44] border-[#E2F0D9]',
    },
    peach: {
      primary: 'text-[#6B5A46]',
      secondary: 'text-[#8C7A66]',
      bg: 'bg-[#F5F2ED]',
      cardBg: 'bg-white border-[#E8E1D9]',
      accent: 'bg-[#E8E1D9] hover:bg-[#D1C4B5] text-[#6B5A46]',
      text: 'text-[#6B5A46]',
      textMuted: 'text-[#A69076]',
      gradientFrom: 'from-[#F5F2ED]',
      gradientTo: 'to-[#F9DCC4]/40',
      badge: 'bg-[#F9DCC4] text-[#8C5E3A] border-[#F9DCC4]',
    },
  };

  const colors = themePalettes[data.theme];

  // Live Countdown logic
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(`${data.date}T${data.time || '17:00'}:00`) - +new Date();
      let newTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      setTimeLeft(newTimeLeft);
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [data.date, data.time]);

  // Read Spanish date nicely
  const getFormattedDate = (dateStr: string) => {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    const dateObj = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    
    return dateObj.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  };

  const formattedDate = getFormattedDate(data.date);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 12000);
  };

  return (
    <div id="invitation-preview-root" className="w-full max-w-4xl mx-auto px-4 py-6 sm:py-12 z-10 flex flex-col items-center">
      
      {/* Floating high-fidelity audio control for our digital guests */}
      <div id="floating-music-trigger" className="fixed bottom-6 right-6 z-50 shadow-lg rounded-full">
        <MusicBox isPlaying={musicPlaying} onToggle={onToggleMusic} />
      </div>

      {/* Confetti Spurt */}
      <ConfettiSparkles theme={data.theme} active={showConfetti && isOpen} />

      {/* OVERLAY / CLOSED STATE: ELEVATED PHYSICAL CHIC ENVELOPE */}
      {!isOpen && (
        <div 
          id="envelope-surface"
          className="w-full max-w-md bg-white rounded-[32px] sm:rounded-[40px] border border-[#E8E1D9] shadow-xl p-8 sm:p-10 flex flex-col items-center text-center relative overflow-hidden transition-all duration-500 scale-100 hover:scale-[1.02] z-20 cursor-pointer"
          onClick={handleOpenInvitation}
        >
          {/* Subtle elegant corner decorations */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#F9E8D9]/45 to-transparent rounded-bl-full pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#DCE8F2]/45 to-transparent rounded-tr-full pointer-events-none"></div>

          {/* Ambient organic tones */}
          <div className="absolute top-12 left-10 w-8 h-8 rounded-full bg-[#DCE8F2]/50 filter blur-xs animate-pulse pointer-events-none"></div>
          <div className="absolute bottom-20 right-12 w-12 h-12 rounded-full bg-[#E2F0D9]/50 filter blur-xs animate-pulse pointer-events-none"></div>
          
          {/* Virtual wax seal stamp indicator */}
          <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg animate-bounce mb-6 bg-[#6B5A46] text-white">
            <Baby className="w-8 h-8" />
          </div>

          <p className="text-[#A69076] text-xs font-sans tracking-[0.2em] uppercase mb-1.5 font-bold">Invitación Especial</p>
          <h3 className="font-serif italic text-3xl text-[#6B5A46] font-semibold mb-3">Mi Primer Añito</h3>
          
          <div className="w-16 h-[2.5px] bg-[#E8E1D9] mb-5"></div>
          
          <p className="text-[#8C7A66] text-sm mb-8 max-w-[280px] font-sans leading-relaxed">
            Hemos preparado algo muy especial. Toca el botón de aquí abajo o la tarjeta para ver esta dulce sorpresa con todo nuestro amor.
          </p>

          <button
            id="btn-open-envelope"
            onClick={(e) => {
              e.stopPropagation(); // Avoid double open triggers
              handleOpenInvitation();
            }}
            className="w-full py-4 px-6 rounded-full bg-[#6B5A46] text-white font-serif font-bold text-sm tracking-wider flex items-center justify-center gap-2 hover:bg-[#8C7A66] active:scale-95 transition-all shadow-md group cursor-pointer"
          >
            <Sparkles className="w-4.5 h-4.5 text-amber-300 group-hover:rotate-12 transition-transform" />
            Abrir Invitación
            <ChevronRight className="w-4.5 h-4.5 text-white" />
          </button>
        </div>
      )}

      {/* ACTIVE STATE: FULL RESPONSIVE WEB PAGE DESIGN */}
      {isOpen && (
        <div 
          id="active-invitation-container" 
          className="w-full max-w-2xl bg-white rounded-[32px] sm:rounded-[40px] border border-[#E8E1D9] shadow-xl p-6 sm:p-10 md:p-12 relative overflow-hidden flex flex-col z-10 animate-fadeIn animate-duration-500"
        >
          {/* Soft natural tone styling grids behind cards */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#F9E8D9]/40 rounded-full filter blur-xl pointer-events-none -z-10"></div>
          <div className="absolute bottom-1/3 -left-32 w-80 h-80 bg-[#DCE8F2]/30 rounded-full filter blur-xl pointer-events-none -z-10"></div>
          <div className="absolute bottom-10 right-0 w-60 h-60 bg-[#E2F0D9]/30 rounded-full filter blur-xl pointer-events-none -z-10"></div>

          {/* Music status widget at the top */}
          <div className="flex justify-end items-center mb-5 sm:mb-8 pr-1">
            <span className="text-[10px] font-sans font-semibold text-[#A69076] tracking-wider uppercase flex items-center gap-1.5 bg-[#F9F7F5] px-3.5 py-1.5 rounded-full border border-[#F0EBE5] shadow-3xs">
              <Music4 className="w-3.5 h-3.5 text-[#8C7A66] animate-pulse" />
              Sugerencia: Activa la música abajo
            </span>
          </div>

          {/* Core Hero card block */}
          <div id="invitation-hero-card" className="relative rounded-[2.5rem] overflow-hidden p-6 sm:p-10 flex flex-col items-center text-center border bg-white border-[#F0EBE5] shadow-xs w-full mb-8">
            <div className="absolute top-4 left-4 text-[#E8E1D9]"><Heart className="w-5 h-5 fill-current" /></div>
            <div className="absolute top-6 right-6 text-yellow-500/10"><Sparkles className="w-4 h-4 fill-current animate-pulse" /></div>

            <p className="text-[#A69076] uppercase tracking-[0.2em] text-[10.5px] mb-1.5 font-bold font-sans">
              Estás invitado a celebrar
            </p>
            <h2 className="text-[#6B5A46] text-3xl font-serif italic mb-2 font-semibold">
              Mi Primer Añito
            </h2>
            <div className="w-16 h-[2px] bg-[#E8E1D9] mb-6"></div>

            {/* Cute Bear Watercolor Portrait style container */}
            <div id="main-bear-avatar-container" className="w-[190px] h-[250px] sm:w-[210px] sm:h-[280px] rounded-[24px] overflow-hidden shadow-md border-[6px] border-white bg-white/90 relative mb-6">
              <img 
                src={teddyBearImg} 
                alt="Osito tierno con globos" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Baby's Name */}
            <h1 className="font-serif text-4xl sm:text-5xl font-extrabold tracking-wide text-[#8C7A66] uppercase mb-2 select-text">
              {data.childName || "Nombre del Bebé"}
            </h1>
            
            <p className="font-cursive text-3.5xl sm:text-4.5xl text-[#6B5A46] font-medium leading-none">
              Te invita a celebrar
            </p>
          </div>

          {/* Sweet custom text panel */}
          <div className="text-center mb-8 sm:mb-10 max-w-lg mx-auto">
            <span className="text-[10px] text-[#A69076] font-sans font-bold tracking-[0.2em] block mb-2 uppercase">🧸 BIENVENIDA 🧸</span>
            <p className="font-sans text-[#6B5A46]/90 text-sm leading-relaxed italic bg-[#F9F7F5] rounded-3xl p-5 sm:p-6 border border-[#F0EBE5] shadow-3xs">
              "{data.welcomePhrase || '¡Hola! Te invito a soplar mi primera velita y divertirte conmigo. ¡Habrá juegos, globos, risas y sorpresas!'}"
            </p>
          </div>

          {/* Dynamic real-time countdown widgets */}
          <div className="mb-8 sm:mb-10">
            <div className="bg-white rounded-3xl border border-[#F0EBE5] p-5 sm:p-7 shadow-xs text-center">
              <span className="text-[10px] text-[#A69076] font-sans font-bold tracking-[0.25em] uppercase block mb-4">Faltan Exactamente</span>
              <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-md mx-auto">
                <div className="flex flex-col items-center bg-[#F9F7F5] p-3 rounded-2xl border border-[#F0EBE5]/60 shadow-3xs">
                  <span className="font-serif text-2xl sm:text-3xl font-extrabold text-[#6B5A46]">{timeLeft.days}</span>
                  <span className="text-[9px] sm:text-[10px] text-[#A69076] font-sans font-bold tracking-wider mt-1">DÍAS</span>
                </div>
                <div className="flex flex-col items-center bg-[#F9F7F5] p-3 rounded-2xl border border-[#F0EBE5]/60 shadow-3xs">
                  <span className="font-serif text-2xl sm:text-3xl font-extrabold text-[#6B5A46]">{timeLeft.hours}</span>
                  <span className="text-[9px] sm:text-[10px] text-[#A69076] font-sans font-bold tracking-wider mt-1">HORAS</span>
                </div>
                <div className="flex flex-col items-center bg-[#F9F7F5] p-3 rounded-2xl border border-[#F0EBE5]/60 shadow-3xs">
                  <span className="font-serif text-2xl sm:text-3xl font-extrabold text-[#6B5A46]">{timeLeft.minutes}</span>
                  <span className="text-[9px] sm:text-[10px] text-[#A69076] font-sans font-bold tracking-wider mt-1">MINS</span>
                </div>
                <div className="flex flex-col items-center bg-[#F9F7F5] p-3 rounded-2xl border border-[#F0EBE5]/60 shadow-3xs">
                  <span className="font-serif text-2xl sm:text-3xl font-extrabold text-[#6B5A46] animate-[pulse_1.5s_infinite]">{timeLeft.seconds}</span>
                  <span className="text-[9px] sm:text-[10px] text-[#A69076] font-sans font-bold tracking-wider mt-1">SEGS</span>
                </div>
              </div>
            </div>
          </div>

          {/* When & Where Coordinate boxes */}
          <div className="mb-8 sm:mb-10 space-y-4">
            <span className="text-[10px] text-[#A69076] font-sans font-bold tracking-[0.25em] uppercase block text-center mb-3">¿Cuándo y Dónde?</span>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Date Box */}
              <div className="flex items-center gap-4 bg-white rounded-3xl p-5 border border-[#F0EBE5] shadow-3xs">
                <div className="p-3.5 rounded-2xl bg-[#E8E1D9] text-[#6B5A46]">
                  <Calendar className="w-5.5 h-5.5" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <p className="text-[9px] font-sans font-bold text-[#A69076] uppercase tracking-wider mb-0.5">Fecha especial</p>
                  <p className="font-serif text-sm font-bold text-[#6B5A46] capitalize leading-snug">
                    {formattedDate || "Sábado, 20 de Junio"}
                  </p>
                </div>
              </div>

              {/* Time Hour Box */}
              <div className="flex items-center gap-4 bg-white rounded-3xl p-5 border border-[#F0EBE5] shadow-3xs">
                <div className="p-3.5 rounded-2xl bg-[#E8E1D9] text-[#6B5A46]">
                  <Clock className="w-5.5 h-5.5" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <p className="text-[9px] font-sans font-bold text-[#A69076] uppercase tracking-wider mb-0.5">Horario</p>
                  <p className="font-serif text-sm font-bold text-[#6B5A46] leading-snug">
                    {data.time ? `${data.time} hs` : "17:00 hs"}
                  </p>
                </div>
              </div>
            </div>

            {/* Full-width Location Details Card */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#F0EBE5] shadow-3xs flex flex-col sm:flex-row sm:items-center gap-4 text-left">
              <div className="p-4 rounded-2xl bg-[#E8E1D9] text-[#6B5A46] self-start sm:self-auto shadow-3xs">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[9px] font-sans font-bold text-[#A69076] uppercase tracking-wider mb-0.5">Lugar & Dirección</p>
                <p className="font-serif text-base font-bold text-[#6B5A46] leading-tight select-text">
                  {data.locationName || "Salón de Eventos Dulce Osito"}
                </p>
                <p className="text-xs sm:text-sm text-[#A69076] mt-0.5 select-text leading-relaxed">
                  {data.locationAddress || "Av. Principal 1234, Ciudad"}
                </p>
              </div>
            </div>

            {/* Google Maps link button */}
            <a
              id="btn-location-address"
              href={data.locationUrl || `https://maps.google.com/?q=${encodeURIComponent(data.locationName + ' ' + data.locationAddress)}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-4 px-6 rounded-full font-serif font-bold text-xs tracking-wider flex items-center justify-center gap-2 border border-[#E8E1D9] bg-[#E8E1D9]/50 hover:bg-[#E8E1D9] text-[#6B5A46] shadow-sm hover:shadow-md active:scale-99 transition-all cursor-pointer uppercase"
            >
              <ExternalLink className="w-4 h-4" />
              Ver Ubicación en Google Maps
            </a>
          </div>

          {/* Sweet organic dress code element */}
          <div className="mb-8 sm:mb-10">
            <div className="bg-[#F9F7F5] rounded-3xl border border-[#F0EBE5] p-5 sm:p-6 text-center shadow-3xs max-w-lg mx-auto">
              <span className="text-[10px] text-[#8C7A66] font-sans font-bold uppercase tracking-[0.2em] block mb-2">👗 VESTIMENTA / DRESS CODE 👕</span>
              <p className="text-xs sm:text-sm text-[#6B5A46] leading-relaxed">
                Para salir hermosos en las fotos del osito, te agradeceríamos venir vestido con prendas en <b>tonos pasteles o neutros</b> suaves. ¡Ayúdanos a armar el álbum mágico!
              </p>
            </div>
          </div>

          {/* Symmetrical digital user triggers (RSVP and Gifts) */}
          <div className="mb-10 max-w-lg mx-auto w-full space-y-4">
            {/* Primary Event Check-in trigger */}
            <button
              id="btn-rsvp-confirm"
              onClick={onOpenRsvp}
              className="w-full py-4 px-8 rounded-full font-serif font-extrabold text-sm tracking-widest flex items-center justify-center gap-2.5 shadow-md text-white bg-[#6B5A46] hover:bg-[#8C7A66] transition-all transform hover:scale-[1.02] active:scale-98 uppercase cursor-pointer"
            >
              <Users className="w-5 h-5 text-white" />
              Confirmar Asistencia (RSVP)
            </button>

            {/* Optional gift registry */}
            {data.hasGiftTable && (
              <button
                id="btn-gifts-open"
                onClick={onOpenGifts}
                className="w-full py-3.5 px-6 rounded-full font-serif font-bold text-xs tracking-wider flex items-center justify-center gap-2 bg-white text-[#6B5A46] border border-[#E8E1D9] shadow-sm hover:bg-[#F9F7F5] active:scale-98 transition-all uppercase cursor-pointer"
              >
                <Gift className="w-4.5 h-4.5 text-[#A69076]" />
                Sugerencia de Regalos / Datos Bancarios
              </button>
            )}
          </div>

          {/* Sweet visual separation line & heartfelt footer */}
          <div className="text-center mt-4 sm:mt-8 pt-6 border-t border-[#F0EBE5]">
            <div className="flex items-center justify-center gap-1.5 mb-3">
              <div className="w-12 h-[1px] bg-[#E8E1D9]"></div>
              <Smile className="w-5 h-5 text-[#8C7A66]" />
              <div className="w-12 h-[1px] bg-[#E8E1D9]"></div>
            </div>
            <p className="font-cursive text-3xl sm:text-4xl text-[#6B5A46] mb-1.5 font-medium">¡Te espero con todo mi corazón!</p>
            <p className="text-[10px] font-sans font-bold text-[#A69076] uppercase tracking-[0.25em] block">
              Invitación Digital Primer Añito
            </p>
          </div>

        </div>
      )}

    </div>
  );
}

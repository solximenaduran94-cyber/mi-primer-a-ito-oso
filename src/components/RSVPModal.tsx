import React, { useState } from 'react';
import { X, Send, Check, Heart, HelpCircle, ShieldCheck } from 'lucide-react';
import { InvitationData, RSVPResponse } from '../types';

interface RSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: InvitationData;
}

export default function RSVPModal({ isOpen, onClose, data }: RSVPModalProps) {
  const [formData, setFormData] = useState<RSVPResponse>({
    guestName: '',
    confirmed: true,
    dietRestrictions: 'Ninguna',
    customMessage: '',
    plusOnes: 0,
  });
  const [simulatedSent, setSimulatedSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.guestName.trim()) {
      alert('Por favor ingresa tu nombre antes de enviar de confirmar.');
      return;
    }

    // Prepare WhatsApp Message format
    const checkSymbol = formData.confirmed ? '✅ SÍ, voy con mucho gusto' : '❌ Lo lamento, no podré asistir';
    const hasCompanion = formData.plusOnes > 0 ? `Sí, viene(n) ${formData.plusOnes} acompañante(s)` : 'Voy solo/a';
    
    const textMessage = `🧸 *Confirmación de Asistencia - Primer Añito* 🧸\n\n` +
      `👤 *Invitado:* ${formData.guestName.trim()}\n` +
      `💌 *Asistencia:* ${checkSymbol}\n` +
      `👥 *Acompañantes:* ${hasCompanion}\n` +
      `🥦 *Alimentación / Dieta:* ${formData.dietRestrictions}\n` +
      (formData.customMessage.trim() ? `💬 *Mensaje:* "${formData.customMessage.trim()}"` : '') +
      `\n\n¡Un beso grande, nos vemos allí!`;

    const encodedText = encodeURIComponent(textMessage);
    
    // Clean WhatsApp phone number format
    let cleanPhone = data.whatsappContact.replace(/\D/g, '');
    // Default to a mockup phone number or valid format if none exists
    if (!cleanPhone) cleanPhone = '1234567890';

    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedText}`;

    // Opening WhatsApp window
    window.open(whatsappUrl, '_blank');

    // Trigger local simulator success message
    setSimulatedSent(true);
  };

  const resetForm = () => {
    setFormData({
      guestName: '',
      confirmed: true,
      dietRestrictions: 'Ninguna',
      customMessage: '',
      plusOnes: 0,
    });
    setSimulatedSent(false);
    onClose();
  };

  return (
    <div id="rsvp-modal" className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn animate-duration-200">
      <div id="rsvp-modal-content" className="bg-white rounded-3xl max-w-sm w-full outline-hidden overflow-hidden shadow-2xl relative border border-stone-200 animate-slideUp">
        
        {/* Header with teddy art or color bar */}
        <div id="rsvp-header" className={`p-5 text-center text-white relative ${
          data.theme === 'blue' ? 'bg-sky-500' :
          data.theme === 'pink' ? 'bg-pink-500' :
          data.theme === 'green' ? 'bg-emerald-600' :
          'bg-amber-600'
        }`}>
          <button 
            id="close-rsvp" 
            onClick={resetForm}
            className="absolute top-4 right-4 bg-white/25 rounded-full p-1 hover:bg-white/40 active:scale-90 transition-all text-white"
          >
            <X className="w-4.5 h-4.5" />
          </button>
          
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-2 shadow-xs">
            <Heart className="w-5 h-5 fill-current text-white animate-pulse" />
          </div>
          <h2 className="font-kid text-xl font-bold">Confirmación (RSVP)</h2>
          <p className="text-white/80 text-xs">Cuéntanos si podrás venir a celebrar con {data.childName || "mi bebé"}</p>
        </div>

        {/* Dynamic Inner views */}
        {!simulatedSent ? (
          <form id="rsvp-form" onSubmit={handleSubmit} className="p-5 space-y-4 text-left">
            
            {/* Input Name */}
            <div className="space-y-1">
              <label htmlFor="guest-name" className="text-xs font-semibold text-stone-600 block">Tu Nombre Hermoso:</label>
              <input
                id="guest-name"
                type="text"
                required
                placeholder="Ej. Tía Estela, Padrino Juan..."
                value={formData.guestName}
                onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-stone-800 focus:outline-hidden focus:border-amber-400 bg-stone-50/50 text-sm"
              />
            </div>

            {/* Attendance Toggle Selectors */}
            <div className="grid grid-cols-2 gap-3">
              <button
                id="attending-yes"
                type="button"
                onClick={() => setFormData({ ...formData, confirmed: true })}
                className={`py-3 px-4 rounded-xl font-medium text-xs flex flex-col items-center justify-center gap-1.5 border transition-all ${
                  formData.confirmed 
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold' 
                    : 'bg-white border-stone-200 text-stone-500 hover:bg-stone-50'
                }`}
              >
                <span className="text-lg">🥳</span>
                Sí, ¡asistiré!
              </button>
              <button
                id="attending-no"
                type="button"
                onClick={() => setFormData({ ...formData, confirmed: false })}
                className={`py-3 px-4 rounded-xl font-medium text-xs flex flex-col items-center justify-center gap-1.5 border transition-all ${
                  !formData.confirmed 
                    ? 'bg-rose-50 border-rose-300 text-rose-800 font-bold' 
                    : 'bg-white border-stone-200 text-stone-500 hover:bg-stone-50'
                }`}
              >
                <span className="text-lg">😢</span>
                No podré ir
              </button>
            </div>

            {/* Active Companion Counter */}
            {formData.confirmed && (
              <div className="space-y-1.5 bg-stone-50 rounded-xl p-3 border border-stone-100">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-stone-600">¿Vienes acompañado/a?</span>
                  <span className="text-xs py-0.5 px-2.5 rounded-full bg-stone-200 text-stone-700 font-bold font-mono">
                    +{formData.plusOnes}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    id="dec-companion"
                    type="button"
                    onClick={() => setFormData({ ...formData, plusOnes: Math.max(0, formData.plusOnes - 1) })}
                    className="w-8 h-8 rounded-lg bg-white border border-stone-200 shadow-3xs flex items-center justify-center font-bold text-stone-600 active:scale-90 hover:bg-stone-50"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center text-xs text-stone-500">
                    {formData.plusOnes === 0 ? "Sin acompañantes" : `${formData.plusOnes} persona(s) adicional(es)`}
                  </span>
                  <button
                    id="inc-companion"
                    type="button"
                    onClick={() => setFormData({ ...formData, plusOnes: Math.min(8, formData.plusOnes + 1) })}
                    className="w-8 h-8 rounded-lg bg-white border border-stone-200 shadow-3xs flex items-center justify-center font-bold text-stone-600 active:scale-90 hover:bg-stone-50"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Special Diets */}
            {formData.confirmed && (
              <div className="space-y-1">
                <label htmlFor="diet" className="text-xs font-semibold text-stone-600 block">Restricción alimentaria/Menú especial:</label>
                <select
                  id="diet"
                  value={formData.dietRestrictions}
                  onChange={(e) => setFormData({ ...formData, dietRestrictions: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-stone-200 text-stone-700 bg-stone-50/50 text-xs focus:outline-hidden"
                >
                  <option value="Ninguna">Ninguna (Como de todo)</option>
                  <option value="Vegano/a">Vegano/a</option>
                  <option value="Vegetariano/a">Vegetariano/a</option>
                  <option value="Celíaco/a (Sin TACC)">Celíaco/a (Sin TACC)</option>
                  <option value="Diabético/a">Diabético/a</option>
                  <option value="Otros alérgenos">Alérgico/a (Especificar en mensaje)</option>
                </select>
              </div>
            )}

            {/* Warm note */}
            <div className="space-y-1">
              <label htmlFor="custom-msg" className="text-xs font-semibold text-stone-600 block">Dejale un mensajito al bebé:</label>
              <textarea
                id="custom-msg"
                placeholder={formData.confirmed ? "Escribe un lindo mensajito o augurio..." : "Cuéntale por qué no puedes venir..."}
                value={formData.customMessage}
                onChange={(e) => setFormData({ ...formData, customMessage: e.target.value })}
                rows={2}
                className="w-full px-4 py-2 rounded-xl border border-stone-200 text-stone-700 bg-stone-50/50 text-xs focus:outline-hidden resize-none"
              ></textarea>
            </div>

            {/* Action buttons */}
            <button
              id="btn-submit-rsvp"
              type="submit"
              className={`w-full py-3 px-4 rounded-xl font-bold font-kid text-sm flex items-center justify-center gap-2 text-white shadow-md transition-all active:scale-95 ${
                data.theme === 'blue' ? 'bg-sky-500 hover:bg-sky-600' :
                data.theme === 'pink' ? 'bg-pink-500 hover:bg-pink-600' :
                data.theme === 'green' ? 'bg-emerald-600 hover:bg-emerald-700' :
                'bg-amber-600 hover:bg-amber-700'
              }`}
            >
              <Send className="w-4 h-4" />
              Enviar por WhatsApp
            </button>
          </form>
        ) : (
          /* SUCCESS STATE PANEL */
          <div id="rsvp-success-panel" className="p-8 text-center flex flex-col items-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center shadow-inner animate-[scaleIn_0.3s_ease] mb-2">
              <Check className="w-8 h-8 text-emerald-600" />
            </div>
            
            <h3 className="font-kid text-2xl font-bold text-stone-800">¡Confirmación Armada!</h3>
            
            <p className="text-stone-600 text-xs leading-relaxed max-w-[260px]">
              Hemos procesado tu respuesta y generado el mensaje para WhatsApp con todo el formato listo para que se envíe.
            </p>

            <div className="bg-emerald-50/80 border border-emerald-100 rounded-2xl p-4 text-xs text-stone-600 flex items-start gap-2 max-w-[260px]">
              <ShieldCheck className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              <div className="text-left">
                <strong>¿Qué pasa ahora?</strong> Se abrió WhatsApp para enviar el mensaje. Si no se abrió la ventana, puedes confirmar enviándole un chat habitual a los papás.
              </div>
            </div>

            <button
              id="btn-rsvp-reset-close"
              onClick={resetForm}
              className="mt-4 px-6 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 active:scale-95 text-white text-xs font-semibold shadow-xs transition-all"
            >
              Cerrar Confirmación
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

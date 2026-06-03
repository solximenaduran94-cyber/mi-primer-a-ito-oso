import React, { useState } from 'react';
import { X, Gift, Copy, Check, Info } from 'lucide-react';
import { InvitationData } from '../types';

interface GiftsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: InvitationData;
}

export default function GiftsModal({ isOpen, onClose, data }: GiftsModalProps) {
  const [copiedField, setCopiedField] = useState<'alias' | 'cbu' | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, field: 'alias' | 'cbu') => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  return (
    <div id="gifts-modal" className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn animate-duration-200">
      <div id="gifts-modal-content" className="bg-white rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl relative border border-stone-200 animate-slideUp">
        
        {/* Header bar */}
        <div id="gifts-header" className={`p-5 text-center text-white relative ${
          data.theme === 'blue' ? 'bg-sky-500' :
          data.theme === 'pink' ? 'bg-pink-500' :
          data.theme === 'green' ? 'bg-emerald-600' :
          'bg-amber-600'
        }`}>
          <button 
            id="close-gifts" 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/25 rounded-full p-1 hover:bg-white/40 active:scale-90 transition-all text-white"
          >
            <X className="w-4.5 h-4.5" />
          </button>
          
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-2 shadow-xs animate-bounce">
            <Gift className="w-5 h-5 text-white" />
          </div>
          <h2 className="font-kid text-xl font-bold">Mesa de Regalos</h2>
          <p className="text-white/80 text-xs">Cariños para {data.childName || "mi bebé"}</p>
        </div>

        {/* Content body based on selection */}
        <div className="p-5 space-y-4 text-left">
          
          {data.giftDetailsType === 'alias' && (
            <div id="bank-transfer-details" className="space-y-4">
              <p className="text-xs text-stone-500 leading-relaxed text-center">
                Tu presencia es nuestro mayor regalo. Pero si quieres hacernos una atención, puedes ayudarnos con los preparativos o futuros regalitos del bebé mediante transferencia bancaria:
              </p>

              {/* Bank Name if filled */}
              {data.giftBank && (
                <div className="bg-stone-50 border border-stone-100 rounded-xl p-3 flex justify-between items-center text-xs">
                  <span className="text-stone-500 font-semibold">Banco/Plataforma:</span>
                  <span className="text-stone-700 font-bold font-mono uppercase">{data.giftBank}</span>
                </div>
              )}

              {/* Alias item copy */}
              {data.giftAlias && (
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-stone-400 uppercase">Alias Bancario</span>
                  <div className="flex items-center gap-2 bg-stone-50 border border-stone-100 rounded-xl p-3">
                    <span className="flex-1 font-mono text-xs text-stone-800 font-bold truncate select-all">{data.giftAlias}</span>
                    <button
                      id="btn-copy-alias"
                      type="button"
                      onClick={() => copyToClipboard(data.giftAlias, 'alias')}
                      className={`p-1.5 rounded-lg transition-all border ${
                        copiedField === 'alias'
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                          : 'bg-white hover:bg-stone-50 text-stone-500 border-stone-100'
                      }`}
                      title="Copiar Alias"
                    >
                      {copiedField === 'alias' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              )}

              {/* CBU/CVU item copy */}
              {data.giftCbu && (
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-stone-400 uppercase">CBU/CVU</span>
                  <div className="flex items-center gap-2 bg-stone-50 border border-stone-100 rounded-xl p-3">
                    <span className="flex-1 font-mono text-xs text-stone-800 tracking-wider truncate select-all">{data.giftCbu}</span>
                    <button
                      id="btn-copy-cbu"
                      type="button"
                      onClick={() => copyToClipboard(data.giftCbu, 'cbu')}
                      className={`p-1.5 rounded-lg transition-all border ${
                        copiedField === 'cbu'
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                          : 'bg-white hover:bg-stone-50 text-stone-500 border-stone-100'
                      }`}
                      title="Copiar CBU"
                    >
                      {copiedField === 'cbu' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              )}

              {copiedField && (
                <div id="copy-confirmation-toast" className="text-center text-[10px] font-mono text-emerald-600 animate-pulse">
                  ¡Copiado de forma exitosa en el portapapeles! 📋
                </div>
              )}
            </div>
          )}

          {data.giftDetailsType === 'box' && (
            <div id="envelope-dropoff-details" className="text-center space-y-3 py-2">
              <div className="text-4xl">✉️🎈</div>
              <p className="text-stone-700 text-sm font-semibold">Lluvia de Sobres</p>
              <p className="text-stone-500 text-xs leading-relaxed">
                En el festejo contaremos con un dulce **cofrecito del osito** para colocar los sobrecitos con regalos y augurios de amor que quieras obsequiarle al cumpleañero en su primer añito.
              </p>
            </div>
          )}

          {data.giftDetailsType === 'other' && (
            <div id="other-gift-details" className="text-center space-y-3 py-2">
              <div className="text-4xl">🎁🛍️</div>
              <p className="text-stone-700 text-sm font-semibold">Regalos Sugeridos</p>
              <p className="text-stone-500 text-xs leading-relaxed italic bg-stone-50 rounded-xl p-3 border border-stone-100">
                "¡Tu presencia es el mejor obsequio! Si deseas hacerme un detalle material, te sugerimos obsequiar pañales talle G/XG o juguetes interactivos para explorar con amor."
              </p>
            </div>
          )}

          <div className="pt-2 border-t border-stone-100">
            <button
              id="btn-close-gifts"
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold shadow-3xs transition-all"
            >
              Cerrar Mesa de Regalos
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

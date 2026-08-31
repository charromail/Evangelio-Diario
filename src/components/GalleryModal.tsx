import React from 'react';
import { X, Download, Trash2, Calendar, BookOpen, Sparkles, ExternalLink } from 'lucide-react';
import { GeneratedArtwork } from '../types';
import { downloadImage } from '../utils/imageCompositor';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedArtworks: GeneratedArtwork[];
  onSelectArtwork: (artwork: GeneratedArtwork) => void;
  onDeleteArtwork: (id: string) => void;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({
  isOpen,
  onClose,
  savedArtworks,
  onSelectArtwork,
  onDeleteArtwork,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="bg-[#18100b] border border-[#3e2719] w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#140d08] border-b border-[#362114] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#c93b3e]/20 text-[#ff7b7d] flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-cinzel text-lg font-bold text-[#faefe0]">
                Galería de Obras Sacras Emaús
              </h3>
              <p className="text-xs text-[#a98f79] font-serif italic">
                Colección de arte bíblico en formato 4:5 generado para la meditación
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#a98f79] hover:text-[#faefe0] hover:bg-[#281910] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {savedArtworks.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <Sparkles className="w-12 h-12 text-[#d4af37]/40 mx-auto" />
              <p className="text-sm text-[#b89f89] font-serif italic">
                Aún no has guardado obras de arte. Genera una imagen del Evangelio para guardarla en tu galería.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {savedArtworks.map((art) => (
                <div
                  key={art.id}
                  className="bg-[#20140d] border border-[#3e2719] hover:border-[#d4af37]/50 rounded-xl overflow-hidden group transition-all flex flex-col justify-between shadow-md"
                >
                  <div 
                    className="relative aspect-[4/5] overflow-hidden cursor-pointer bg-black"
                    onClick={() => {
                      onSelectArtwork(art);
                      onClose();
                    }}
                  >
                    <img
                      src={art.imageUrl}
                      alt={art.gospelCitation}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                      <span className="text-xs text-[#d4af37] font-cinzel font-bold">
                        Ver en el Taller
                      </span>
                    </div>
                  </div>

                  <div className="p-3 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-[#a98f79]">
                      <span className="flex items-center gap-1 font-serif">
                        <Calendar className="w-3 h-3 text-[#d4af37]" /> {art.date}
                      </span>
                      <span className="font-semibold text-[#eedbc6]">
                        {art.gospelCitation}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-[#342015]">
                      <button
                        onClick={() => downloadImage(art.imageUrl, `evangelio-emaus-${art.date}.jpg`)}
                        className="p-1.5 rounded-lg bg-[#2b1b12] hover:bg-[#3d2719] text-[#eedbc6] text-xs flex items-center gap-1 transition-colors"
                        title="Descargar"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span className="text-[10px]">Descargar</span>
                      </button>

                      <button
                        onClick={() => onDeleteArtwork(art.id)}
                        className="p-1.5 rounded-lg hover:bg-red-950/60 text-[#a98f79] hover:text-red-400 text-xs transition-colors"
                        title="Eliminar de la galería"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#140d08] border-t border-[#362114] px-6 py-3 flex items-center justify-between text-xs text-[#8d7563]">
          <span>Total de Obras: {savedArtworks.length}</span>
          <span className="font-serif italic">Formato estándar vertical 4:5 • Logo Emaús</span>
        </div>
      </div>
    </div>
  );
};

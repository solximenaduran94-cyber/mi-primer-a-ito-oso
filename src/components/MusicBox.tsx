import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

interface MusicBoxProps {
  isPlaying: boolean;
  onToggle: (play: boolean) => void;
}

export default function MusicBox({ isPlaying, onToggle }: MusicBoxProps) {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalIdRef = useRef<any>(null);
  const noteIndexRef = useRef(0);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Twinkle Twinkle Little Star Notes & Frequencies
  const notes = [
    { pitch: 261.63, duration: 400 }, // C4
    { pitch: 261.63, duration: 400 }, // C4
    { pitch: 392.00, duration: 400 }, // G4
    { pitch: 392.00, duration: 400 }, // G4
    { pitch: 440.00, duration: 400 }, // A4
    { pitch: 440.00, duration: 400 }, // A4
    { pitch: 392.00, duration: 800 }, // G4 (long)
    
    { pitch: 349.23, duration: 400 }, // F4
    { pitch: 349.23, duration: 400 }, // F4
    { pitch: 329.63, duration: 400 }, // E4
    { pitch: 329.63, duration: 400 }, // E4
    { pitch: 293.66, duration: 400 }, // D4
    { pitch: 293.66, duration: 400 }, // D4
    { pitch: 261.63, duration: 800 }, // C4 (long)
    
    { pitch: 392.00, duration: 400 }, // G4
    { pitch: 392.00, duration: 400 }, // G4
    { pitch: 349.23, duration: 400 }, // F4
    { pitch: 349.23, duration: 400 }, // F4
    { pitch: 329.63, duration: 400 }, // E4
    { pitch: 329.63, duration: 400 }, // E4
    { pitch: 293.66, duration: 800 }, // D4 (long)

    { pitch: 392.00, duration: 400 }, // G4
    { pitch: 392.00, duration: 400 }, // G4
    { pitch: 349.23, duration: 400 }, // F4
    { pitch: 349.23, duration: 400 }, // F4
    { pitch: 329.63, duration: 400 }, // E4
    { pitch: 329.63, duration: 400 }, // E4
    { pitch: 293.66, duration: 800 }, // D4 (long)

    { pitch: 261.63, duration: 400 }, // C4
    { pitch: 261.63, duration: 400 }, // C4
    { pitch: 392.00, duration: 400 }, // G4
    { pitch: 392.00, duration: 400 }, // G4
    { pitch: 440.00, duration: 400 }, // A4
    { pitch: 440.00, duration: 400 }, // A4
    { pitch: 392.00, duration: 800 }, // G4 (long)

    { pitch: 349.23, duration: 400 }, // F4
    { pitch: 349.23, duration: 400 }, // F4
    { pitch: 329.63, duration: 400 }, // E4
    { pitch: 329.63, duration: 400 }, // E4
    { pitch: 293.66, duration: 400 }, // D4
    { pitch: 293.66, duration: 400 }, // D4
    { pitch: 261.63, duration: 1200 }, // C4 (extra long rest)
  ];

  const playMusicBoxNote = (frequency: number, duration: number) => {
    if (!audioCtxRef.current) return;
    
    // Resume context if suspended
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    const ctx = audioCtxRef.current;
    
    // Create tone oscillators
    const osc = ctx.createOscillator();
    const subOsc = ctx.createOscillator(); // Add a sub-frequency helper for sweet warm tone
    const noteGain = ctx.createGain();

    // Soft music box settings (gentle sine was + subtle chime)
    osc.type = 'sine';
    subOsc.type = 'triangle'; // triangle gives warmth

    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    subOsc.frequency.setValueAtTime(frequency * 2, ctx.currentTime); // chime overtone (octave above)

    // Master chime Envelope
    noteGain.gain.setValueAtTime(0, ctx.currentTime);
    // Instant attack for musicbox pluck
    noteGain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.02);
    // Gentle decay like a pluck/bell
    noteGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration / 1000);

    // Connecting nodes
    osc.connect(noteGain);
    subOsc.connect(noteGain);
    
    if (gainNodeRef.current) {
      noteGain.connect(gainNodeRef.current);
    } else {
      noteGain.connect(ctx.destination);
    }

    osc.start();
    subOsc.start();
    
    // Clean shutdown of oscillators
    osc.stop(ctx.currentTime + duration / 1000 + 0.1);
    subOsc.stop(ctx.currentTime + duration / 1000 + 0.1);
  };

  useEffect(() => {
    if (isPlaying) {
      // Lazy init AudioContext
      if (!audioCtxRef.current) {
        const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtxClass) {
          audioCtxRef.current = new AudioCtxClass();
          
          // Setup a gentle low-pass filter to sound even warmer
          const filter = audioCtxRef.current.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(1200, audioCtxRef.current.currentTime);
          
          gainNodeRef.current = audioCtxRef.current.createGain();
          gainNodeRef.current.gain.setValueAtTime(0.8, audioCtxRef.current.currentTime);
          
          gainNodeRef.current.connect(filter);
          filter.connect(audioCtxRef.current.destination);
        }
      }

      // Play loop
      let timer: any = null;
      
      const playNext = () => {
        const currentNote = notes[noteIndexRef.current];
        playMusicBoxNote(currentNote.pitch, currentNote.duration);
        
        noteIndexRef.current = (noteIndexRef.current + 1) % notes.length;
        
        // Schedule next note precisely
        const delay = currentNote.duration + 150; // add gap
        intervalIdRef.current = setTimeout(playNext, delay);
      };

      playNext();
    } else {
      // Stop loop
      if (intervalIdRef.current) {
        clearTimeout(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    }

    return () => {
      if (intervalIdRef.current) {
        clearTimeout(intervalIdRef.current);
      }
    };
  }, [isPlaying]);

  // Handle active component destruction
  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  const handleToggle = () => {
    onToggle(!isPlaying);
  };

  return (
    <button
      id="music-box-btn"
      onClick={handleToggle}
      className={`relative flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all shadow-sm border ${
        isPlaying
          ? 'bg-amber-100 text-amber-800 border-amber-200 animate-pulse'
          : 'bg-white/80 backdrop-blur-xs text-stone-600 border-stone-200 hover:bg-stone-50'
      }`}
      aria-label="Cajita de música"
    >
      {isPlaying ? (
        <>
          <Volume2 id="vol2-icon" className="w-3.5 h-3.5 text-amber-600 animate-bounce" />
          <span id="music-box-active">Cajita de Música: ON</span>
          <div id="playing-indicator" className="flex items-center gap-0.5 ml-1 h-3">
            <span className="w-0.5 h-full bg-amber-500 rounded-xs animate-[bounce_1s_infinite_100ms]" style={{ height: '60%' }}></span>
            <span className="w-0.5 h-full bg-amber-500 rounded-xs animate-[bounce_1s_infinite_300ms]" style={{ height: '100%' }}></span>
            <span className="w-0.5 h-full bg-amber-500 rounded-xs animate-[bounce_1s_infinite_500ms]" style={{ height: '40%' }}></span>
          </div>
        </>
      ) : (
        <>
          <VolumeX id="volx-icon" className="w-3.5 h-3.5 text-stone-400" />
          <span id="music-box-inactive">Música de fondo desactivada</span>
          <Music id="music-note-icon" className="w-3.5 h-3.5 text-stone-300" />
        </>
      )}
    </button>
  );
}

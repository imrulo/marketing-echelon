'use client';

import { useRouter } from 'next/navigation';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useSimulationStore } from '@/store/useSimulationStore';

export const useVoiceCommands = () => {
  const router = useRouter();
  const setScenario = useSimulationStore((state) => state.setScenario);

  const commands = [
    {
      command: ['Go to home', 'Home'],
      callback: () => router.push('/'),
    },
    {
      command: ['Go to marketing', 'Open marketing'],
      callback: () => router.push('/marketing'),
    },
    {
      command: ['Go to events', 'Open events'],
      callback: () => router.push('/events'),
    },
    {
      command: ['Go to content', 'Open content'],
      callback: () => router.push('/content'),
    },
    {
      command: ['Go to scenarios', 'Open scenarios', 'Compensation models'],
      callback: () => router.push('/scenarios'),
    },
    {
      command: ['Go to dashboard', 'Open dashboard', 'Calculator'],
      callback: () => router.push('/dashboard'),
    },
    {
      command: ['Select base scenario', 'Base scenario'],
      callback: () => {
        setScenario('base');
        router.push('/scenarios');
      },
    },
    {
      command: ['Select intermediate scenario', 'Intermediate scenario'],
      callback: () => {
        setScenario('intermediate');
        router.push('/scenarios');
      },
    },
    {
      command: ['Select advanced scenario', 'Advanced scenario'],
      callback: () => {
        setScenario('advanced');
        router.push('/scenarios');
      },
    },
  ];

  const { transcript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition({ commands });

  const startListening = () => {
    if (browserSupportsSpeechRecognition) {
      SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
    }
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };
  
  // Auto-start listening on mount (optional, might be annoying, better to have a toggle)
  // For this demo, we'll let the user toggle it via UI, but export the controls.

  return {
    transcript,
    listening,
    startListening,
    stopListening,
    browserSupportsSpeechRecognition,
  };
};

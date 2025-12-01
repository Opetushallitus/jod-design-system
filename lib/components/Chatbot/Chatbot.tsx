import React from 'react';
import { useEnvironment } from '../../hooks/useEnvironment';

/** A component for displaying the AI chatbot */
export const Chatbot = () => {
  const { isProd } = useEnvironment();
  const src = 'https://okm-ps32.aiagent.fi/chat/AIAgentChatComponent.js';
  React.useEffect(() => {
    if (isProd) return;
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [src, isProd]);

  return null;
};

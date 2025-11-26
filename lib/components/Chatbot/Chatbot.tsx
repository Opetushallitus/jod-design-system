import React from 'react';

/** A component for displaying the AI chatbot */
export const Chatbot = () => {
  const src = 'https://okm-ps32.aiagent.fi/chat/AIAgentChatComponent.js';
  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [src]);

  return null;
};

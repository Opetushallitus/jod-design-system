import React from 'react';

declare module 'react/jsx-runtime' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'ai-agent-float-container': unknown;
      'ai-agent-view-switch': unknown;
      'ai-agent-embed': unknown;
      'ai-agent-dialog-row': unknown;
    }
  }
}

/** A component for displaying the AI chatbot */
export const Chatbot = () => {
  const src = 'https://okm-ps32.aiagent.fi/chat/AIAgentChatComponent.js';
  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://okm-ps32.aiagent.fi/chat/AIAgentChatComponent.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [src]);

  return null;
};

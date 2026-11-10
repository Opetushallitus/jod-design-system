import React from 'react';

/** Id of the element that the third-party chatbot script appends to `<body>` */
const CHATBOT_ROOT_ID = 'ai-agent-component-root';

export interface ChatbotProps {
  /** Accessible name for the chatbot landmark region, e.g. "Neuvontabotti" */
  ariaLabel: string;
}

/**
 * A component for displaying the AI chatbot.
 *
 * Renders nothing itself: it loads a third-party script, which appends its own root element
 * directly to `<body>` (so it can't be wrapped in JSX) and re-creates that element on load and
 * whenever the `<html lang>` attribute changes. The root element is turned into a labelled
 * landmark region every time it (re)appears, so that the chatbot isn't content outside landmarks.
 */
export const Chatbot = ({ ariaLabel }: ChatbotProps) => {
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

  React.useEffect(() => {
    const labelChatbotRoot = () => {
      const chatbotRoot = document.getElementById(CHATBOT_ROOT_ID);
      chatbotRoot?.setAttribute('role', 'region');
      chatbotRoot?.setAttribute('aria-label', ariaLabel);
    };
    labelChatbotRoot();
    const observer = new MutationObserver(labelChatbotRoot);
    observer.observe(document.body, { childList: true });
    return () => observer.disconnect();
  }, [ariaLabel]);

  return null;
};

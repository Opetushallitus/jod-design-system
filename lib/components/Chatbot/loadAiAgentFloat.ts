let isLoaded = false;

export const loadAiAgentFloat = () => {
  if (isLoaded) {
    return;
  }

  const script = document.createElement('script');
  script.src = 'https://okm-ps32.aiagent.fi/integrations/embed/ai-agent-embed.js';
  script.async = true;
  document.body.appendChild(script);

  const script2 = document.createElement('script');
  script2.src = 'https://okm-ps32.aiagent.fi/integrations/components/ai-agent-components.js';
  script2.async = true;
  document.body.appendChild(script2);

  isLoaded = true;
};

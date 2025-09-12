let isLoaded = false;

export const loadAiAgentFloat = () => {
  if (isLoaded) {
    return;
  }

  const components = document.createElement('script');
  components.src = 'https://okm-ps32.aiagent.fi/integrations/next/ai-agent-components.js';
  components.async = true;
  document.body.appendChild(components);

  const embed = document.createElement('script');
  embed.src = 'https://okm-ps32.aiagent.fi/integrations/next/ai-agent-embed.js';
  embed.async = true;
  document.body.appendChild(embed);

  const style = document.createElement('style');
  style.setAttribute('data-theme', 'ai-agent-theme-style');
  style.textContent = `
:host, :root {
  --primary: #ee7c45;
}
.ai-agent-float-container-open-chat {
  --radius-md: 50%;
  padding: 0 !important;
  box-shadow: 0 3px 6px rgba(0,0,0,.18);
}
.ai-agent-float-container-open-chat:hover {
  background-color: rgb(190, 99, 55) !important;
}
.ai-agent-float-container-open-chat > span {
  margin: 4px !important;
}
  `;
  document.head.appendChild(style);

  isLoaded = true;
};

import React from 'react';
import { loadAiAgentFloat } from './loadAiAgentFloat';

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
export const Chatbot = ({
  agent,
  language,
  header,
  openWindowText,
  agentName,
  waitingmessage,
  errorMessage,
  greeting,
  textInputPlaceholder,
  disclaimer,
}: {
  /** The agent's unique identifier */
  agent: string;
  /** The language code for the chat */
  language: string;
  /** The header text for the chat window */
  header: string;
  /** The text to display when opening the chat window */
  openWindowText: string;
  /** The name of the agent */
  agentName: string;
  /** The waiting message to display */
  waitingmessage: string;
  /** The error message to display */
  errorMessage: string;
  /** The greeting message to display */
  greeting: string;
  /** The placeholder text for the text input */
  textInputPlaceholder: string;
  /** The disclaimer text to display above the text input*/
  disclaimer: string;
}) => {
  React.useEffect(() => {
    loadAiAgentFloat();
  }, []);

  return (
    <ai-agent-float-container
      key={language} // Force re-render on language change
      language={language}
      background="neutral"
      width="340px"
      height="540px"
    >
      <div slot="header" className="ds:flex ds:flex-row ds:items-center ds:justify-between ds:grow ds:gap-3 ds:p-5">
        <h2 className="ds:text-heading-2 ds:font-poppins ds:text-black">{header}</h2>
      </div>
      <ai-agent-view-switch slot="content">
        <ai-agent-embed
          slot="view-0"
          language={language}
          server="https://okm-ps32.aiagent.fi/services/sva"
          agent={agent}
          agentname={agentName}
          waitingmessage={waitingmessage}
          errormessage={errorMessage}
          textinputplaceholder={textInputPlaceholder}
          disclaimer={disclaimer}
        >
          <ai-agent-dialog-row
            slot="pre-chat-messages"
            // eslint-disable-next-line jsx-a11y/aria-role
            role="agent"
            sender={agentName}
            message={greeting}
          ></ai-agent-dialog-row>
        </ai-agent-embed>
      </ai-agent-view-switch>
      <span slot="open-chat-button-content" className="ds:rounded-full" aria-label={openWindowText}>
        <svg width="40" height="40" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M27.6667 19.2793H25V24.1326H27.6667V19.2793Z" fill="black" />
          <path d="M19.6667 19.2793H17V24.1326H19.6667V19.2793Z" fill="black" />
          <path
            d="M34.88 13.56C34.36 13.04 33.7333 12.7733 33 12.7733H23.6667V8H17V10.6667H21V12.7867H11.6667C10.9333 12.7867 10.3067 13.0533 9.78667 13.5733C9.26667 14.0933 9 14.72 9 15.4533V27.9867C9 28.7333 9.26667 29.36 9.78667 29.88C10.3067 30.4 10.9333 30.6667 11.6667 30.6667H14.5733V36L19.9067 30.6667H33C33.7333 30.6667 34.36 30.4 34.88 29.88C35.4 29.36 35.6667 28.7333 35.6667 28V15.4267C35.6667 14.6933 35.4 14.0667 34.88 13.5467V13.56ZM33 27.9867H18.7733L17.24 29.48V27.9867H11.6667V15.4267H32.9867V27.9733L33 27.9867Z"
            fill="black"
          />
        </svg>
      </span>
    </ai-agent-float-container>
  );
};

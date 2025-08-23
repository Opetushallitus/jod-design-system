import React from 'react';
import { loadAiAgentFloat } from './loadAiAgentFloat';

declare module 'react/jsx-runtime' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'ai-agent-styles': unknown;
      'ai-agent-float-container': unknown;
      'ai-agent-text': unknown;
      'ai-agent-icon-button': unknown;
      'ai-agent-view-switch': unknown;
      'ai-agent-embed': unknown;
      'ai-agent-button': unknown;
    }
  }
}

/** A component for displaying the AI chatbot */
export const Chatbot = ({
  agent,
  language,
  agentIcon,
  header,
  openWindowText,
  agentName,
  errorMessage,
  greeting,
  textInputPlaceholder,
  textInputHelper,
  eraseChatHistory,
  saveChatAsCsv,
  close,
  zIndex = 40,
  dataTestId,
}: {
  /** The agent's unique identifier */
  agent: string;
  /** The language code for the chat */
  language: string;
  /** The URL for the agent's icon */
  agentIcon: string;
  /** The header text for the chat window */
  header: string;
  /** The text to display when opening the chat window */
  openWindowText: string;
  /** The name of the agent */
  agentName: string;
  /** The error message to display */
  errorMessage: string;
  /** The greeting message to display */
  greeting: string;
  /** The placeholder text for the text input */
  textInputPlaceholder: string;
  /** The helper text for the text input */
  textInputHelper: string;
  /** The text to display when erasing chat history */
  eraseChatHistory: string;
  /** The text to display when saving chat as CSV */
  saveChatAsCsv: string;
  /** The text to display when closing the chat */
  close: string;
  zIndex?: number;
  dataTestId?: string;
}) => {
  React.useEffect(() => {
    loadAiAgentFloat();
  }, []);

  return (
    <ai-agent-styles
      primary="#ee7c45"
      primarycontrast="#00464a"
      error="#de342b"
      fontfamily="Arial"
      paper="#ffffff"
      text="#1f1f1f"
    >
      <ai-agent-float-container
        key={language} // Force re-render on language change
        width="30em"
        enablescroll="true"
        zindex={zIndex}
        background="primary"
        backgroundpaper="true"
        language={language}
        agenticon={agentIcon}
        openwindowtext={openWindowText}
        openchatsize="large"
        data-testid={dataTestId}
      >
        <div slot="header" className="ds:flex ds:flex-row ds:items-center ds:justify-between ds:grow ds:gap-3 ds:p-5">
          <ai-agent-text>{header}</ai-agent-text>
          <ai-agent-icon-button
            icon="menu"
            onClick={() => {
              window.dispatchEvent(
                new CustomEvent('ai-agent-view-switch-change-view', {
                  detail: { view: 1 },
                }),
              );
            }}
          />
        </div>
        <ai-agent-view-switch slot="content" initialview="0">
          <ai-agent-embed
            slot="view-0"
            agent={agent}
            server="https://okm-ps32.aiagent.fi/services/sva"
            language={language}
            paper="#ffffff"
            primary="#ee7c45"
            primarycontrast="#00464a"
            text="#1f1f1f"
            error="#de342b"
            fontfamily="Arial"
            agentname={agentName}
            dense="false"
            errormessage={errorMessage}
            feedbacktype="None"
            greeting={greeting}
            omitgreeting="false"
            multilineinput="true"
            textinputplaceholder={textInputPlaceholder}
            textinputhelper={textInputHelper}
            width="21.5rem"
          />
          <div slot="view-1" className="ds:flex ds:flex-col ds:items-center ds:gap-5">
            <ai-agent-button
              onClick={() => {
                window.dispatchEvent(new CustomEvent('ai-agent-reset-chat'));
                window.dispatchEvent(
                  new CustomEvent('ai-agent-view-switch-change-view', {
                    detail: { view: 0 },
                  }),
                );
              }}
            >
              {eraseChatHistory}
            </ai-agent-button>
            <ai-agent-button
              onClick={() => {
                window.dispatchEvent(new CustomEvent('ai-agent-save-chat'));
              }}
            >
              {saveChatAsCsv}
            </ai-agent-button>
            <ai-agent-button
              variant="outlined"
              onClick={() => {
                window.dispatchEvent(
                  new CustomEvent('ai-agent-view-switch-change-view', {
                    detail: { view: 0 },
                  }),
                );
              }}
            >
              {close}
            </ai-agent-button>
          </div>
        </ai-agent-view-switch>
      </ai-agent-float-container>
    </ai-agent-styles>
  );
};

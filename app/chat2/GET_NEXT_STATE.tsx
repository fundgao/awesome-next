import { ReactNode } from "react";

export type State =
  | "INITIAL"
  | "COMPLETED"
  | "SINGLE_HASH_TAG"
  | "ASTERISK_OPEN"
  | "DOUBLE_ASTERISK_OPEN"
  | "ASTERISK_CONTENT"
  | "DOUBLE_ASTERISK_CONTENT"
  | "UNDERSCORE_OPEN"
  | "DOUBLE_UNDERSCORE_OPEN"
  | "UNDERSCORE_CONTENT"
  | "DOUBLE_UNDERSCORE_CONTENT"
  | "LINK_TEXT_OPEN"
  | "LINK_TEXT_CONTENT"
  | "LINK_URL_OPEN"
  | "LINK_URL_CONTENT"
  | "BACKTICK_OPEN"
  | "BACKTICK_CONTENT"
  | "DOUBLE_BACKTICK_OPEN"
  | "TRIPLE_BACKTICK_OPEN"
  | "CODE_BLOCK_CONTENT"
  | "LIST_ITEM_START"
  | "LIST_ITEM_CONTENT";

type StateTransitionFunction = (
  currentState: State,
  nextChar: string | null,
  buffer: ReactNode
) => {
  flushPayload: ReactNode | null;
  nextState: State;
  nextBuffer: ReactNode;
};

// @ts-expect-error fix it later
export const GET_NEXT_STATE: StateTransitionFunction = (
  currentState,
  nextChar,
  buffer
) => {
  // Streaming completes, no more chars to read, so directly flush whatever we have
  if (nextChar === null) {
    return {
      flushPayload: buffer,
      nextState: "COMPLETED",
      nextBuffer: null,
    };
  }

  // First time sees "#", enter SINGLE_HASH_TAG state
  if (currentState === "INITIAL" && nextChar === "#") {
    return {
      flushPayload: null,
      nextState: "SINGLE_HASH_TAG",
      nextBuffer: null,
    };
  }

  // Handles the state transition from SINGLE_HASH_TAG
  if (currentState === "SINGLE_HASH_TAG" && nextChar !== "#") {
    if (nextChar === "\n") {
      return {
        flushPayload: <h1>{buffer}</h1>,
        nextState: "INITIAL",
        nextBuffer: null,
      };
    } else {
      return {
        flushPayload: null,
        nextState: "SINGLE_HASH_TAG",
        nextBuffer: (
          <>
            {buffer}
            {nextChar}
          </>
        ),
      };
    }
  }

  // Bold with asterisks: **bold**
  if (currentState === "INITIAL" && nextChar === "*") {
    return {
      flushPayload: null,
      nextState: "ASTERISK_OPEN",
      nextBuffer: buffer,
    };
  }

  if (currentState === "ASTERISK_OPEN" && nextChar === "*") {
    return {
      flushPayload: null,
      nextState: "DOUBLE_ASTERISK_OPEN",
      nextBuffer: buffer,
    };
  }

  if (currentState === "ASTERISK_OPEN" && nextChar !== "*") {
    return {
      flushPayload: null,
      nextState: "ASTERISK_CONTENT",
      nextBuffer: nextChar,
    };
  }

  if (currentState === "ASTERISK_CONTENT" && nextChar === "*") {
    return {
      flushPayload: <em>{buffer}</em>,
      nextState: "INITIAL",
      nextBuffer: null,
    };
  }

  if (currentState === "DOUBLE_ASTERISK_OPEN" && nextChar !== "*") {
    return {
      flushPayload: null,
      nextState: "DOUBLE_ASTERISK_CONTENT",
      nextBuffer: nextChar,
    };
  }

  if (currentState === "DOUBLE_ASTERISK_CONTENT" && nextChar === "*") {
    return {
      flushPayload: null,
      nextState: "ASTERISK_OPEN",
      nextBuffer: buffer,
    };
  }

  if (currentState === "ASTERISK_OPEN" && buffer && nextChar === "*") {
    return {
      flushPayload: <strong>{buffer}</strong>,
      nextState: "INITIAL",
      nextBuffer: null,
    };
  }

  // Italic with underscores: _italic_
  if (currentState === "INITIAL" && nextChar === "_") {
    return {
      flushPayload: null,
      nextState: "UNDERSCORE_OPEN",
      nextBuffer: buffer,
    };
  }

  if (currentState === "UNDERSCORE_OPEN" && nextChar === "_") {
    return {
      flushPayload: null,
      nextState: "DOUBLE_UNDERSCORE_OPEN",
      nextBuffer: buffer,
    };
  }

  if (currentState === "UNDERSCORE_OPEN" && nextChar !== "_") {
    return {
      flushPayload: null,
      nextState: "UNDERSCORE_CONTENT",
      nextBuffer: nextChar,
    };
  }

  if (currentState === "UNDERSCORE_CONTENT" && nextChar === "_") {
    return {
      flushPayload: <em>{buffer}</em>,
      nextState: "INITIAL",
      nextBuffer: null,
    };
  }

  if (currentState === "DOUBLE_UNDERSCORE_OPEN" && nextChar !== "_") {
    return {
      flushPayload: null,
      nextState: "DOUBLE_UNDERSCORE_CONTENT",
      nextBuffer: nextChar,
    };
  }

  if (currentState === "DOUBLE_UNDERSCORE_CONTENT" && nextChar === "_") {
    return {
      flushPayload: null,
      nextState: "UNDERSCORE_OPEN",
      nextBuffer: buffer,
    };
  }

  if (currentState === "UNDERSCORE_OPEN" && buffer && nextChar === "_") {
    return {
      flushPayload: <strong>{buffer}</strong>,
      nextState: "INITIAL",
      nextBuffer: null,
    };
  }

  // Links: [text](url)
  if (currentState === "INITIAL" && nextChar === "[") {
    return {
      flushPayload: null,
      nextState: "LINK_TEXT_OPEN",
      nextBuffer: "",
    };
  }

  if (currentState === "LINK_TEXT_OPEN" && nextChar !== "]") {
    return {
      flushPayload: null,
      nextState: "LINK_TEXT_CONTENT",
      nextBuffer: nextChar,
    };
  }

  if (currentState === "LINK_TEXT_CONTENT" && nextChar !== "]") {
    return {
      flushPayload: null,
      nextState: "LINK_TEXT_CONTENT",
      nextBuffer: (
        <>
          {buffer}
          {nextChar}
        </>
      ),
    };
  }

  if (
    (currentState === "LINK_TEXT_CONTENT" ||
      currentState === "LINK_TEXT_OPEN") &&
    nextChar === "]"
  ) {
    return {
      flushPayload: null,
      nextState: "LINK_URL_OPEN",
      nextBuffer: buffer,
    };
  }

  if (currentState === "LINK_URL_OPEN" && nextChar === "(") {
    return {
      flushPayload: null,
      nextState: "LINK_URL_CONTENT",
      nextBuffer: { text: buffer, url: "" },
    };
  }

  if (currentState === "LINK_URL_CONTENT" && nextChar !== ")") {
    const linkData = buffer as unknown as { text: ReactNode; url: string };
    return {
      flushPayload: null,
      nextState: "LINK_URL_CONTENT",
      nextBuffer: {
        text: linkData.text,
        url: linkData.url + nextChar,
      },
    };
  }

  if (currentState === "LINK_URL_CONTENT" && nextChar === ")") {
    const linkData = buffer as unknown as { text: ReactNode; url: string };
    return {
      flushPayload: <a href={linkData.url}>{linkData.text}</a>,
      nextState: "INITIAL",
      nextBuffer: null,
    };
  }

  // Code blocks with backticks: `code`
  if (currentState === "INITIAL" && nextChar === "`") {
    return {
      flushPayload: null,
      nextState: "BACKTICK_OPEN",
      nextBuffer: "",
    };
  }

  if (currentState === "BACKTICK_OPEN" && nextChar === "`") {
    return {
      flushPayload: null,
      nextState: "DOUBLE_BACKTICK_OPEN",
      nextBuffer: "",
    };
  }

  if (currentState === "DOUBLE_BACKTICK_OPEN" && nextChar === "`") {
    return {
      flushPayload: null,
      nextState: "TRIPLE_BACKTICK_OPEN",
      nextBuffer: "",
    };
  }

  if (currentState === "BACKTICK_OPEN" && nextChar !== "`") {
    return {
      flushPayload: null,
      nextState: "BACKTICK_CONTENT",
      nextBuffer: nextChar,
    };
  }

  if (currentState === "BACKTICK_CONTENT" && nextChar !== "`") {
    return {
      flushPayload: null,
      nextState: "BACKTICK_CONTENT",
      nextBuffer: (
        <>
          {buffer}
          {nextChar}
        </>
      ),
    };
  }

  if (currentState === "BACKTICK_CONTENT" && nextChar === "`") {
    return {
      flushPayload: <code>{buffer}</code>,
      nextState: "INITIAL",
      nextBuffer: null,
    };
  }

  if (currentState === "TRIPLE_BACKTICK_OPEN" && nextChar !== "`") {
    return {
      flushPayload: null,
      nextState: "CODE_BLOCK_CONTENT",
      nextBuffer: nextChar,
    };
  }

  if (currentState === "CODE_BLOCK_CONTENT" && nextChar !== "`") {
    return {
      flushPayload: null,
      nextState: "CODE_BLOCK_CONTENT",
      nextBuffer: (
        <>
          {buffer}
          {nextChar}
        </>
      ),
    };
  }

  // Simple list items
  if (currentState === "INITIAL" && nextChar === "-") {
    return {
      flushPayload: null,
      nextState: "LIST_ITEM_START",
      nextBuffer: "",
    };
  }

  if (currentState === "LIST_ITEM_START" && nextChar === " ") {
    return {
      flushPayload: null,
      nextState: "LIST_ITEM_CONTENT",
      nextBuffer: "",
    };
  }

  if (currentState === "LIST_ITEM_CONTENT" && nextChar !== "\n") {
    return {
      flushPayload: null,
      nextState: "LIST_ITEM_CONTENT",
      nextBuffer: (
        <>
          {buffer}
          {nextChar}
        </>
      ),
    };
  }

  if (currentState === "LIST_ITEM_CONTENT" && nextChar === "\n") {
    return {
      flushPayload: <li>{buffer}</li>,
      nextState: "INITIAL",
      nextBuffer: null,
    };
  }

  // Default case - just accumulate characters
  return {
    flushPayload: (
      <>
        {buffer}
        {nextChar}
      </>
    ),
    nextState: "INITIAL",
    nextBuffer: null,
  };
};

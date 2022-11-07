import React, { useContext } from "react";
import { socket, updateLiveDoc } from "../../core/socket";

export type LiveDocument = {
  doc: string;
  updateDoc: (newDoc: string) => void;
};

interface Props {
  children: React.ReactNode;
}

export const LiveDocumentContext = React.createContext<LiveDocument | null>(
  null
);

export function useLive() {
  return useContext(LiveDocumentContext) as LiveDocument;
}

export const LiveDocProvider: React.FC<Props> = ({ children }) => {
  const [doc, setDoc] = React.useState("# Welcome");

  function updateDoc(newDoc: string) {
    setDoc(newDoc);

    if (socket.connected) {
      updateLiveDoc(newDoc);
    }
  }

  socket.on("doc-updated", (updatedDoc) => {
    console.log("updated");
    setDoc(updatedDoc);
  });

  const data = {
    doc,
    updateDoc,
  };

  return (
    <LiveDocumentContext.Provider value={data}>
      {children}
    </LiveDocumentContext.Provider>
  );
};

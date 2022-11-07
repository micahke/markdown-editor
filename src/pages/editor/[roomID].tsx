import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { joinRoom, socket } from "../../core/socket";
import Application from "../editor";
import { GetServerSideProps, NextPageContext } from "next";

export default function Room() {
  const router = useRouter();
  const [rid, setRoomID] = useState<string>();

  useEffect(() => {
    if (router.isReady) {
      const { roomID } = router.query;
      setRoomID(roomID as string);
      joinRoom(roomID as string);
    }
  }, [router.isReady]);

  return <Application roomID={rid as string} />;
}

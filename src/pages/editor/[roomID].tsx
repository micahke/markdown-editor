import { useRouter } from "next/router";
import Application from "../editor";

export default function Room() {
  const router = useRouter();
  const { roomID } = router.query;

  return <Application roomID={roomID as string} />;
}

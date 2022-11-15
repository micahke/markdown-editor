import { BiCodeAlt } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { AiFillEye, AiFillMobile } from "react-icons/ai";
import { IoTimerSharp } from "react-icons/io5";

interface Feature {
  title: string;
  description: string;
  icon?: JSX.Element;
}

export const features: Feature[] = [
  {
    title: "Full Syntax Highlighting",
    description:
      "Include code blocks with full syntax highlighting for almost any language. Simply define the language and the editor will take care of the rest.",
    icon: <BiCodeAlt size={30} color={"teal"} />,
  },
  {
    title: "Easy Collaboration",
    description:
      "Edit documents with others in realtime! Invite others to the document by sharing the room code.",
    icon: <FaUsers size={30} color={"teal"} />,
  },
  {
    title: "Live Preview Mode",
    description:
      "Get a live preview of the Markdown output as you type. Watch your documents take shape in realtime.",
    icon: <AiFillEye size={30} color={"teal"} />,
  },
  {
    title: "Disappearing Rooms",
    description:
      "Rooms exists for as long or as little as you need them. Once you're done editing, there's no need to manage documents in the cloud.",
    icon: <IoTimerSharp size={30} color={"teal"} />,
  },
  {
    title: "Mobile Support",
    description:
      "The editor is filly supported on both mobile and desktop. Mobile users can toggle in between edit and preview modes while writing.",
    icon: <AiFillMobile size={30} color={"teal"} />,
  },
];

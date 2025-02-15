import { useState } from "react";

export default function ChatBox() {
  return <div></div>;
}

//   const [message, setMessage] = useState("");
//
//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         marginLeft: "50px",
//         minHeight: "100%",
//         fontSize: "10px",
//       }}
//     >
//       <textarea
//         style={{
//           height: "70%",
//           minWidth: "350px",
//           marginBottom: "4px",
//           border: "2px solid gray",
//           backgroundColor: "#d1d1d1",
//           fontSize: "10px",
//           lineHeight: "1",
//         }}
//         value={chatHistory
//           .map((chat) => {
//             const { user, message } = chat;
//             return `${user}: ${message}`;
//           })
//           .join("\n")}
//         ref={textRef}
//         readOnly
//       />
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           if (message !== "" && gameId) {
//             sendChat(gameId, username ?? "Guest", message);
//             setMessage("");
//           }
//         }}
//       >
//         <input
//           type="text"
//           placeholder="chat"
//           style={{
//             minWidth: "350px",
//             border: "2px solid gray",
//             backgroundColor: "#d1d1d1",
//             fontSize: "12px",
//           }}
//           value={message}
//           onChange={(e) => {
//             setMessage(e.target.value);
//           }}
//           disabled={!gameId}
//         />
//       </form>
//     </div>
//   );

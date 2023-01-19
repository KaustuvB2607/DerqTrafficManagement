interface MessageBubbleProps {
  message: string;
  time: string;
  inbound?: boolean;
}

export default function MessageBubble({
  inbound,
  message,
  time,
}: MessageBubbleProps) {
  if (inbound) {
    return (
      <div className="flex justify-start my-2.5">
        <div className="msg-text text-breen-gray8 bg-breen-transparentBlue py-2 px-5 rounded-full mr-3">
          {message}
        </div>
        <div className="msg-text text-breen-gray7 py-2">{time}</div>
      </div>
    );
  } else {
    return (
      <div className="flex justify-end my-2.5">
        <div className="msg-text text-breen-gray7 py-2">{time}</div>
        <div className="msg-text text-breen-gray5 bg-breen-gray6 py-2 px-5 rounded-full ml-3">
          {message}
        </div>
      </div>
    );
  }
}

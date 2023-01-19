interface MessageThreadProps {
  id: number;
  setSelectedId: (x: number) => void;
  selectedId: number;
  onClick: (e: any) => void;
  number: string;
  time: string;
  message: string;
}

export default function MessageThread({
  id,
  selectedId,
  setSelectedId,
  onClick,
  number,
  time,
  message,
}: MessageThreadProps) {
  return (
    <div
      className={`px-8 py-2 border-b cursor-pointer ${
        selectedId === id ? "bg-breen-offWhite" : ""
      }`}
      onClick={(e: any) => {
        setSelectedId(id);
        onClick(e);
      }}
    >
      <div className="flex justify-between">
        <div className="text-gray-700 msg-title">{number}</div>
        <div className="msg-text text-breen-gray3">{time}</div>
      </div>
      <div className="msg-text text-breen-black mt-1">{message}</div>
    </div>
  );
}

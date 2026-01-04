interface ChatHeaderProps {
  title: string;
  messageCount: number;
  onClear?: () => void;
}

export default function ChatHeader({ title, messageCount, onClear }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-gray-950">
      <div>
        <h2 className="text-lg font-semibold text-gray-100">{title}</h2>
        <p className="text-xs text-gray-500">{messageCount} messages</p>
      </div>
      {onClear && (
        <button
          onClick={onClear}
          className="text-xs text-gray-500 hover:text-gray-300 px-3 py-1 rounded border border-gray-700 hover:border-gray-600 transition-colors"
        >
          Clear
        </button>
      )}
    </div>
  );
}

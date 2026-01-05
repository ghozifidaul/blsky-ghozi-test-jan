import { ConnectionStatus } from '../../types/chat';

interface ChatHeaderProps {
  title: string;
  messageCount: number;
  onClear?: () => void;
  connectionStatus?: ConnectionStatus;
}

export default function ChatHeader({ title, messageCount, onClear, connectionStatus }: ChatHeaderProps) {
  const getStatusColor = () => {
    switch (connectionStatus?.status) {
      case 'connected':
        return 'bg-green-500';
      case 'connecting':
        return 'bg-yellow-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = () => {
    switch (connectionStatus?.status) {
      case 'connected':
        return 'Connected';
      case 'connecting':
        return 'Connecting...';
      case 'error':
        return connectionStatus.error || 'Error';
      default:
        return 'Disconnected';
    }
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-gray-950">
      <div>
        <h2 className="text-lg font-semibold text-gray-100">{title}</h2>
        <p className="text-xs text-gray-500 flex items-center gap-2">
          {messageCount} messages
          {connectionStatus && (
            <>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span className={`w-2 h-2 rounded-full ${getStatusColor()} ${connectionStatus.status === 'connecting' ? 'animate-pulse' : ''}`} />
                <span className={connectionStatus.status === 'error' ? 'text-red-500' : ''}>
                  {getStatusText()}
                </span>
              </span>
            </>
          )}
        </p>
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

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { Icon } from './Icon';

interface ToastItem {
  id: number;
  text: string;
  tone: 'info' | 'success' | 'error';
}

const ToastContext = createContext<(text: string, tone?: ToastItem['tone']) => void>(() => {});

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const counter = useRef(0);

  const push = useCallback((text: string, tone: ToastItem['tone'] = 'info') => {
    const id = ++counter.current;
    setItems((list) => [...list.slice(-2), { id, text, tone }]);
  }, []);

  const dismiss = useCallback((id: number) => setItems((list) => list.filter((t) => t.id !== id)), []);

  return (
    <ToastContext.Provider value={push}>
      {children}
      <div className="toasts" role="status" aria-live="polite">
        {items.map((t) => (
          <Toast key={t.id} item={t} onDone={() => dismiss(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function Toast({ item, onDone }: { item: ToastItem; onDone: () => void }) {
  useEffect(() => {
    const timer = window.setTimeout(onDone, 4800);
    return () => window.clearTimeout(timer);
  }, [onDone]);
  return (
    <div className={`toast toast--${item.tone}`}>
      <Icon name={item.tone === 'error' ? 'alert' : item.tone === 'success' ? 'check' : 'info'} />
      <p>{item.text}</p>
      <button type="button" className="toast__close" onClick={onDone} aria-label="Close notification">
        <Icon name="close" />
      </button>
    </div>
  );
}

export const useToast = () => useContext(ToastContext);

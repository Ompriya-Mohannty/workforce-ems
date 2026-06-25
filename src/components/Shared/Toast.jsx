import React from 'react';
import { useAuth } from '../../context/AuthContext';

const icons = {
  success: '✓',
  error:   '✕',
  warning: '⚠',
  info:    'ℹ',
};

export default function Toast() {
  const { toasts } = useAuth();
  if (!toasts.length) return null;
  return (
    <div className="toast-wrap">
      {toasts.map(t => (
        <div key={t.id} className={`toast toast-${t.type || 'success'}`}>
          <span style={{ fontSize: 16 }}>{icons[t.type] || icons.success}</span>
          {t.message}
        </div>
      ))}
    </div>
  );
}

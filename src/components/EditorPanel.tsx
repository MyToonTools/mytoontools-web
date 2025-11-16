import type { ChangeEvent } from 'react'
import './EditorPanel.css'

interface EditorPanelProps {
  title: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  readOnly?: boolean
  error?: string
}

export function EditorPanel({
  title,
  value,
  onChange,
  placeholder,
  readOnly = false,
  error,
}: EditorPanelProps) {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }

  return (
    <div className="editor-panel">
      <div className="editor-header">
        <h2 className="editor-title">{title}</h2>
        {value && !readOnly && (
          <button className="clear-button" onClick={() => onChange('')}>
            Clear
          </button>
        )}
      </div>
      <textarea
        className={`editor-textarea ${error ? 'error' : ''}`}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        readOnly={readOnly}
        spellCheck={false}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  )
}

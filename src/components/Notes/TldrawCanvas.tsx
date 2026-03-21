import type { Editor } from 'tldraw'
import { Tldraw } from 'tldraw'
import 'tldraw/tldraw.css'

interface Props {
  persistenceKey: string
  onEditorMount?: (editor: Editor) => void
}

// Loaded lazily — keeps tldraw out of the main bundle
export default function TldrawCanvas({ persistenceKey, onEditorMount }: Props) {
  return (
    <div className="w-full h-full">
      <Tldraw persistenceKey={persistenceKey} onMount={onEditorMount} />
    </div>
  )
}

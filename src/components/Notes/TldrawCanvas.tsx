import { Tldraw } from 'tldraw'
import 'tldraw/tldraw.css'

interface Props {
  persistenceKey: string
}

// Loaded lazily — keeps tldraw out of the main bundle
export default function TldrawCanvas({ persistenceKey }: Props) {
  return (
    <div className="w-full h-full">
      <Tldraw persistenceKey={persistenceKey} />
    </div>
  )
}

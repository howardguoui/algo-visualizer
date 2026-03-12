interface Props {
  isPlaying: boolean
  isFirst: boolean
  isLast: boolean
  stepIndex: number
  totalSteps: number
  speed: number
  arraySize: number
  onTogglePlay: () => void
  onStepForward: () => void
  onStepBackward: () => void
  onJumpToStart: () => void
  onJumpToEnd: () => void
  onSpeedChange: (speed: number) => void
  onArraySizeChange: (size: number) => void
  onRandomize: () => void
}

function IconBtn({
  onClick, disabled, title, children,
}: { onClick: () => void; disabled?: boolean; title: string; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-30 disabled:cursor-not-allowed text-white transition-colors"
    >
      {children}
    </button>
  )
}

export function Controls({
  isPlaying, isFirst, isLast,
  stepIndex, totalSteps, speed, arraySize,
  onTogglePlay, onStepForward, onStepBackward,
  onJumpToStart, onJumpToEnd,
  onSpeedChange, onArraySizeChange, onRandomize,
}: Props) {
  return (
    <div className="bg-slate-800 rounded-xl p-4 flex flex-wrap items-center gap-4">
      {/* Playback controls */}
      <div className="flex items-center gap-2">
        <IconBtn onClick={onJumpToStart} disabled={isFirst} title="Jump to start">
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
            <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/>
          </svg>
        </IconBtn>
        <IconBtn onClick={onStepBackward} disabled={isFirst} title="Step back">
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
            <path d="M6 6h2v12H6zm12 12L8 12l10-6z"/>
          </svg>
        </IconBtn>
        <button
          onClick={onTogglePlay}
          disabled={isLast}
          title={isPlaying ? 'Pause' : 'Play'}
          className="w-11 h-11 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-colors shadow-lg"
        >
          {isPlaying ? (
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>
        <IconBtn onClick={onStepForward} disabled={isLast} title="Step forward">
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
            <path d="M6 18l8.5-6L6 6v12zm2-8.14 5.14 2.64L8 15.14V9.86zM16 6h2v12h-2z"/>
          </svg>
        </IconBtn>
        <IconBtn onClick={onJumpToEnd} disabled={isLast} title="Jump to end">
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
            <path d="m6 18 8.5-6L6 6v12zm2-8.14 5.14 2.64L8 15.14V9.86zM16 6h2v12h-2z"/>
          </svg>
        </IconBtn>
      </div>

      {/* Step counter */}
      <div className="text-slate-400 text-sm font-mono min-w-[90px]">
        <span className="text-white font-bold">{stepIndex + 1}</span>
        <span className="text-slate-600"> / </span>
        <span>{totalSteps}</span>
      </div>

      {/* Progress bar */}
      <div className="flex-1 min-w-[100px] h-1.5 bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-150"
          style={{ width: `${((stepIndex + 1) / totalSteps) * 100}%` }}
        />
      </div>

      {/* Speed */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-slate-400 text-xs">Speed</span>
        <input
          type="range" min={1} max={7} value={speed}
          onChange={e => onSpeedChange(Number(e.target.value))}
          className="w-24 accent-blue-500"
        />
        <span className="text-blue-400 text-xs w-4">{speed}x</span>
      </div>

      {/* Array size */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-slate-400 text-xs">Size</span>
        <input
          type="range" min={5} max={80} value={arraySize}
          onChange={e => onArraySizeChange(Number(e.target.value))}
          className="w-20 accent-purple-500"
        />
        <span className="text-purple-400 text-xs w-5">{arraySize}</span>
      </div>

      {/* Randomize */}
      <button
        onClick={onRandomize}
        className="px-3 py-1.5 text-xs bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg transition-colors"
      >
        Randomize
      </button>
    </div>
  )
}

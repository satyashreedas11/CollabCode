import { useSettings } from "@/context/SettingsContext"
import useResponsive from "@/hooks/useResponsive"

function SettingsView() {
    const { viewHeight } = useResponsive()
    const {
        theme,
        setTheme,
        fontSize,
        setFontSize,
        tabSize,
        setTabSize,
        wordWrap,
        setWordWrap,
        minimap,
        setMinimap,
        lineNumbers,
        setLineNumbers,
        resetSettings,
    } = useSettings()

    return (
        <div className="flex flex-col gap-6 px-4 py-3" style={{ height: viewHeight }}>
            <div>
                <h2 className="text-lg font-semibold text-white">Editor settings</h2>
                <p className="text-xs text-white/50">
                    Customize your editing experience.
                </p>
            </div>

            <div className="space-y-4 text-sm text-white/80">
                <label className="flex flex-col gap-2">
                    Theme
                    <select
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)}
                        className="rounded-md border border-white/20 bg-black px-3 py-2 text-white"
                    >
                        <option value="dark">Dark</option>
                        <option value="light">Light</option>
                    </select>
                </label>

                <label className="flex flex-col gap-2">
                    Font size: {fontSize}px
                    <input
                        type="range"
                        min={12}
                        max={22}
                        value={fontSize}
                        onChange={(e) => setFontSize(Number(e.target.value))}
                    />
                </label>

                <label className="flex flex-col gap-2">
                    Tab size: {tabSize}
                    <input
                        type="range"
                        min={2}
                        max={8}
                        step={1}
                        value={tabSize}
                        onChange={(e) => setTabSize(Number(e.target.value))}
                    />
                </label>
            </div>

            <div className="space-y-3 text-sm text-white/80">
                <label className="flex items-center justify-between gap-4">
                    Word wrap
                    <input
                        type="checkbox"
                        checked={wordWrap}
                        onChange={(e) => setWordWrap(e.target.checked)}
                    />
                </label>
                <label className="flex items-center justify-between gap-4">
                    Minimap
                    <input
                        type="checkbox"
                        checked={minimap}
                        onChange={(e) => setMinimap(e.target.checked)}
                    />
                </label>
                <label className="flex items-center justify-between gap-4">
                    Line numbers
                    <input
                        type="checkbox"
                        checked={lineNumbers}
                        onChange={(e) => setLineNumbers(e.target.checked)}
                    />
                </label>
            </div>

            <button
                onClick={resetSettings}
                className="rounded-md border border-white/30 px-3 py-2 text-sm text-white transition hover:border-white/60"
            >
                Reset to defaults
            </button>
        </div>
    )
}

export default SettingsView

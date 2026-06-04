import { SettingsContext as SettingsContextType } from "@/types/setting"
import { ReactNode, createContext, useContext, useEffect, useState } from "react"

const DEFAULT_SETTINGS = {
    theme: "dark",
    language: "javascript",
    fontSize: 14,
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
    showGitHubCorner: true,
    tabSize: 4,
    wordWrap: true,
    minimap: true,
    lineNumbers: true,
}

type EditorSettings = SettingsContextType

const SettingsContext = createContext<EditorSettings | null>(null)

export const useSettings = (): EditorSettings => {
    const context = useContext(SettingsContext)
    if (!context) {
        throw new Error("useSettings must be used within a SettingsProvider")
    }
    return context
}

function SettingsProvider({ children }: { children: ReactNode }) {
    const [settings, setSettings] = useState(() => {
        const stored = localStorage.getItem("editorSettings")
        if (!stored) return DEFAULT_SETTINGS
        try {
            return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) }
        } catch {
            return DEFAULT_SETTINGS
        }
    })

    useEffect(() => {
        localStorage.setItem("editorSettings", JSON.stringify(settings))
    }, [settings])

    const contextValue: EditorSettings = {
        ...settings,
        setTheme: (theme) => setSettings((prev) => ({ ...prev, theme })),
        setLanguage: (language) =>
            setSettings((prev) => ({ ...prev, language })),
        setFontSize: (fontSize) =>
            setSettings((prev) => ({ ...prev, fontSize })),
        setFontFamily: (fontFamily) =>
            setSettings((prev) => ({ ...prev, fontFamily })),
        setShowGitHubCorner: (showGitHubCorner) =>
            setSettings((prev) => ({ ...prev, showGitHubCorner })),
        resetSettings: () => setSettings(DEFAULT_SETTINGS),
        tabSize: settings.tabSize,
        wordWrap: settings.wordWrap,
        minimap: settings.minimap,
        lineNumbers: settings.lineNumbers,
        setTabSize: (tabSize) => setSettings((prev) => ({ ...prev, tabSize })),
        setWordWrap: (wordWrap) =>
            setSettings((prev) => ({ ...prev, wordWrap })),
        setMinimap: (minimap) =>
            setSettings((prev) => ({ ...prev, minimap })),
        setLineNumbers: (lineNumbers) =>
            setSettings((prev) => ({ ...prev, lineNumbers })),
    }

    return (
        <SettingsContext.Provider value={contextValue}>
            {children}
        </SettingsContext.Provider>
    )
}

export { SettingsProvider }

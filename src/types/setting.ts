interface Settings {
    theme: string
    language: string
    fontSize: number
    fontFamily: string
    showGitHubCorner: boolean
    tabSize: number
    wordWrap: boolean
    minimap: boolean
    lineNumbers: boolean
}

interface SettingsContext extends Settings {
    setTheme: (theme: string) => void
    setLanguage: (language: string) => void
    setFontSize: (fontSize: number) => void
    setFontFamily: (fontFamily: string) => void
    setShowGitHubCorner: (showGitHubCorner: boolean) => void
    setTabSize: (tabSize: number) => void
    setWordWrap: (wordWrap: boolean) => void
    setMinimap: (minimap: boolean) => void
    setLineNumbers: (lineNumbers: boolean) => void
    resetSettings: () => void
}

export { Settings, SettingsContext }

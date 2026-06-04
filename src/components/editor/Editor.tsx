import { useAppContext } from "@/context/AppContext"
import { useFileSystem } from "@/context/FileContext"
import { useSettings } from "@/context/SettingsContext"
import { useSocket } from "@/context/SocketContext"
import usePageEvents from "@/hooks/usePageEvents"
import useResponsive from "@/hooks/useResponsive"
import { FileSystemItem } from "@/types/file"
import { SocketEvent } from "@/types/socket"
import { color } from "@uiw/codemirror-extensions-color"
import { hyperLink } from "@uiw/codemirror-extensions-hyper-link"
import { LanguageName, loadLanguage } from "@uiw/codemirror-extensions-langs"
import { vscodeDark } from "@uiw/codemirror-theme-vscode"
import CodeMirror, {
    Extension,
    ViewUpdate,
    scrollPastEnd,
} from "@uiw/react-codemirror"
import { EditorState } from "@codemirror/state"
import { EditorView, lineNumbers } from "@codemirror/view"
import * as minimapModule from "@replit/codemirror-minimap"
import { useEffect, useMemo, useState } from "react"
import toast from "react-hot-toast"
import { cursorTooltipBaseTheme, tooltipField } from "./tooltip"

function Editor() {
    const { users, currentUser } = useAppContext()
    const { activeFile, setActiveFile, getLockInfo } = useFileSystem()
    const { socket } = useSocket()
    const {
        fontSize,
        fontFamily,
        tabSize,
        wordWrap,
        minimap: showMinimap,
        lineNumbers: showLineNumbers,
        theme,
    } = useSettings()
    const { viewHeight } = useResponsive()
    const [timeOut, setTimeOut] = useState(setTimeout(() => {}, 0))
    const filteredUsers = useMemo(
        () => users.filter((u) => u.username !== currentUser.username),
        [users, currentUser],
    )
    const [extensions, setExtensions] = useState<Extension[]>([])
    const [language, setLanguage] = useState<string>("javascript")
    const minimapFactory =
        (minimapModule as { minimap?: () => Extension }).minimap ||
        (minimapModule as { default?: () => Extension }).default

    const lockInfo = getLockInfo(activeFile?.id || "")
    const isReadOnly =
        Boolean(lockInfo) && lockInfo?.lockedById !== currentUser.uid

    const onCodeChange = (code: string, view: ViewUpdate) => {
        if (!activeFile) return
        if (isReadOnly) {
            toast.error("Editor is locked")
            return
        }

        const file: FileSystemItem = { ...activeFile, content: code }
        setActiveFile(file)
        const cursorPosition = view.state?.selection?.main?.head
        socket.emit(SocketEvent.TYPING_START, {
            cursorPosition,
            fileId: activeFile.id,
        })
        socket.emit(SocketEvent.FILE_UPDATED, {
            fileId: activeFile.id,
            newContent: code,
        })
        clearTimeout(timeOut)

        const newTimeOut = setTimeout(
            () => socket.emit(SocketEvent.TYPING_PAUSE, { fileId: activeFile.id }),
            1000,
        )
        setTimeOut(newTimeOut)
    }

    // Listen wheel event to zoom in/out and prevent page reload
    usePageEvents()

    // Auto-detect language from file extension
    useEffect(() => {
        if (activeFile?.name) {
            const extension = activeFile.name.split(".").pop()?.toLowerCase()
            const langMap: Record<string, string> = {
                js: "javascript",
                jsx: "javascript",
                ts: "typescript",
                tsx: "typescript",
                py: "python",
                java: "java",
                cpp: "cpp",
                c: "c",
                html: "html",
                css: "css",
                json: "json",
            }
            setLanguage(langMap[extension || ""] || "javascript")
        }
    }, [activeFile])

    const themeExtension = useMemo(() => {
        const isDark = theme === "dark"
        return EditorView.theme(
            {
                "&": {
                    backgroundColor: isDark ? "#000000" : "#ffffff",
                    color: isDark ? "#ffffff" : "#111111",
                },
                ".cm-content": {
                    caretColor: isDark ? "#ffffff" : "#111111",
                },
                ".cm-gutters": {
                    backgroundColor: isDark ? "#000000" : "#ffffff",
                    color: isDark ? "#808080" : "#444444",
                    border: "none",
                },
            },
            { dark: isDark },
        )
    }, [theme])

    useEffect(() => {
        const extensions = [
            color,
            hyperLink,
            tooltipField(filteredUsers),
            cursorTooltipBaseTheme,
            scrollPastEnd(),
            EditorState.tabSize.of(tabSize),
            themeExtension,
        ]
        if (showLineNumbers) {
            extensions.unshift(lineNumbers())
        }
        if (wordWrap) {
            extensions.push(EditorView.lineWrapping)
        }
        if (showMinimap && minimapFactory) {
            extensions.push(minimapFactory())
        }
        const langExt = loadLanguage(language.toLowerCase() as LanguageName)
        if (langExt) {
            extensions.push(langExt)
        } else {
            toast.error(
                "Syntax highlighting is unavailable for this language.",
                {
                    duration: 3000,
                },
            )
        }

        setExtensions(extensions)
    }, [filteredUsers, language, showLineNumbers, showMinimap, tabSize, themeExtension, wordWrap])

    return (
        <CodeMirror
            theme={theme === "dark" ? vscodeDark : undefined}
            onChange={onCodeChange}
            value={activeFile?.content}
            extensions={extensions}
            readOnly={isReadOnly}
            minHeight="100%"
            maxWidth="100vw"
            style={{
                fontSize: `${fontSize}px`,
                fontFamily,
                height: viewHeight,
                position: "relative",
            }}
        />
    )
}

export default Editor

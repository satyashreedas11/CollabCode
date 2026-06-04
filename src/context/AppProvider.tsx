import { ReactNode } from "react"
import { AppContextProvider } from "./AppContext"
import { AuthProvider } from "./AuthContext"
import { ChatContextProvider } from "./ChatContext"
import { FileContextProvider } from "./FileContext"
import { RunCodeContextProvider } from "./RunCodeContext"
import { SocketProvider } from "./SocketContext"
import { ViewContextProvider } from "./ViewContext"
import { CopilotContextProvider } from "./CopilotContext"
import { SettingsProvider } from "./SettingsContext"

function AppProvider({ children }: { children: ReactNode }) {
    return (
        <AuthProvider>
            <AppContextProvider>
                <SettingsProvider>
                    <SocketProvider>
                        <ViewContextProvider>
                            <FileContextProvider>
                                <CopilotContextProvider>
                                    <RunCodeContextProvider>
                                        <ChatContextProvider>
                                            {children}
                                        </ChatContextProvider>
                                    </RunCodeContextProvider>
                                </CopilotContextProvider>
                            </FileContextProvider>
                        </ViewContextProvider>
                    </SocketProvider>
                </SettingsProvider>
            </AppContextProvider>
        </AuthProvider>
    )
}

export default AppProvider

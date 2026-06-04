import SplitterComponent from "@/components/SplitterComponent"
import ConnectionStatusPage from "@/components/connection/ConnectionStatusPage"
import Sidebar from "@/components/sidebar/Sidebar"
import WorkSpace from "@/components/workspace"
import { useAppContext } from "@/context/AppContext"
import { useAuth } from "@/context/AuthContext"
import { useSocket } from "@/context/SocketContext"
import useFullScreen from "@/hooks/useFullScreen"
import useUserActivity from "@/hooks/useUserActivity"
import { addRoomSessionMember, ensureRoom } from "@/services/rtdb"
import { SocketEvent } from "@/types/socket"
import { USER_STATUS } from "@/types/user"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

function EditorPage() {
    // Listen user online/offline status
    useUserActivity()
    // Enable fullscreen mode
    useFullScreen()
    const navigate = useNavigate()
    const { roomId } = useParams()
    const { status, setStatus, setCurrentUser, currentUser } = useAppContext()
    const { socket } = useSocket()
    const { user, loading } = useAuth()

    useEffect(() => {
        if (loading) return
        if (!roomId) {
            navigate("/app", { replace: true })
            return
        }
        if (!user) {
            return
        }
        if (
            status === USER_STATUS.JOINED ||
            status === USER_STATUS.ATTEMPTING_JOIN
        ) {
            return
        }
        const fallbackName =
            user.displayName || user.email?.split("@")[0] || "Developer"
        const joinUser = {
            ...currentUser,
            username: currentUser.username || fallbackName,
            roomId,
            uid: user.uid,
            email: user.email,
        }
        setStatus(USER_STATUS.ATTEMPTING_JOIN)
        setCurrentUser(joinUser)
        const runJoin = async () => {
            try {
                await ensureRoom(roomId, user.uid, joinUser.username)
                await addRoomSessionMember(roomId, user.uid, joinUser.username)
            } catch (error) {
                console.error(error)
            } finally {
                if (!socket.connected) {
                    socket.connect()
                }
                socket.emit(SocketEvent.JOIN_REQUEST, joinUser)
            }
        }
        runJoin()
    }, [
        currentUser.roomId,
        currentUser.username,
        loading,
        navigate,
        roomId,
        setStatus,
        setCurrentUser,
        socket,
        status,
        user,
    ])

    if (status === USER_STATUS.CONNECTION_FAILED) {
        return <ConnectionStatusPage />
    }

    return (
        <div className="relative min-h-screen overflow-hidden bg-black">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.08),transparent_55%)]"></div>
            <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 animate-pulse-slow rounded-full bg-white/10 blur-3xl"></div>
            <div className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 animate-pulse-slow rounded-full bg-white/10 blur-3xl delay-1000"></div>
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 animate-pulse-slow rounded-full bg-white/5 blur-3xl delay-500"></div>

            {/* Main content with glass effect */}
            <div className="relative z-10 h-screen">
                <SplitterComponent>
                    <Sidebar />
                    <WorkSpace />
                </SplitterComponent>
            </div>
        </div>
    )
}

export default EditorPage

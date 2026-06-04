import { useAppContext } from "@/context/AppContext"
import { useAuth } from "@/context/AuthContext"
import { useSocket } from "@/context/SocketContext"
import { addRoomSessionMember, ensureRoom } from "@/services/rtdb"
import { SocketEvent } from "@/types/socket"
import { USER_STATUS } from "@/types/user"
import { ChangeEvent, FormEvent, useEffect, useRef } from "react"
import { toast } from "react-hot-toast"
import { useLocation, useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"

const FormComponent = () => {
    const location = useLocation()
    const { currentUser, setCurrentUser, status, setStatus } = useAppContext()
    const { socket } = useSocket()
    const { user } = useAuth()

    const usernameRef = useRef<HTMLInputElement | null>(null)
    const navigate = useNavigate()

    const createNewRoomId = () => {
        const roomId = uuidv4()
        setCurrentUser((prev) => ({ ...prev, roomId }))
        toast.success("Created a new room")
        return roomId
    }

    const handleInputChanges = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e.target.value
        setCurrentUser({ ...currentUser, [name]: value })
    }

    const validateDisplayName = () => {
        if (!user) {
            toast.error("Please sign in to continue")
            return false
        }
        if (currentUser.username.trim().length === 0) {
            toast.error("Enter your display name")
            return false
        } else if (currentUser.username.trim().length < 3) {
            toast.error("Username must be at least 3 characters long")
            return false
        }
        return true
    }

    const performJoin = async (roomId: string) => {
        if (status === USER_STATUS.ATTEMPTING_JOIN) return
        if (!validateDisplayName()) return
        if (roomId.trim().length === 0) {
            toast.error("Enter a room id")
            return
        }
        if (roomId.trim().length < 5) {
            toast.error("Room id must be at least 5 characters long")
            return
        }
        try {
            if (!user) {
                toast.error("Please sign in to continue")
                return
            }
            toast.loading("Joining room...")
            setStatus(USER_STATUS.ATTEMPTING_JOIN)
            const username = currentUser.username.trim()
            setCurrentUser((prev) => ({
                ...prev,
                roomId,
                username,
                uid: user.uid,
                email: user.email,
            }))
            await ensureRoom(
                roomId,
                user.uid,
                username,
            )
            await addRoomSessionMember(
                roomId,
                user.uid,
                username,
            )
            if (!socket.connected) {
                socket.connect()
            }
            socket.emit(SocketEvent.JOIN_REQUEST, {
                ...currentUser,
                roomId,
                username,
                uid: user.uid,
                email: user.email,
            })
        } catch (error) {
            console.error(error)
            toast.dismiss()
            toast.error("Failed to prepare room. Try again.")
            setStatus(USER_STATUS.INITIAL)
        }
    }

    const joinRoom = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await performJoin(currentUser.roomId)
    }

    const createRoom = async () => {
        if (!validateDisplayName()) return
        const roomId = createNewRoomId()
        await performJoin(roomId)
    }
    useEffect(() => {
        if (currentUser.roomId.length > 0) return
        if (location.state?.roomId) {
            setCurrentUser({ ...currentUser, roomId: location.state.roomId })
            if (currentUser.username.length === 0) {
                toast.success("Enter your display name")
            }
        }
    }, [currentUser, location.state?.roomId, setCurrentUser])

    useEffect(() => {
        if (!user) return
        const suggestedName =
            user.displayName || user.email?.split("@")[0] || ""
        setCurrentUser((prev) => ({
            ...prev,
            username: prev.username || suggestedName,
            uid: user.uid,
            email: user.email,
        }))
    }, [setCurrentUser, user])

    useEffect(() => {
        if (status === USER_STATUS.DISCONNECTED && !socket.connected) {
            socket.connect()
            return
        }

        const isRedirect = sessionStorage.getItem("redirect") || false

        if (status === USER_STATUS.JOINED && !isRedirect) {
            const username = currentUser.username
            sessionStorage.setItem("redirect", "true")
            navigate(`/editor/${currentUser.roomId}`, {
                state: {
                    username,
                },
            })
        } else if (status === USER_STATUS.JOINED && isRedirect) {
            sessionStorage.removeItem("redirect")
            setStatus(USER_STATUS.DISCONNECTED)
            socket.disconnect()
            socket.connect()
        }
    }, [
        currentUser,
        location.state?.redirect,
        navigate,
        setStatus,
        socket,
        status,
    ])

    return (
        <div className="flex w-full flex-col items-center justify-center gap-6">
            <div className="space-y-2 text-center">
                <h2 className="text-3xl font-bold text-white">Join a Room</h2>
                <p className="text-sm text-white/60">
                    Create or join a room to start collaborating
                </p>
            </div>
            <form onSubmit={joinRoom} className="flex w-full flex-col gap-5">
                <div className="relative">
                    <input
                        type="text"
                        name="roomId"
                        placeholder="Room ID"
                        className="w-full rounded-xl border border-white/25 bg-white/5 px-4 py-3.5 text-white backdrop-blur-sm transition-all placeholder:text-white/40 focus:border-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
                        onChange={handleInputChanges}
                        value={currentUser.roomId}
                    />
                </div>
                <div className="relative">
                    <input
                        type="text"
                        name="username"
                        placeholder="Display name"
                        className="w-full rounded-xl border border-white/25 bg-white/5 px-4 py-3.5 text-white backdrop-blur-sm transition-all placeholder:text-white/40 focus:border-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
                        onChange={handleInputChanges}
                        value={currentUser.username}
                        ref={usernameRef}
                    />
                </div>
                <div className="mt-2 grid gap-3 sm:grid-cols-2">
                    <button
                        type="submit"
                        className="w-full rounded-xl bg-white px-6 py-3 text-base font-semibold text-black shadow-lg transition-all hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/40"
                    >
                        Join Room
                    </button>
                    <button
                        type="button"
                        onClick={createRoom}
                        className="w-full rounded-xl border border-white/30 bg-white/5 px-6 py-3 text-base font-semibold text-white transition-all hover:border-white/60 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
                    >
                        Create Room
                    </button>
                </div>
            </form>
        </div>
    )
}

export default FormComponent

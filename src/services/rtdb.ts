import { database } from "@/lib/firebase"
import {
    get,
    ref,
    serverTimestamp,
    set,
    update,
} from "firebase/database"

interface UserProfileInput {
    uid: string
    displayName: string
    email: string | null
}

const upsertUserProfile = async (user: UserProfileInput) => {
    const userRef = ref(database, `users/${user.uid}`)
    await update(userRef, {
        displayName: user.displayName,
        email: user.email,
        lastLoginAt: serverTimestamp(),
    })
}

const ensureRoom = async (
    roomId: string,
    ownerUid: string,
    ownerName: string,
) => {
    const roomRef = ref(database, `rooms/${roomId}`)
    const snapshot = await get(roomRef)
    if (!snapshot.exists()) {
        await set(roomRef, {
            roomId,
            createdAt: serverTimestamp(),
            createdBy: ownerUid,
            createdByName: ownerName,
            updatedAt: serverTimestamp(),
        })
        return
    }

    await update(roomRef, {
        updatedAt: serverTimestamp(),
    })
}

const addRoomSessionMember = async (
    roomId: string,
    uid: string,
    username: string,
) => {
    const memberRef = ref(database, `sessions/${roomId}/${uid}`)
    await set(memberRef, {
        uid,
        username,
        joinedAt: serverTimestamp(),
    })
}

export { addRoomSessionMember, ensureRoom, upsertUserProfile }

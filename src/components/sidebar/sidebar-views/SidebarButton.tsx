import { useChatRoom } from "@/context/ChatContext"
import { useViews } from "@/context/ViewContext"
import { VIEWS } from "@/types/view"
import { Tooltip } from "react-tooltip"
import { tooltipStyles } from "../tooltipStyles"

interface ViewButtonProps {
    viewName: VIEWS
    icon: JSX.Element
}

const ViewButton = ({ viewName, icon }: ViewButtonProps) => {
    const { activeView, setActiveView, isSidebarOpen, setIsSidebarOpen } =
        useViews()
    const { isNewMessage } = useChatRoom()

    const handleViewClick = (viewName: VIEWS) => {
        if (viewName === activeView) {
            setIsSidebarOpen(!isSidebarOpen)
        } else {
            setIsSidebarOpen(true)
            setActiveView(viewName)
        }
    }

    const isActive = activeView === viewName && isSidebarOpen

    return (
        <div className="relative flex flex-col items-center">
            <button
                onClick={() => handleViewClick(viewName)}
                className={`group relative flex items-center justify-center overflow-hidden rounded-lg p-2 transition-all duration-200 ease-in-out hover:scale-110 ${
                    isActive
                        ? "bg-gradient-to-br from-blue-500/20 to-purple-500/20"
                        : "hover:bg-gradient-to-br hover:from-blue-500/10 hover:to-purple-500/10"
                }`}
                data-tooltip-id={`tooltip-${viewName}`}
                data-tooltip-content={viewName}
            >
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 opacity-0 blur transition-opacity group-hover:opacity-10"></div>
                <div className="relative z-10 flex items-center justify-center transition-transform group-hover:scale-110">
                    {icon}
                </div>
                {/* Show dot for new message in chat View Button */}
                {viewName === VIEWS.CHATS && isNewMessage && (
                    <div className="absolute right-0 top-0 h-3 w-3 animate-pulse rounded-full bg-gradient-to-br from-blue-400 to-purple-400 shadow-lg"></div>
                )}
            </button>
            {/* render the tooltip */}
            <Tooltip
                id={`tooltip-${viewName}`}
                place="right"
                offset={20}
                className="!z-[9999]"
                style={tooltipStyles}
                noArrow={false}
                positionStrategy="fixed"
                float={true}
                delayShow={100}
                clickable={false}
            />
        </div>
    )
}

export default ViewButton

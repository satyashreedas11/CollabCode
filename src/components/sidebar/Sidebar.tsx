import SidebarButton from "@/components/sidebar/sidebar-views/SidebarButton"
import { useAppContext } from "@/context/AppContext"
import { useSocket } from "@/context/SocketContext"
import { useViews } from "@/context/ViewContext"
import useResponsive from "@/hooks/useResponsive"
import useWindowDimensions from "@/hooks/useWindowDimensions"
import { ACTIVITY_STATE } from "@/types/app"
import { SocketEvent } from "@/types/socket"
import { VIEWS } from "@/types/view"
import { IoCodeSlash } from "react-icons/io5"
import { MdOutlineDraw } from "react-icons/md"
import cn from "classnames"
import { Tooltip } from "react-tooltip"
import { tooltipStyles } from "./tooltipStyles"

function Sidebar() {
    const {
        activeView,
        isSidebarOpen,
        viewComponents,
        viewIcons,
        setIsSidebarOpen,
    } = useViews()
    const { minHeightReached } = useResponsive()
    const { activityState, setActivityState } = useAppContext()
    const { socket } = useSocket()
    const { isMobile } = useWindowDimensions()

    const changeState = () => {
        if (activityState === ACTIVITY_STATE.CODING) {
            setActivityState(ACTIVITY_STATE.DRAWING)
            socket.emit(SocketEvent.REQUEST_DRAWING)
        } else {
            setActivityState(ACTIVITY_STATE.CODING)
        }

        if (isMobile) {
            setIsSidebarOpen(false)
        }
    }

    return (
        <aside className="flex w-full md:h-full md:max-h-full md:min-h-full md:w-auto">
            <div
                className={cn(
                    "fixed bottom-0 left-0 z-50 flex h-[50px] w-full gap-4 self-end border-t border-white/10 bg-dark/80 p-2 backdrop-blur-xl md:static md:h-full md:w-[50px] md:min-w-[50px] md:flex-col md:border-r md:border-t-0 md:p-2 md:pt-4",
                    {
                        hidden: minHeightReached,
                    },
                )}
            >
                <SidebarButton
                    viewName={VIEWS.FILES}
                    icon={viewIcons[VIEWS.FILES]}
                />
                <SidebarButton
                    viewName={VIEWS.CHATS}
                    icon={viewIcons[VIEWS.CHATS]}
                />
                <SidebarButton
                    viewName={VIEWS.COPILOT}
                    icon={viewIcons[VIEWS.COPILOT]}
                />
                <SidebarButton
                    viewName={VIEWS.RUN}
                    icon={viewIcons[VIEWS.RUN]}
                />
                <SidebarButton
                    viewName={VIEWS.CLIENTS}
                    icon={viewIcons[VIEWS.CLIENTS]}
                />
                <SidebarButton
                    viewName={VIEWS.SETTINGS}
                    icon={viewIcons[VIEWS.SETTINGS]}
                />

                {/* Button to change activity state coding or drawing */}
                <div className="flex h-fit items-center justify-center">
                    <button
                        className="group relative flex items-center justify-center overflow-hidden rounded-lg p-1.5 transition-all duration-200 ease-in-out hover:scale-110 hover:bg-gradient-to-br hover:from-blue-500/20 hover:to-purple-500/20"
                        onClick={changeState}
                        data-tooltip-id="activity-state-tooltip"
                        data-tooltip-content={
                            activityState === ACTIVITY_STATE.CODING
                                ? "Switch to Drawing Mode"
                                : "Switch to Coding Mode"
                        }
                    >
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 opacity-0 blur transition-opacity group-hover:opacity-20"></div>
                        {activityState === ACTIVITY_STATE.CODING ? (
                            <MdOutlineDraw
                                size={30}
                                className="relative z-10 transition-transform group-hover:rotate-12"
                            />
                        ) : (
                            <IoCodeSlash
                                size={30}
                                className="relative z-10 transition-transform group-hover:rotate-12"
                            />
                        )}
                    </button>
                    <Tooltip
                        id="activity-state-tooltip"
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
            </div>
            <div
                className="absolute left-0 top-0 z-20 w-full flex-col border-r border-white/10 bg-dark/90 backdrop-blur-xl md:static md:min-w-[300px]"
                style={isSidebarOpen ? {} : { display: "none" }}
            >
                {/* Render the active view component */}
                {viewComponents[activeView]}
            </div>
        </aside>
    )
}

export default Sidebar

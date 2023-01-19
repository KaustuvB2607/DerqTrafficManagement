import { useState } from "react";
import parsetoJSON from "../../shared/helpers/parsetoJSON";
import removeByAttr from "../../shared/helpers/removeByAtt";
import doPost from "../../shared/services/doPost";
import MessageBubble from "./messageBubble";

interface ChatWindowProps {
    activeId: string,
    messageArray: any[],
    activeNumber: string,
    setMessageArray: (message: any)=>any,
    setActiveTheads: (message: any)=>any,
    activeThreads: any[],
    notify: any
}

export default function ChatWindow({activeId, messageArray, activeNumber, setMessageArray, setActiveTheads, activeThreads, notify} : ChatWindowProps) {

    const [message, setMessage] = useState("");

    const sendHandler = async () => {
        console.log(message);

        let result = await doPost({url: "/chat/reply", body: {
            "targetId": activeId,
            "phoneNumber": activeNumber,
            "replyMsg": message
        }}).catch(err=>console.error(err));



        let status = parsetoJSON(result);
        if(status.type === "Success") {
            notify("success", `Message Sent to ${activeNumber}`);
        }
        console.log(status);

        setMessageArray({
            time: new Date(Date.parse(new Date().toString())).toLocaleTimeString('en-US', { hour12: true }),
            message: message
        });

        if (
            !Boolean(
              activeThreads.find(
                (activeThread: any) => activeThread.id === activeId
              )
            )
          ) {
            setActiveTheads([
                ...activeThreads,
                {
                    id: activeId,
                    number: activeNumber,
                    message: message,
                    time:  new Date(Date.parse(new Date().toString())).toLocaleTimeString('en-US', { hour12: true }),
                },
            ]);
          } else {
              let updatedThreads = removeByAttr(activeThreads, "id", activeId);
              console.log(JSON.stringify(updatedThreads));
              setActiveTheads([
                ...updatedThreads,
                {
                    id: activeId,
                    number: activeNumber,
                    message: message,
                    time:  new Date(Date.parse(new Date().toString())).toLocaleTimeString('en-US', { hour12: true }),
                },
            ]);
          }

        
        setMessage("");

    }

    return(
        <div className="w-2/3 border-l relative">
            { activeNumber ?
                <div className="msg-header absolute top-0 bg-white border-b w-full py-5 px-8 text-gray-700">
                    {activeNumber}
                </div>
                :
                <></>
            }
                <div className="bg-white w-full overflow-y-scroll h-full">
                    {activeNumber ? <div className="w-full pt-28 px-8 py-3">
                        {messageArray.map((message)=>{
                            return <MessageBubble message={message.message} time={message.time} inbound={Boolean(message.isInbox)}/>
                        })}
                    </div> : <div className="w-full h-full flex justify-center items-center text-breen-gray3">
                        Please select a message thread
                    </div>}
                    
                </div>
                {activeNumber ? <div className="px-4 py-2 w-full absolute bottom-0 bg-breen-gray">
                        <div className="w-full flex">
                            <input
                                type="text"
                                placeholder="Type your message here"
                                className="w-full focus:outline-none rounded-l-full py-3 px-5 msg-text placeholder-breen-gray4"
                                value={message}
                                onChange={(e)=>setMessage(e.target.value)}
                            />
                            <div className="bg-white rounded-r-full">
                            <button className="mr-2.5 my-1.5 py-2 px-2 bg-breen-gray9 rounded-full"
                            onClick={()=>sendHandler()}>
                                <SendIcon/>
                            </button>
                            </div>
                        </div>
                    </div> : <></>}
                
            </div>
    );
}

function SendIcon() {
    return (<svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.9627 7.15342L13.958 7.15137L1.44592 1.96172C1.34068 1.91768 1.22616 1.9004 1.11261 1.91144C0.999063 1.92249 0.89002 1.96151 0.795239 2.02501C0.695101 2.09062 0.612846 2.1801 0.555876 2.2854C0.498906 2.3907 0.469008 2.50851 0.468872 2.62823V5.94727C0.468928 6.11094 0.526077 6.26946 0.630469 6.39551C0.734862 6.52156 0.879957 6.60725 1.04075 6.6378L7.86487 7.89961C7.89168 7.9047 7.91588 7.91898 7.93329 7.94C7.9507 7.96102 7.96023 7.98746 7.96023 8.01475C7.96023 8.04204 7.9507 8.06848 7.93329 8.0895C7.91588 8.11052 7.89168 8.1248 7.86487 8.12989L1.04104 9.3917C0.880295 9.42218 0.735208 9.50775 0.630769 9.63369C0.52633 9.75962 0.469077 9.91804 0.468872 10.0816V13.4013C0.468794 13.5156 0.497101 13.6281 0.551251 13.7288C0.605402 13.8295 0.683702 13.9152 0.779126 13.9781C0.893911 14.0544 1.02862 14.0952 1.16643 14.0953C1.26224 14.0952 1.35706 14.076 1.44534 14.0388L13.9571 8.87872L13.9627 8.87608C14.1311 8.8037 14.2746 8.68353 14.3755 8.53044C14.4763 8.37736 14.5301 8.19806 14.5301 8.01475C14.5301 7.83144 14.4763 7.65215 14.3755 7.49906C14.2746 7.34597 14.1311 7.2258 13.9627 7.15342Z" fill="#4F73D1" />
    </svg>
    );
}
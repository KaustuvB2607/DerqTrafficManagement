import { useState } from "react";
import Modal from "react-modal";
import parsetoJSON from "../../shared/helpers/parsetoJSON";
import doPost from "../../shared/services/doPost";
import Map from "../map";

interface AddEditEventModalProps {
    closeModal: () => void;
    modalIsOpen: boolean;
    editForm?: boolean;
    setTableData?: (obj: Object) => void,
    notify: any
}

export default function AddEditEventModal({
    modalIsOpen,
    closeModal,
    editForm = false,
    setTableData,
    notify
}: AddEditEventModalProps) {
    const customStyles = {
        content: {
            top: "70%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            padding: 0,
            width: "50%",
            zIndex: 9999
        },
    };

    const [siteID, setSiteID] = useState("");
    const [siteName, setSiteName] = useState("");
    const [timezone, setTimezone] = useState("");
    const [totalDetection, setTotalDetection] = useState("300");

    const cancelHandler = () => {
        setSiteID("");
        setSiteName("");
        setTimezone("");
        setTotalDetection("");
        closeModal();
    }

    const saveHandler = async () => {
        console.log(siteID);
        console.log(siteName);
        console.log(timezone);
        console.log(totalDetection);
        if (siteID.length > 0 && siteName.length > 0 && timezone.length > 0 && totalDetection.length > 0) {
            let result = await doPost({
                url: `/site/create`, body: {
                    "siteID": siteID,
                    "siteName": siteName,
                    "timezone": timezone,
                    "totalDetection": 300
                }
            }).catch(err => console.error(err));

            console.log(result);

            let response = parsetoJSON(result);

            console.log(response);

            if (response.type === "Success") {
                notify("success", `Site ${siteID} successfully created`);
            }
            else {
                notify("error", `Site ${siteID} couldnot be created`);
            }

            if (setTableData) {
                setTableData({
                    "siteID": siteID,
                    "siteName": siteName,
                    "timezone": timezone,
                    "totalDetection": totalDetection
                });
                closeModal();
            }
        }
    }

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <div className="flex w-full justify-between py-5 px-6 border-b">
                <div className="modal-title">Add Site</div>
                <div onClick={() => closeModal()} className="cursor-pointer">x</div>
            </div>
            <div>
                <div className="flex py-2 px-6">
                    <div className="w-full">
                        <label className="form-labelb text-gray-700 text-b1">
                            Site ID <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1">
                            <input
                                type="number"
                                placeholder="Site ID"
                                className="border border-1 rounded-lg w-full px-4 py-2.5 text-b2 focus:outline-none text-breen-lightGray"
                                onChange={(e) => setSiteID(e.target.value)}
                                
                            />
                        </div>
                    </div>
                </div>
                <div className="flex pb-2 px-6">
                    <div className="w-full">
                        <label className="form-labelb text-gray-700 text-b1">
                            Site Name <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1.5">
                            <input
                                type="text"
                                placeholder="Enter Site Name"
                                className="border border-1 rounded-lg w-full px-4 py-2.5 text-b2 focus:outline-none text-breen-lightGray"
                                onChange={(e) => setSiteName(e.target.value)}
                                value={siteName}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex px-6">
                    <div className="w-full">
                        <Map
                            center={{ lat: 19.075975, lng: 72.877377 }}
                            height='300px'
                            zoom={15}
                            setSiteName={(addr: string) => setSiteName(addr)}
                            setTimezone={(timezone: string) => setTimezone(timezone)}
                        />
                    </div>
                </div>
            </div>
            <div className={`flex w-full ${editForm ? "justify-between" : "justify-end"} py-3 px-6 border-t mt-10`}>
                {editForm ? <div>
                    <button className="text-breen-red bg-breen-lightRed py-2 px-4 rounded-lg btn-text2 w-20">
                        Delete
                    </button>
                </div> : <></>}
                <div>
                    <button className="text-blue-500  border bottom-1 py-2 px-4 rounded-lg btn-text2 w-20"
                        onClick={() => cancelHandler()}>
                        Cancel
                    </button>
                    <button className="bg-breen-green text-white py-2 px-4 rounded-lg btn-text2 ml-4 w-20"
                        onClick={() => saveHandler()}>
                        {editForm ? "Update" : "Add"}
                    </button>
                </div>
            </div>
        </Modal>
    );
}

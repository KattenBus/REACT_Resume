import Desktop_Icon from "./Desktop_Icon";
import {iconInformation, pictures} from "./Data";
import Window from "./Window";
import Jobs_Text_File from "./Jobs_Text_File";
import VideoPlayer from "./VideoPlayer";
import DropDown_Menu from "./DropDown_Menu";
import Folder_Icon_Structure from "./Folder_Icon_Structure";
import Folder_Icon from "./Folder_Icons";
import Empty_Folder from "./Empty_Folder";
import Image_Viewer from "./Image_Viewer";

import { useContext } from "react";
import { FolderContext } from "../Context/Folder-Context";
import { WindowContext } from "../Context/Window-Context";
import { MenuContext } from "../Context/Menu-Context";



export default function Desktop_StartScreen() {


    const folderContext = useContext(FolderContext);
    const windowContext = useContext(WindowContext);
    const menuContext = useContext(MenuContext);

    return(
        <ol className="Desktop-StartScreen">

            {menuContext.showMenu && 
                <DropDown_Menu 
                    onItemClick={windowContext.handleShowWindow}
                />
            }

            {iconInformation.map((icon, index) => (
                <Desktop_Icon 
                    key = {index}
                    iconText= {icon.name}
                    imageIcon = {icon.image}
                    start_x = {icon.x}
                    start_y = {icon.y}
                    doubleClick={() => {
                    if (icon.Id === 4) {
                        folderContext.setCurrentFolderPath(['My Computer'])
                        windowContext.handleShowWindow(icon.Id)
                    } else {
                        windowContext.handleShowWindow(icon.Id)
                    }
                    }}
                />
            ))}

            {windowContext.openWindows.map((windowId) => {
                const windowData = iconInformation.find((icon) => icon.Id === windowId);
                const pictureData = pictures.find((picture) => picture.Id === windowId);
                return (
                    <Window
                        key={windowId}
                        contentIcon={windowId >= 5 && windowId <= 9 ? pictureData.image : windowData.image}
                        contentText={windowId >= 5 && windowId <= 9 ? pictureData.name : windowData.name}
                        closeWindow={() => windowContext.handleCloseWindow(windowId)}
                    >
                        {windowId === 1 && <Jobs_Text_File/>}
                        {windowId === 2 && <Folder_Icon_Structure>
                            {pictures.map((picture, index) => (
                                <Folder_Icon 
                                key={index}
                                imageIcon={picture.image}
                                iconText={picture.name}
                                doubleClick={() => windowContext.handleShowWindow(picture.Id)}
                                />
                            ))}
                        </Folder_Icon_Structure>}
                        {windowId === 3 && <VideoPlayer/>}
                        {windowId === 4 && (
                            <>
                                {folderContext.getCurrentFolderContent(folderContext.currentFolderPath).length > 0 ? (
                                    <Folder_Icon_Structure>
                                        {folderContext.getCurrentFolderContent(folderContext.currentFolderPath).map((item, index) => (
                                        <Folder_Icon
                                            key={index}
                                            imageIcon={item.image || item.imagePath}
                                            iconText={item.name}
                                            doubleClick={() => item.onOpen(folderContext.currentFolderPath)}
                                        />
                                        ))}
                                    </Folder_Icon_Structure>
                                    ) : (
                                    <Empty_Folder />
                                )}
                            </>
                        )}
                        {windowId >= 5 && windowId <= 9 && pictureData && (
                            <Image_Viewer
                                imageText={pictureData.name}
                                imagePath={pictureData.image}
                            />
                        )}
                    </Window>
                );
            })}

            {menuContext.showMenu && 
                <div onClick = {menuContext.toogleMenu} id = "overlay"></div>
            }

        </ol>
    );
}
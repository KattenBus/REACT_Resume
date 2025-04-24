import React, { useContext } from 'react';
import Folder_Icon_Structure from "./Folder_Icon_Structure";
import Folder_Icon from "./Folder_Icons";
import Empty_Folder from "./Empty_Folder";
import { FolderContext } from "../Context/Folder-Context";

function MyPCContent() {
  const { currentFolderPath, handleGoBackFolder, getCurrentFolderContent, handleOpenFolder } = useContext(FolderContext);

  return (
    <>
      {currentFolderPath.length > 1 && (
        <button onClick={handleGoBackFolder}>BACK</button>
      )}
      {getCurrentFolderContent(currentFolderPath).length > 0 ? (
        <Folder_Icon_Structure>
          {getCurrentFolderContent(currentFolderPath).map((item, index) => (
            <Folder_Icon
              key={index}
              imageIcon={item.image || item.imagePath}
              iconText={item.name}
              doubleClick={() => item.onOpen(currentFolderPath)}
            />
          ))}
        </Folder_Icon_Structure>
      ) : (
        <Empty_Folder />
      )}
    </>
  );
}

export default MyPCContent;
import { Dropzone, FileItem, FullScreenPreview } from "dropzone-ui";
import { useState } from "react";
import {IoCloseCircleSharp} from 'react-icons/io5'

export default function DragDrop({files, setFiles, closeDrag}) {
  
  const [imageSrc, setImageSrc] = useState(undefined);
  const updateFiles = (incommingFiles) => {
    console.log("incomming files", incommingFiles);
    setFiles(incommingFiles);
  };
  const onDelete = (id) => {
    setFiles(files.filter((x) => x.id !== id));
  };
  const handleSee = (imageSource) => {
    setImageSrc(imageSource);
  };
  return (
      <div className="dropzone-wrapper">
          <div className="dropzone-icon" onClick={() => closeDrag(false)} ><IoCloseCircleSharp /></div>
          {/* <div className="dropzone-content">Add photos / videos</div> */}
        <Dropzone
        onChange={updateFiles}
        value={files}
        maxFiles={1}
        maxFileSize={299800000}
        accept="image/*, video/*"
        header={false}
        footer={false}
        minHeight="12rem"
        >
        {files.map((file) => (
            <FileItem
            {...file}
            onDelete={onDelete}
            onSee={handleSee}
            preview
            info
            hd
            />
        ))}
        <FullScreenPreview
            imgSource={imageSrc}
            openImage={imageSrc}
            onClose={(e) => handleSee(undefined)}
        />
        </Dropzone>
    </div>
  );
}
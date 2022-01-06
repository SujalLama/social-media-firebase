import React from 'react'
import Dropzone from "react-dropzone";
import {AiFillCloseCircle} from 'react-icons/ai';

function DropzoneComponent({files, setFiles, accept}) {
    function onDrop(files) {
        if (files.length > 0) {
            setFiles(files);
        }
    }
    console.log(files);
    return (
        <div className="dropzone-wrapper width-100">
                <Dropzone onDrop={onDrop} maxFiles={1} accept={accept}>
                            {({ getRootProps, getInputProps }) => (
                            <section>
                                <div {...getRootProps({ className: "dropzone" })}>
                                <input {...getInputProps()} />
                                {files &&
                                Array.isArray(files) &&
                                files.length ? (
                                    <div className="selected-file">
                                    {files.length && <img src={files[0].preview} alt="image downloaded"/>}
                                    </div>
                                ) : (
                                    `Add photos/videos`
                                )}
                                </div>
                            </section>
                            )}
                </Dropzone>
                {files.length > 0 && <button className='btn' onClick={() => setFiles([])}><AiFillCloseCircle/></button>}
            </div>
    )
}

export default DropzoneComponent

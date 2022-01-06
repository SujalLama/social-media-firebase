import React from 'react'
import Dropzone from "react-dropzone";
import {AiFillCloseCircle} from 'react-icons/ai';

function DropzoneComponent({files, setFiles, accept}) {
    function onDrop(files) {
        if (files.length > 0) {
            setFiles(files);
        }
    }
    return (
        <div className="dropzone-wrapper">
                <Dropzone onDrop={onDrop} maxFiles={1} accept={accept}>
                            {({ getRootProps, getInputProps }) => (
                            <section>
                                <div {...getRootProps({ className: "dropzone" })}>
                                <input {...getInputProps()} />
                                {files &&
                                Array.isArray(files) &&
                                files.length ? (
                                    <div className="selected-file">
                                    {files.length && files.map((file, i) => `${file.name}`)}
                                    
                                    </div>
                                ) : (
                                    `Drop files, or click here`
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

import React from 'react';

interface FileUploaderProps {
    handleFile: any
}

const FileUploader = ({ handleFile }: FileUploaderProps) => {
    const hiddenFileInput = React.useRef<HTMLInputElement>(null);

    const handleChange = (event: any) => {
        const fileUploaded = event.target.files[0];
        handleFile(fileUploaded);
    };
    return (
        <div className="uploadButton">
            <input type="file"
                   ref={hiddenFileInput}
                   onChange={handleChange}
                   style={{display:'inline'}}
            />
        </div>
    );
};
export default FileUploader;

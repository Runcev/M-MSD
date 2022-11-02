import {UploadOutlined} from '@ant-design/icons';
import type {UploadFile, UploadProps} from 'antd';
import {Button, message, Upload} from 'antd';
import React from 'react';

interface FileUploaderProps {
    handleFile: any
}

message.config({
    top: 50,
    duration: 1,
    maxCount: 1,
});

const AntButton = ({handleFile}: FileUploaderProps) => {

    const props: UploadProps = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange: ({ file }) => handleChange(file),
				showUploadList: false
    }

    const handleChange = async (file: UploadFile) => {
        if (file.status === 'done') {
            handleFile(file.originFileObj);
            // message.success({ content: 'FileUploaded' });
        } else if (file.status === 'error') {
            // message.error("Error occurred", 1);
        }
    }

    return (
        <Upload {...props}>
            <Button icon={<UploadOutlined/>}>Click to Upload</Button>
        </Upload>
    );
}

export default AntButton;
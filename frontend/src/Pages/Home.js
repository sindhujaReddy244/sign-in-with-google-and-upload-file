import React, { useEffect, useState } from 'react'
import axios from 'axios'
import fileDownload from 'js-file-download'
import './style.css'
import { ListGroup } from 'react-bootstrap';

const Home = ({ user }) => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [fileList, setFileList] = useState([]);


    // Function to handle file selection
    const handleFileSelect = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    // Function to handle file upload
    const handleFileUpload = async (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append('file', selectedFile);
        await axios.post('http://localhost:8080/api/upload', formData, { withCredentials: true })
        setSelectedFile(null);
        getFileList();
    };

    // Function to get all uploaded files
    const getFileList = async () => {
        const response = await axios.get('http://localhost:8080/api/files', { withCredentials: true })
        setFileList(response.data);
    };

    // Function to handle file download
    const handleFileDownload = async (filename) => {
        const response = await axios.get(`http://localhost:8080/api/download/${filename}`, { responseType: 'blob' })
        fileDownload(response.data, filename.replace(/^\w+\s/, ''))

    };

    // Call getFileList on initial render
    useEffect(() => {
        getFileList();
    }, []);

    console.log(fileList);

    const handleLogout = () => {
        window.open('http://localhost:8080/auth/logout', "_self");
    }


    return (
        <>
            <button onClick={handleLogout} >
                Logout
            </button>
            <div className='uploadSection'>
                <input className='InputUpload' type="file" onChange={handleFileSelect} />
                <button onClick={handleFileUpload} disabled={!selectedFile}>
                    Upload
                </button>
            </div>
            {fileList.map((filename, i) => (
                <div key={i} >
                    {filename.startsWith(user.sub) &&
                        <ListGroup className='list' role='button' onClick={() => handleFileDownload(filename)}>
                            <ListGroup.Item className='listItem'>{filename.replace(/^\w+\s/, '')} </ListGroup.Item>
                        </ListGroup>
                    }
                </div>
            ))}
        </>
    );
}




export default Home
import React, { useState , useEffect} from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

const App = () => {
    const [file, setFile] = useState("");
    const [files, setFiles] = useState([]);
    const navigate = useNavigate();

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const url = process.env.BASEURL || "http://localhost:5000";
        await axios
            .post(url + "/upload", { file: file })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };

    const handleImages =async()=>{
        await axios.get("http://localhost:5000/files")
            .then((res)=>{setFiles(res.data); console.log(res)})
            .catch((err)=>console.log(err))
    }

    console.log(files);

    useEffect(()=>{
        handleImages();
    }, [])

    return (
        <div className="container-fluid p-5 d-flex flex-column justify-content-around">
            <h1 className="text-center mb-4">MERN File Upload</h1>
            <form
                action={"http://localhost:5000/upload"}
                method="POST"
                encType="multipart/form-data"
                className="d-flex flex-row align-items-center justify-content-center mt-5 mb-5"
            >
                <div className="">
                    <input
                        className="form-control form-control"
                        id="file"
                        type="file"
                        name="file"
                        value={file}
                        onChange={(e) => setFile(e.target.value)}
                        required
                    />
                </div>
                <button role="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
            {files.length <= 0 ? (
                <p className="text-center text-danger">No files to show</p>
            ) : (
                <div className="d-flex row g-3 align-items-center">
                    {files?.map((file) => (
                        <div className="card col-lg-3 col-sm-5 card-body mb-3" style={{maxWidth: "360px"}}>
                            {(file?.contentType === "image/jpeg" ||
                                file?.contentType === "image/png")?(
                                    <div>
                                        <img src={"http://localhost:5000/image/"+file?.filename} className="img-fluid"alt=""/>
                                        <form method="POST" action={`http://localhost:5000/files/${file._id}?_method=DELETE`}>
                                            <button className="btn btn-danger">Delete</button>
                                        </form>
                                    </div>
                                ):(
                                    <p>{file?.filename}</p>
                                )}
                            
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default App;
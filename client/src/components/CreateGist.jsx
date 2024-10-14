import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { Button } from "./ui/button";
import { Form } from "./ui/form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select } from "./ui/select";


const CreateGist = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate()


    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const body = { title, description, code, language };
            const response = await fetch('http://localhost:3000/gists', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            if (!response.ok) {
                throw new Error('Failed to create gist');
            } 
            const data = await response.json();
            console.log(data);
            navigate(`/${data._id}`)
            setSuccessMessage('Gist created successfully!');
            setTitle('');
            setDescription('');
            setCode('');
            setLanguage('');
        } catch (err) {
            console.error(err.message);
            setErrorMessage(err.message);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-4 border border-gray-300 rounded-md shadow-md">
            <form onSubmit={onSubmit} className="w-50">
                <div className="mb-4">
                    <Label htmlFor='title'>Name</Label>
                    <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Enter title'
                        required
                    />
                </div>
                <div className="mb-4"> 
                    <Label htmlFor='description'>Description</Label>
                    <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='Enter description'
                        required
                    />
                </div>
                <div className="mb-4">
                    <Label htmlFor='code'>Code</Label>
                    <Textarea
                        id="code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder='Enter code'
                        rows={10}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor='language'>Language</Label>
                    <Input
                        id="language" 
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        placeholder='Enter language'
                        required
                    />
                </div>
                <Button type="submit">Submit</Button>
            </form>
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
}

export default CreateGist;

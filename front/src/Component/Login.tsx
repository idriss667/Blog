import {ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useRef, useState} from "react";
import {btoa} from "buffer";
import {setJwt, getJwt, deleteJwt} from "../variables/JWT"
export interface formDataInterface {
    username: string,
    password: string
}

export default function Form() {

    const mounted = useRef<boolean>(false)

    const [formData, setFormData] = useState<formDataInterface>({password: "", username: ""})

    useEffect(() => {
        if (!mounted.current) {
            if (getJwt()) {
                console.log('your logged');
            }
            // fetch("http://localhost:5656")
            //     .then(data => data.json())
            //     .then(json => console.log(json))
        }

        mounted.current = true
    }, [])


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        fetch('http://localhost:5656/login', {
            method: "POST",
            mode: "cors",
            body: new URLSearchParams({
                ...formData
            }),
            credentials: "include",
            headers: new Headers({
                "Content-type":  "application/x-www-form-urlencoded"
            })
        })
            .then(data => data.text())
            .then(json => {
                console.log(json);
                setJwt(json);
            })
    }

    const handleChange = (e: ChangeEvent) => {
        setFormData(prevState => {
            return {
                ...prevState,
                // @ts-ignore
                [e.target.name]: e.target.value
            }
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" onChange={handleChange}/>
                <br/>
                <input type="password" name="password" onChange={handleChange}/>
                <br/>
                <button type="submit">login</button>
            </form>
            <button onClick={deleteJwt}>disconnect</button>
        </>
    )
}
'use client'

import { useRef, useState } from 'react'
import classes from './image-picker.module.css'
import Image from 'next/image'

export default function ImagePicker({ label, name }) {

    const [pickedImage, setPickedImagd] = useState(null)
    const imageInut = useRef()

    function handlePickClick() {
        imageInut.current.click()
    }

    function handleImageChanged(e) {
        const file = e.target.files[0]
        
        if (!file) {
            setPickedImagd(null)
            return
        }

        const fileReader = new FileReader()

        fileReader.onload = () => {
            setPickedImagd(fileReader.result)
        }

        fileReader.readAsDataURL(file)
    }

    function handleImageClear(e) {
        setPickedImagd(null)
    }

    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!pickedImage && <p>No image picked yet</p>}
                    {pickedImage && (<Image src={pickedImage} alt='The image selected by the user.' fill />)}
                </div>
                <input 
                    className={classes.input} 
                    type="file" 
                    id={name} 
                    accept='image/png, image/jpeg' 
                    name={name} 
                    ref={imageInut}
                    onChange={handleImageChanged}
                    required 
                />
                <button 
                    className={classes.button} 
                    type="button" 
                    onClick={handlePickClick}>
                        Pick an Image
                </button>
                <button 
                    className={classes.button} 
                    type="button" 
                    onClick={handleImageClear}>
                        Clear Image
                </button>
            </div>
        </div>
    )
}
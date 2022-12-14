import { FunctionComponent, useContext, useState } from "react";

import Image from 'next/image';

import styles from './AddComment.module.scss';
import { DataContext } from "../../useDataContext";
import { DataContextType } from "../../TypesAndInterfaces";

const AddComment:FunctionComponent = () => {

    
    const [comment, setComment] = useState("");
    
    const {addThread, data} = useContext(DataContext) as DataContextType;
    
    
    
    
    const sendHandle = () => {
        if(comment === '') return;
        
        addThread(comment);
        setComment("");
    }

    return (
        <div className={styles.AddComment}>
            <textarea 
                className={styles.textArea}
                placeholder="Add a comment ..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <div className={styles.footer}>
                <Image 
                    src={data? data.currentUser.image.png.slice(1): ''}
                    alt="avatar"
                    width="32"
                    height="32"
                />
                <button onClick={sendHandle}>           
                    SEND
                </button>
            </div>
        </div>
    )
}

export default AddComment;
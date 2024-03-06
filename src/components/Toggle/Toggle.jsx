import React, { useState } from 'react';
import images from 'assets/images';
import clsx from 'clsx';
import './Toggle.scss'

export const Toggle = ({
    className
}) => {
    const [isEnglish, setIsEnglish] = useState(false);

    const handleToggle = () => {
        setIsEnglish(!isEnglish);
    };

    return (

        // <div className="my-4 flex justify-end align-center"
        <div className={clsx(
            ' my-4 flex justify-end align-center',
            className
        )}
        >

            <p className='text-white font-light me-2'>{isEnglish ? 'English (EN)' : 'Indonesia (ID)'}</p>
            <div className="toggle">
                <input id="check1" className="toggle-checkbox hidden" type="checkbox" onChange={handleToggle} checked={isEnglish} />
                <label htmlFor="check1" className="toggle-label block w-14 h-6 rounded-full transition-color duration-150 ease-out" />
            </div>
        </div>
    );
};
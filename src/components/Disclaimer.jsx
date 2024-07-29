import { Modal, Button, InputCheckbox } from 'components';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { API } from 'config/api';
import { getData, putData } from 'hooks/useRequest';
import { useQuery } from 'react-query';
import { useGlobalContext } from 'hooks/context';
import { useMutation } from "react-query";


export const Disclaimer = ({ disclaimerAgree }) => {
    const [showModal, setShowModal] = useState(false);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false); 

    const { t } = useTranslation();

    const [disclaimerContent, setDisclaimerContent] = useState('');
    const getDisclaimerDetail = useQuery(['disclaimer'], () => getData(API.DISCLAIMER));

    const { currentLanguage } = useGlobalContext();
    const isEnglish = currentLanguage === 'en';

    useEffect(() => {
        if (disclaimerAgree === false && getDisclaimerDetail.data?.status === 'Success') {
            const content = isEnglish
                ? getDisclaimerDetail.data.data.disclaimer_english
                : getDisclaimerDetail.data.data.disclaimer_indonesia;
            setDisclaimerContent(content);
            setShowModal(true);
        }
    }, [disclaimerAgree, getDisclaimerDetail.data, isEnglish]);


    const { mutate: updateDisclaimer } = useMutation(
        (form) =>
            putData(API.UPDATE_DISCLAIMER, {
                is_agree: form.is_agree
            }),
        {
            onSettled: (data) => {
                if (data.status === "Success") { 
                    setShowModal(false);
                }
            },
        }
    );


    const handleUpdateDisclaimer = () => {
        if (isCheckboxChecked === true) {
            const form = { is_agree: isCheckboxChecked };
            updateDisclaimer(form);
        }
    };

    const handleCheckboxChange = (e) => {
        setIsCheckboxChecked(e.value);
    };


    return (
        <>
            <Modal show={showModal} className="!bg-[#000] opacity-60" contentClassName="px-4 md:px-8  md:!w-[720px]">
                <div className="py-4 sm:py-8 px-4 sm:px-8 md:px-12 bg-[#F6F6F6] border border-[#F3E8D0] drop-shadow-lg rounded-xl">
                    <p className='mb-3 md:mb-8 text-center text-dark-50 text-2xl font-futura-bold'>Disclaimer</p>
                    <div className="h-[300px] md:h-[480px] lg:h-[320px] overflow-y-auto text-base text-gray-200 font-medium relative">
                        <div
                            className="px-2 md:px-3"
                            dangerouslySetInnerHTML={{ __html: disclaimerContent }}
                        />
                        <div className="w-full h-12 bg-gradient sticky bottom-0"></div>
                    </div>

                    <InputCheckbox
                        name='checkbox'
                        className='w-full !justify-center mt-3'
                        labeblClassName="w-auto ms-3 text-md !text-[#2E2C2B] font-medium"
                        value={isCheckboxChecked}
                        label={t('agree', { keyPrefix: 'disclaimer' })}
                        onChange={handleCheckboxChange} 
                    />

                    <Button
                        label={'OK'}
                        onClick={handleUpdateDisclaimer}
                        iconClassName={'absolute right-4'}
                        disabled={!isCheckboxChecked}
                        className={
                            'btn-secondary-hover !border-none  !w-44 mx-auto mt-6 rounded-full !font-regular relative'
                        }
                    />
                </div>
            </Modal>
        </>
    );
};

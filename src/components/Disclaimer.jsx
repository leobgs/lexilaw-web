import { Modal, Button, InputCheckbox } from 'components';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { API } from 'config/api';
import { getData } from 'hooks/useRequest';
import { useQuery } from 'react-query';
import { useGlobalContext } from 'hooks/context'

export const Disclaimer = () => {
    const [showModal, setShowModal] = useState(false);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const { t } = useTranslation()

    const [disclaimerContent, setDisclaimerContent] = useState('');
    const getDisclaimerDetail = useQuery(['disclaimer'], () => getData(API.DISCLAIMER))

    const { currentLanguage, setLanguage } = useGlobalContext()
    const isEnglish = currentLanguage === 'en'

    useEffect(() => {
        if (getDisclaimerDetail.data?.status === 'Success') {
            if (isEnglish) {
                setDisclaimerContent(getDisclaimerDetail.data.data.disclaimer_english);
            } else {
                setDisclaimerContent(getDisclaimerDetail.data.data.disclaimer_indonesia);
            }
        }
    }, [getDisclaimerDetail]);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('is_login');
        const showPopupDisclaimer = localStorage.getItem('disclaimer_popup');

        if (isLoggedIn && showPopupDisclaimer) {
            setShowModal(true);
        }
    }, []);

    const handleCloseModal = () => {
        setShowModal(false);
        localStorage.removeItem('disclaimer_popup');
    };

    const handleCheckboxChange = (e) => {
        if (e.value == 'false') {
            setIsCheckboxChecked(true)
        } else {
            setIsCheckboxChecked(false)
        }
    };

    return (
        <>
            <Modal show={showModal} className="!bg-[#000] opacity-60" contentClassName="px-4 md:px-8  md:!w-[720px]">
                <div className="py-4 sm:py-8 px-4 sm:px-8 md:px-12 bg-[#F6F6F6] border border-[#F3E8D0] drop-shadow-lg rounded-xl">
                    <p className='mb-3 md:mb-8 text-center text-dark-50 text-2xl font-futura-bold'>Disclaimer</p>
                    <div className="h-[300px] md:h-[480px] lg:h-[320px] overflow-y-auto text-base text-gray-200 font-medium relative">
                        {disclaimerContent}
                        <div className="w-full h-12 bg-gradient absolute bottom-0"></div>
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
                        onClick={handleCloseModal}
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

import { Modal, Button, InputCheckbox } from 'components';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next'

export const Disclaimer = () => {
    const [showModal, setShowModal] = useState(false);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const { t } = useTranslation()

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
                        <p className='mb-3'><strong>Syarat Layanan dan Kebijakan</strong></p>
                        <p className='mb-3'>Selamat datang di Lexilaw. Dengan mengakses atau menggunakan platform kami, Anda setuju untuk mematuhi dan terikat oleh syarat layanan dan kebijakan berikut. Harap baca dengan cermat.</p>
                        <ol>
                            <li>Tanggung Jawab Pengguna: Pengguna bertanggung jawab untuk memberikan informasi yang akurat dan lengkap kepada pengacara. Lexilaw tidak bertanggung jawab atas kesalahan, kelalaian, atau hasil yang timbul dari penggunaan informasi yang diberikan oleh pengguna atau pengacara.</li>
                            <li>Kerahasiaan: Meskipun kami berusaha melindungi privasi Anda, komunikasi melalui platform kami mungkin tidak sepenuhnya aman. Lexilaw tidak bertanggung jawab atas akses atau pengungkapan informasi yang tidak sah.</li>
                            <li>Pembayaran dan Biaya: Biaya untuk layanan hukum ditentukan oleh pengacara masing-masing dan tidak dikendalikan oleh Lexilaw. Pengguna bertanggung jawab untuk melakukan pembayaran langsung kepada pengacara sesuai dengan syarat yang disepakati.</li>
                            <li>Tautan Pihak Ketiga: Platform kami mungkin berisi tautan ke situs web atau layanan pihak ketiga. Lexilaw tidak bertanggung jawab atas konten, akurasi, atau opini yang diungkapkan di situs web atau layanan tersebut.</li>
                            <li>Batasan Tanggung Jawab: Lexilaw tidak bertanggung jawab atas kerugian langsung, tidak langsung, insidental, atau konsekuensial yang timbul dari atau sehubungan dengan penggunaan platform kami atau layanan yang disediakan oleh pengacara.</li>
                            <li>Perubahan Syarat: Lexilaw berhak untuk mengubah syarat layanan dan kebijakan ini kapan saja. Penggunaan platform yang berkelanjutan merupakan penerimaan syarat yang telah direvisi.</li>
                            <li>Hukum yang Mengatur: Syarat dan ketentuan ini diatur dan ditafsirkan sesuai dengan hukum di yurisdiksi tempat Lexilaw beroperasi.</li>
                            <li>Dengan menggunakan platform kami, Anda mengakui bahwa Anda telah membaca, memahami, dan setuju dengan syarat layanan dan kebijakan ini.</li>
                        </ol>
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

import images from "assets/images";
import { Button, Header, Modal, PriceItem } from "components";
import { PaymentMethodModal } from "components/PaymentMethodModal";
import { PaymentSuccessModal } from "components/PaymentSuccessModal";
import { API } from "config/api";
import { getData } from "hooks/useRequest";
import { notifyError } from "hooks/useToas";
import { useWidthSize } from "hooks/useWidthSize";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { renderLabel } from "utils";
import { numberSeparator } from "utils/numberSeparator";

export const BookLawyer = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [dataLawyer, setDataLawyer] = useState({});
  const [summaryPrices, setSummaryPrices] = useState({
    transaction_price: [
      {
        id: 1,
        name: "Biaya Platform",
        price: 5000,
      },
    ],
  });
  const [isEdit, setEdit] = useState(false);
  const [isShowPaymentMethodModal, setPaymentMethodModal] = useState(false);
  const [isShowPaymentSuccessModal, setIsShowPaymentSuccessModal] =
    useState(false);

  useEffect(() => {
    setDataLawyer(state);
  }, [state]);

  useEffect(() => {
    if (dataLawyer.service_price) {
      const servicePricesFiltered = (summaryPrices.jasa_pajak || []).filter(
        (service) => service.id !== 0
      );
      servicePricesFiltered.push({
        id: 0,
        name: "Rate Jasa",
        price: dataLawyer?.service_price?.reduce(
          (sum, service) => sum + service.price,
          0
        ),
      });

      servicePricesFiltered.push({
        id: 1,
        name: "Biaya PPN (11%)",
        price:
          dataLawyer?.service_price?.reduce(
            (sum, service) => sum + service.price,
            0
          ) * 0.11,
      });

      setSummaryPrices({ ...summaryPrices, jasa_pajak: servicePricesFiltered });
    }
  }, [dataLawyer?.service_price]);

  const { refetch } = useQuery(
    ["lawyer_services"],
    () => getData(API.BOOK_LAWYER_SERVICES + state.uuid),
    {
      onSettled: (data) => {
        if (data.status === "Success") {
          setEdit(false);
          setDataLawyer({ ...dataLawyer, service_price: data.data });
        } else {
          notifyError(data?.message);
        }
      },
    }
  );

  const handleEditList = () => {
    dataLawyer?.service_price?.map((item) => {
      return (item.isEdit = !item.isEdit);
    });
    setDataLawyer({ ...dataLawyer, service_price: dataLawyer?.service_price });
    setEdit(!isEdit);
  };

  const handleDelete = (id) => {
    setDataLawyer({
      ...dataLawyer,
      service_price: dataLawyer?.service_price?.filter(
        (item) => item.id !== id
      ),
    });
  };

  const handleRefetchServices = () => {
    refetch();
  };

  const firstServicesRate = summaryPrices?.jasa_pajak?.find(
    (service) => service.id === 0
  );
  const totalServicePrice = (firstServicesRate?.price || 0)

  const totalServicePriceAndTax =
    (summaryPrices?.jasa_pajak || []).reduce(
      (total, service) => total + service.price,
      0
    );

  const totalTransactionPrice = (summaryPrices?.transaction_price || []).reduce(
    (total, transaction) => total + transaction.price,
    0
  );

  // Hitung total harga transaksi keseluruhan
  const totalTransactionAmount = (totalServicePriceAndTax || 0) + (totalTransactionPrice || 0);

  return (
    <div className="">
      <PaymentMethodModal
        dataLawyer={dataLawyer}
        isShow={isShowPaymentMethodModal}
        onHide={() => {
          setPaymentMethodModal(!isShowPaymentMethodModal);
          setIsShowPaymentSuccessModal(!isShowPaymentSuccessModal);
        }}
      />
      <PaymentSuccessModal
        isActive={isShowPaymentSuccessModal}
        lawyerName={`${dataLawyer?.first_name} ${dataLawyer?.last_name}`}
        onNavigate={() => {
          setIsShowPaymentSuccessModal(false);
          navigate("/", { replace: true });
        }}
      />
      <Header label="Pesan Pengacara" onBackClick={() => navigate(-1)} />
      <div className="m-4 md:flex md:gap-4 md:justify-end">
        <div className="md:w-3/5">
          <HeaderLawyerCard data={dataLawyer} />
          <div className="bg-white rounded-2xl p-4 mt-4">
            <div className="justify-between flex items-center text-[#ABABAA] font-semi-bold pb-2 border-b-2 border-b-neutral-60 w-full">
              <div className="line-clamp-1">Hasil yang Didapatkan</div>

              {isEdit ? (
                <div className="flex items-center justify-between gap-2">
                  <div
                    className="w-full text-[#00153F] text-xs"
                    onClick={handleRefetchServices}
                  >
                    Kembali ke awal
                  </div>
                  <div
                    className="bg-blue-sky px-4 text-black-dark rounded-2xl md:inline hidden"
                    onClick={handleEditList}
                  >
                    Selesai
                  </div>
                  <img
                    src={images.ic_check}
                    alt="done edit"
                    onClick={handleEditList}
                    className="md:hidden"
                  />
                </div>
              ) : (
                <div
                  onClick={handleEditList}
                  className="bg-blue-sky rounded-full flex items-center"
                >
                  <div className="text-black-dark hidden md:ml-4 md:inline-block">
                    Sesuaikan
                  </div>
                  <img src={images.ic_edit} alt="edit service" className="" />
                </div>
              )}
            </div>

            {dataLawyer?.service_price?.map((item) => (
              <PriceItem data={item} onDelete={() => handleDelete(item.id)} />
            ))}
          </div>
          <div className="bg-white rounded-2xl p-4 mt-4">
            <PriceItem
              data={{
                id: 1,
                service_name: "Total",
                price: totalServicePrice,
              }}
              classNameText="text-opacity-50"
            />
          </div>
        </div>

        <div className="md:bg-blue-dark md:text-white md:rounded-2xl md:h-fit bg-selected-lawyer">
          <div className="mt-4 pt-8 border-t border-t-neutral-30 mx-4 md:mt-0 md:border-none">
            <div className="font-futura md:text-xl md:mb-8 md:-mt-4">
              Rangkuman
            </div>
            <div className="">
              <div className="font-futura-bold text-sm my-2">Jasa + Pajak</div>
              {summaryPrices.jasa_pajak?.map((item) =>
                renderLabel({
                  text: item.name,
                  value: item.price,
                  className: "md:text-sm text-[#B8B8B8]",
                })
              )}
            </div>

            <div className="mt-8">
              <div className="font-futura-bold text-sm my-2">
                Biaya Transaksi
              </div>
              {summaryPrices?.transaction_price?.map((item) =>
                renderLabel({
                  text: item.name,
                  value: item.price,
                  className: "md:text-sm text-[#B8B8B8]",
                })
              )}
            </div>

            <div className="flex justify-between my-8 items-center">
              <div className="font-futura-bold text-sm">Total Tagihan</div>
              <div className="font-futura-bold text-sm">
                {numberSeparator(totalTransactionAmount, "Rp")}
              </div>
            </div>
          </div>

          <div className="border-t border-t-neutral-30 md:border-t-blue-sky md:border-opacity-15 py-4 mb-6 md:px-4">
            <div
              className="btn-secondary-hover w-full mt-1 rounded-full font-medium relative px-8 py-2.5"
              onClick={() => {
                setPaymentMethodModal(!isShowPaymentMethodModal);
              }}
            >
              <span className="pr-1 border-r border-r-neutral-40">BAYAR</span>
              <span className="pl-1">
                {numberSeparator(totalTransactionAmount, "Rp")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HeaderLawyerCard = ({ data }) => {
  const [showModa, setShowModa] = useState(false);
  const currWidth = useWidthSize();

  useEffect(() => {
    if (currWidth > 768) {
      setShowModa(false);
    }
  }, [currWidth]);

  return (
    <div className="rounded-2xl bg-neutral-60 p-4 flex md:justify-start justify-between w-full items-center relative">
      <div className="flex gap-2 items-center md:flex-col md:items-start md:border-r-2 md:border-neutral-10 md:pr-14 md:ml-4">
        <img
          src={data?.image_url}
          alt={data?.first_name}
          className="rounded-full h-10 w-10 md:w-12 md:h-12"
        />
        <div>
          <div className="font-futura-bold text-secondary-base md:text-black-dark">
            {data?.first_name} {data?.last_name}
          </div>
          <div className="text-xs text-neutral-40">{data?.city_name}</div>
        </div>
      </div>

      <div className="hidden md:flex md:flex-col md:w-9/12 text-sm pl-4">
        <div>{data?.description}</div>
        <div className={`grid grid-cols-3 mt-4 gap-2`}>
          {data?.lawyer_filed?.map((item, index) => (
            <div
              className="bg-[#D9D9D9] rounded-2xl py-1 px-2 text-center text-neutral-40 my-auto line-clamp-1"
              key={index}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="w-2/12" />

      <div className="bg-dark-50 rounded-bl-lg rounded-tr-md text-white top-0 absolute right-0 py-4 px-2 hidden md:inline-block">
        <div className="flex items-center gap-1">
          <div className="flex">
            <div className="text-3xl">{data?.experience}</div>
            <div>+</div>
          </div>
          <div className="text-xs font-light">
            <div>YEARS</div>
            <div>EXP</div>
          </div>
        </div>
      </div>

      <img
        src={images.ic_arrow_cornering}
        alt="arrow"
        className="h-2.5 w-2.5 md:hidden"
        onClick={() => setShowModa(true)}
      />

      <Modal
        show={showModa}
        onHide={() => setShowModa(false)}
        contentClassName="mx-4"
        className="!bg-neutral-40"
      >
        <div className=" px-4 py-8 rounded-xl bg-neutral-60">
          <div className="flex justify-between">
            <div className="flex gap-2 items-center md:flex-col md:items-start md:border-r-2 md:border-neutral-10 md:pr-14">
              <img
                src={data?.image_url}
                alt={data?.first_name}
                className="rounded-full h-10 w-10 md:w-12 md:h-12"
              />
              <div>
                <div className="font-semi-bold text-secondary-base md:text-black-dark">
                  {data?.first_name} {data?.last_name}
                </div>
                <div className="text-xs text-neutral-40">{data?.city}</div>
              </div>
            </div>

            <div className="bg-dark-50 rounded-bl-lg rounded-tr-xl text-white py-4 px-2 -mr-4 -mt-8">
              <div className="flex items-center gap-1">
                <div className="flex">
                  <div className="text-3xl">{data?.experince}</div>
                  <div>+</div>
                </div>
                <div className="text-xs font-light">
                  <div>YEARS</div>
                  <div>EXP</div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-sm mt-8">
            <div>{data?.description}</div>
            <div className="grid grid-cols-2 mt-4 gap-2">
              {data?.lawyer_filed?.map((item, index) => (
                <div
                  className="bg-[#D9D9D9] rounded-lg py-1 px-2 text-center text-neutral-40 my-auto"
                  key={index}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

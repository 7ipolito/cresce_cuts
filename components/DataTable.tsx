/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */

import React, { useCallback, useEffect, useState } from "react";
import { Button } from "./Button";
import Switch from "./Switch";
import * as Dialog from "@radix-ui/react-dialog";
import { Discount } from "types/DiscountProps";

import { TypeDiscount } from "../enums/types.enum";
import Modal from "./Modal";
import Link from "next/link";
import { ErrorFormTypes } from "../enums/erros.enum";
import { PatternTimeout } from "../enums/timeout.enum";
import { useDiscount } from "../hooks/useDiscount";
import Select from "./Form/Select";
import { useModal } from "../hooks/useModal";
type DataTableProps = { columns: any[]; data: Discount[] };
const DataTable = ({ columns, data }: DataTableProps) => {
  const { activeDiscount, desativeDiscount } = useDiscount();

  const [discountSelected, setDiscountSelected] = useState<Discount>(
    {} as Discount,
  );
  const [statusFilterSelected, setStatusFilterSelected] = useState(null);
  const [typeDiscount, setTypeDiscountSelected] = useState(null);
  const [filteredData, setFilteredData] = useState<Discount[]>(data);
  const [controlSwitch, setControlSwitch] = useState<
    "activeAll" | "desactiveAll" | ""
  >("");
  const [loading, setIsLoading] = useState(true);
  const { getDiscounts } = useDiscount();
  const { isOpen, openModal } = useModal();

  useEffect(() => {
    setTimeout(() => {
      if (!filteredData[0]?.id && !filteredData && !typeDiscount) {
        setFilteredData(getDiscounts());
      }
      setIsLoading(false);
    }, PatternTimeout.TIMEOUTDATATABLE);

    const applyFilter = () => {
      let filtered = data;

      if (statusFilterSelected !== null) {
        filtered = filtered.filter((discount) =>
          statusFilterSelected == 1 ? discount.activate : !discount.activate,
        );
        if (statusFilterSelected == 0) {
          setControlSwitch("activeAll");
        } else if (statusFilterSelected == 1) {
          setControlSwitch("desactiveAll");
        }
      }

      if (typeDiscount !== null && typeDiscount !== TypeDiscount.NENHUM) {
        filtered = filtered.filter(
          (discount) => discount.type === typeDiscount,
        );
      }

      setFilteredData(filtered);
    };

    applyFilter();
  }, [data, statusFilterSelected, typeDiscount, loading]);

  const renderData = useCallback(() => {
    return filteredData?.map((data: Discount, index: number) => (
      <tr
        key={index}
        className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
      >
        <td className="px-14 py-4">
          <div className="flex flex-row items-center">
            <div className="bg-red w-20">
              <img src={data.image} alt="Imagem do produto" />
            </div>
            <p className="ml-4" role="discountTitle">
              {data.title}
            </p>
          </div>
        </td>
        <td className="px-6 py-4" role="typeDiscountTdRole">
          {data.type === TypeDiscount.DEPOR
            ? "From / To"
            : data.type === TypeDiscount.LEVEMAISPAGUEMENOS
              ? "Buy more and pay less"
              : data.type === TypeDiscount.PERCENTUAL
                ? "Percentage"
                : "No have"}
        </td>
        <td className="px-6 py-4">
          {data.activationDate !== "" ? data.activationDate : "No have"}
        </td>
        <td className="px-6 py-4">
          {" "}
          {data.desactivationDate !== "" ? data.desactivationDate : "No have"}
        </td>
        <td className="px-6 py-4">
          <Switch
            control={controlSwitch}
            checked={data.activate}
            role="switchRole"
            onClick={(checked) => {
              checked ? desativeDiscount(data.id) : activeDiscount(data.id);
            }}
          />
        </td>
        <td className="px-6 py-4">
          <Dialog.Trigger asChild>
            <Button
              variant="ghost"
              onClick={() => {
                setDiscountSelected(data);
                openModal();
              }}
            >
              <img
                src="https://smartranking-hipolito.s3.sa-east-1.amazonaws.com/eye.png"
                alt="View"
              />
            </Button>
          </Dialog.Trigger>
        </td>
      </tr>
    ));
  }, [activeDiscount, desativeDiscount, filteredData]);

  return (
    <Dialog.Root open={isOpen}>
      <div className="rounded-md bg-white px-4 py-6">
        <div className="w-100 flex items-center justify-between pb-6">
          <h2 className="text-xl font-thin text-grey-primary">
            Discounts created
          </h2>
          <Link href="/create-discount">
            <Button>Create Discount</Button>
          </Link>
        </div>
        <div className="w-100 flex flex-col items-center gap-2 pb-6 lg:flex-row lg:justify-between">
          <div className="w-full">
            <p className="text-sm text-grey-secondary">Status</p>

            <Select
              name="statusSelected"
              role="selectStatus"
              defaultValue=""
              onChange={(e) => setStatusFilterSelected(e.target.value)}
              options={[
                { text: "Select a status", value: "" },
                { text: "Activated", value: "1" },
                { text: "Desactivated", value: "0" },
              ]}
            />
          </div>

          <div className="w-full">
            <p className="text-sm text-grey-secondary">Type of discount</p>

            <Select
              name="typeDiscount"
              role="selectTypeDiscount"
              onChange={(e) => setTypeDiscountSelected(e.target.value)}
              options={[
                {
                  isSelected: true,
                  text: "Select a type of discount",
                  value: "",
                },
                { text: "From/To", value: TypeDiscount.DEPOR },
                { text: "Percentage", value: TypeDiscount.PERCENTUAL },
                {
                  text: "Buy more pay less",
                  value: TypeDiscount.LEVEMAISPAGUEMENOS,
                },
              ]}
            />
          </div>
        </div>
        <div className="relative w-full overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
            <thead className="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {columns.map((title) => (
                  <th key={title} scope="col" className="px-6 py-3">
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>{!loading && filteredData[0] && renderData()}</tbody>
          </table>
          {!loading && !filteredData[0] && (
            <div className="flex w-full flex-1 items-center justify-center pt-5">
              {" "}
              <p>{ErrorFormTypes.SEMDADOS}</p>
            </div>
          )}
          {loading && (
            <div className="flex w-full flex-1 items-center justify-center pt-5">
              {" "}
              <p>{ErrorFormTypes.CARREGANDO}</p>
            </div>
          )}
        </div>
      </div>
      <Modal discountSelected={discountSelected} />
    </Dialog.Root>
  );
};

export default DataTable;

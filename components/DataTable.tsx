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
                src="https://smartranking-hipolito.s3.sa-east-1.amazonaws.com/eye.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBoaCXNhLWVhc3QtMSJHMEUCIQCe2KRxMP2EhlfkyH3ufOBH2tYaV%2FdEZzaPI%2Fyy%2F%2BFnZAIgJupyiodSmqbbW%2FQnKaiLXP%2BLWGDPpljq2MyObLkOo7Uq7QII4%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw1OTAxODM3MzYwMjAiDEqXqa%2BHH6PAUzh9oSrBAjkHUDarPqdPp5ZjpUYbjsUbkgKIVw5MZTy%2BU78S7gXclnwUzIxBEynaCCrqPNOoHSqIZBUtT%2Br2b9uvjZe0raI5fLkJHQYezqHtsgIQNhToLRtnsGvG0GIqLjAlbljwOOfEX%2FSHGYtjakP%2FexX3MTMP8%2FLn%2B1TvNXw8LG%2BsCn%2B7Y53OZZe4NvX9gWSUulGp1wfnTs5QfpcDwBsHsoA4eNyLPLt9R%2FQMbAyipkfTE%2BZSZtYkFz7M9LDCyBO6jR8%2FYi2LGMRBu%2FcXPAIlmnzRo7LEW0YD7hmTbfjH%2FgSjnq19HUJi1p6ysKxd6IYxBVdfEKlrBgsH%2FkvyJoOReqfiPu3ZBFEkeq5wEFnfnYlBXlXIeS7DB9O88dhf7A04c68NwAgGWA7tCFBs%2BTqi5yLlEwWkfdzcfyDSaXnlqOIgvbNeZjCy0ty0BjqzAkI9CMo%2Ft6BNDcfkx%2BzH0%2FwXf92JCKFyWQXlkthKVPMRLsE14lJ6WG%2BCB6w3WbxwhJ6ia%2Bzj7SxbRcEZDZoUs%2FnvRxLm40r9sqHS3zKs%2FMj1HTcwxoENr%2FayY1IbJ6i9O7mtDkY%2FXu5jYVrA9Ii2oNG1U6xaYHH5tw5v57n1AReyUXrybbUkHyhzcsuBEHUbnUO82IDNtKlDn22Jy0gKrUEahBPFZK95%2FTtdUtmbLO%2FncV49uhoc1fyfxAlfKYOP1Qw5b3fFh2Cu6VG0xEB2kyRVGssX76i%2BqbNaACHDUIkMxB%2BROBj7bF5vthEHIcEexxB6mA9YcoL632BQVYOAI%2BCkxLJR71Iki%2BEVlPtCybgc%2FHQaODClY%2BUqa%2FgQWOhNzEfxeqQW37Tu674ZzPRqfA7uNEc%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240717T021656Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAYS2NRELKDRWC6CDX%2F20240717%2Fsa-east-1%2Fs3%2Faws4_request&X-Amz-Signature=aed8302cad638ca6eb1de327c6638e4aa8e329a6f74762c4cec3792514cc2117"
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

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DataTable from "components/DataTable";
import { TypeDiscount } from "enums/types.enum";
import { titles } from "utils/dataMocked";
import { SidebarProvider } from "../hooks/useSidebar";
import { v4 as uuidv4 } from "uuid";

describe("DataTable Component", () => {
  const data = [
    {
      id: uuidv4(),
      title: "Desconto 1",
      description: "",
      price: 0,
      type: TypeDiscount.DEPOR,
      activationDate: "2022-12-01",
      desactivationDate: "2022-12-31",
      activate: true,
      image: "image1.jpg",
    },
    {
      id: uuidv4(),
      title: "Desconto 2",
      description: "",
      price: 0,
      type: TypeDiscount.LEVEMAISPAGUEMENOS,
      activationDate: "",
      desactivationDate: "",
      activate: false,
      image: "image2.jpg",
    },
    {
      id: uuidv4(),
      title: "Desconto 3",
      description: "",
      price: 0,
      type: TypeDiscount.PERCENTUAL,
      activationDate: "",
      desactivationDate: "",
      activate: false,
      image: "image2.jpg",
    },
    {
      id: uuidv4(),
      title: "Desconto 4",
      description: "",
      price: 0,
      type: TypeDiscount.DEPOR,
      activationDate: "2022-12-01",
      desactivationDate: "2022-12-31",
      activate: true,
      image: "image1.jpg",
    },
  ];

  it("Filter all discounts activated", async () => {
    render(
      <SidebarProvider>
        <DataTable columns={titles} data={data} />
      </SidebarProvider>,
    );
    const selectElement = screen.getByRole("selectStatus");
    fireEvent.click(selectElement);

    fireEvent.change(selectElement, { target: { value: "1" } });
    await waitFor(() => {
      const textElements = screen.getAllByRole("discountTitle");
      const textos = textElements.map((elementoP) => elementoP.textContent);

      expect(textos).toEqual(["Desconto 1", "Desconto 4"]);
    });
  });

  it("Filtr all discounts desactivated", async () => {
    render(
      <SidebarProvider>
        <DataTable columns={titles} data={data} />
      </SidebarProvider>,
    );

    const selectElement = screen.getByRole("selectStatus");
    fireEvent.click(selectElement);

    fireEvent.change(selectElement, { target: { value: "0" } });
    await waitFor(() => {
      const textElements = screen.getAllByRole("discountTitle");
      const textos = textElements.map((elementoP) => elementoP.textContent);

      expect(textos).toEqual(["Desconto 2", "Desconto 3"]);
    });
  });
  it("Filter al discounts by type discount from/to", async () => {
    render(
      <SidebarProvider>
        <DataTable columns={titles} data={data} />
      </SidebarProvider>,
    );

    const selectElement = screen.getByRole("selectTypeDiscount");
    fireEvent.click(selectElement);

    fireEvent.change(selectElement, { target: { value: TypeDiscount.DEPOR } });
    await waitFor(() => {
      const textElements = screen.getAllByRole("discountTitle");
      const textos = textElements.map((elementoP) => elementoP.textContent);

      expect(textos).toEqual(["Desconto 1", "Desconto 4"]);
    });
  });
  it("Filter al discounts by type discount percentage", async () => {
    render(
      <SidebarProvider>
        <DataTable columns={titles} data={data} />
      </SidebarProvider>,
    );

    const selectElement = screen.getByRole("selectTypeDiscount");
    fireEvent.click(selectElement);

    fireEvent.change(selectElement, {
      target: { value: TypeDiscount.PERCENTUAL },
    });
    await waitFor(() => {
      const textElements = screen.getAllByRole("discountTitle");
      const textos = textElements.map((elementoP) => elementoP.textContent);

      expect(textos).toEqual(["Desconto 3"]);
    });
  });
  it("Filter al discounts by type discount buy more, pay less", async () => {
    render(
      <SidebarProvider>
        <DataTable columns={titles} data={data} />
      </SidebarProvider>,
    );

    const selectElement = screen.getByRole("selectTypeDiscount");
    fireEvent.click(selectElement);

    fireEvent.change(selectElement, {
      target: { value: TypeDiscount.LEVEMAISPAGUEMENOS },
    });
    await waitFor(() => {
      const textElements = screen.getAllByRole("discountTitle");
      const textos = textElements.map((elementoP) => elementoP.textContent);

      expect(textos).toEqual(["Desconto 2"]);
    });
  });
});

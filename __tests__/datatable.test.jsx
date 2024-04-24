import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import DataTable from 'components/DataTable'
import { TypeDiscount } from 'enums/types.enum'
import { titles } from 'utils/dataMocked'
import { SidebarProvider } from '../hooks/useSidebar'
import { v4 as uuidv4 } from 'uuid'

describe('Componente DataTable', () => {
  const data = [
    {
      id: uuidv4(),
      title: 'Desconto 1',
      description: '',
      price: 0,
      type: TypeDiscount.DEPOR,
      activationDate: '2022-12-01',
      desactivationDate: '2022-12-31',
      activate: true,
      image: 'image1.jpg',
    },
    {
      id: uuidv4(),
      title: 'Desconto 2',
      description: '',
      price: 0,
      type: TypeDiscount.LEVEMAISPAGUEMENOS,
      activationDate: '',
      desactivationDate: '',
      activate: false,
      image: 'image2.jpg',
    },
    {
      id: uuidv4(),
      title: 'Desconto 3',
      description: '',
      price: 0,
      type: TypeDiscount.PERCENTUAL,
      activationDate: '',
      desactivationDate: '',
      activate: false,
      image: 'image2.jpg',
    },
    {
      id: uuidv4(),
      title: 'Desconto 4',
      description: '',
      price: 0,
      type: TypeDiscount.DEPOR,
      activationDate: '2022-12-01',
      desactivationDate: '2022-12-31',
      activate: true,
      image: 'image1.jpg',
    },
  ]

  it('Filtra todos os descontos ativados', async () => {
    render(
      <SidebarProvider>
        <DataTable columns={titles} data={data} />
      </SidebarProvider>,
    )
    const selectElement = screen.getByRole('selectStatus')
    fireEvent.click(selectElement)

    fireEvent.change(selectElement, { target: { value: '1' } })
    await waitFor(() => {
      const textElements = screen.getAllByRole('discountTitle')
      const textos = textElements.map((elementoP) => elementoP.textContent)

      expect(textos).toEqual(['Desconto 1', 'Desconto 4'])
    })
  })

  it('Filtra todos os descontos desativados', async () => {
    render(
      <SidebarProvider>
        <DataTable columns={titles} data={data} />
      </SidebarProvider>,
    )

    const selectElement = screen.getByRole('selectStatus')
    fireEvent.click(selectElement)

    fireEvent.change(selectElement, { target: { value: '0' } })
    await waitFor(() => {
      const textElements = screen.getAllByRole('discountTitle')
      const textos = textElements.map((elementoP) => elementoP.textContent)

      expect(textos).toEqual(['Desconto 2', 'Desconto 3'])
    })
  })
  it('Filtra todos os descontos por tipo de desconto de/por', async () => {
    render(
      <SidebarProvider>
        <DataTable columns={titles} data={data} />
      </SidebarProvider>,
    )

    const selectElement = screen.getByRole('selectTypeDiscount')
    fireEvent.click(selectElement)

    fireEvent.change(selectElement, { target: { value: TypeDiscount.DEPOR } })
    await waitFor(() => {
      const textElements = screen.getAllByRole('discountTitle')
      const textos = textElements.map((elementoP) => elementoP.textContent)

      expect(textos).toEqual(['Desconto 1', 'Desconto 4'])
    })
  })
  it('Filtra todos os descontos por tipo de desconto percentual', async () => {
    render(
      <SidebarProvider>
        <DataTable columns={titles} data={data} />
      </SidebarProvider>,
    )

    const selectElement = screen.getByRole('selectTypeDiscount')
    fireEvent.click(selectElement)

    fireEvent.change(selectElement, {
      target: { value: TypeDiscount.PERCENTUAL },
    })
    await waitFor(() => {
      const textElements = screen.getAllByRole('discountTitle')
      const textos = textElements.map((elementoP) => elementoP.textContent)

      expect(textos).toEqual(['Desconto 3'])
    })
  })
  it('Filtra todos os descontos por tipo de desconto leve + pague -', async () => {
    render(
      <SidebarProvider>
        <DataTable columns={titles} data={data} />
      </SidebarProvider>,
    )

    const selectElement = screen.getByRole('selectTypeDiscount')
    fireEvent.click(selectElement)

    fireEvent.change(selectElement, {
      target: { value: TypeDiscount.LEVEMAISPAGUEMENOS },
    })
    await waitFor(() => {
      const textElements = screen.getAllByRole('discountTitle')
      const textos = textElements.map((elementoP) => elementoP.textContent)

      expect(textos).toEqual(['Desconto 2'])
    })
  })

  // it('Filtra port tipo de desconto de/por', async () => {
  //   render(<DataTable columns={titles} data={data} />)

  //   const buttonElement = screen.getByRole('selectTypeDiscount')
  //   fireEvent.click(buttonElement)

  //   const selectElement = screen.getByText('De/Por')
  //   fireEvent.click(selectElement)
  //   await waitFor(() => {
  //     const tdElements = screen.getAllByRole('typeDiscountTdRole')

  //     tdElements.forEach((tdElement) => {
  //       expect(tdElement.textContent).toBe('De / Por')
  //     })
  //   })
  // })

  // it('renders the table with no data message when there is no data', async () => {
  //   render(
  //     <DataTable
  //       columns={[
  //         'Title',
  //         'Type',
  //         'Activation Date',
  //         'End Date',
  //         'Status',
  //         'Actions',
  //       ]}
  //       data={[]}
  //     />,
  //   )

  // await waitFor(() => {
  //   expect(screen.getByText('Nenhum dado encontrado')).toBeInTheDocument()
  // })
  // })
})

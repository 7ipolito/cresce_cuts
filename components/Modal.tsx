import { Cross2Icon } from '@radix-ui/react-icons'
import React, { useState } from 'react'
import { TypeDiscount } from 'utils/types.enum'
import { Button } from './Button'
import { Textarea } from './Form/Textarea'
import * as Dialog from '@radix-ui/react-dialog'
import { Discount } from 'utils/DiscountProps'
import * as Input from '../components/Form/Input'

type ModalProps = { discountSelected: Discount }
const Modal = ({ discountSelected }: ModalProps) => {
  const [discountEditable, setDiscountEditable] = useState(false)

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
      <Dialog.Content className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[659px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <div className="flex justify-center">
          <Dialog.Title className=" pb-5 text-[16px] font-medium">
            Detalhes do produto
          </Dialog.Title>
        </div>
        <Dialog.Close asChild>
          <button
            className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
            aria-label="Close"
          >
            <Cross2Icon />
          </button>
        </Dialog.Close>
        <Dialog.Description
          className={!discountEditable ? 'flex flex-row justify-between' : ''}
        >
          <div className=" flex w-full items-center justify-center px-4">
            <img src={discountSelected.image} width={150} />
          </div>
          <div className="pt-4">
            {discountSelected.type !== TypeDiscount.DEPOR &&
              (!discountEditable ? (
                <p className="text-2xl font-medium text-grey-primary">
                  {discountSelected.discountText}
                </p>
              ) : (
                <Input.Root className="mb-2">
                  <Input.Control
                    name="nameDiscount"
                    id="nameDiscount"
                    type="text"
                    defaultValue={discountSelected.discountText}
                  />
                </Input.Root>
              ))}
            {!discountEditable ? (
              <p className="text-sm text-grey-primary">
                {discountSelected.title}
              </p>
            ) : (
              <Input.Root className="mb-2">
                <Input.Control
                  name="discountText"
                  id="discountText"
                  type="text"
                  defaultValue={discountSelected.title}
                />
              </Input.Root>
            )}
            {!discountEditable ? (
              <p className="text-sm text-grey-primary">
                {discountSelected.description}
              </p>
            ) : (
              <div className="mb-2">
                <Textarea
                  name="bio"
                  id="bio"
                  defaultValue={discountSelected.description}
                />
              </div>
            )}

            {discountSelected.type == TypeDiscount.DEPOR ||
            discountSelected.type == TypeDiscount.PERCENTUAL ? (
              <div>
                {discountSelected.type == TypeDiscount.DEPOR && <p>de</p>}
                <p className="text-2xl font-medium text-grey-secondary line-through">
                  {!discountEditable ? (
                    <p className="text-2xl font-medium text-grey-secondary">
                      {discountSelected.price}
                    </p>
                  ) : (
                    <Input.Root className="mb-2">
                      <Input.Control
                        name="discountText"
                        id="discountText"
                        type="text"
                        placeholder="Preço Normal"
                        defaultValue={discountSelected.price}
                      />
                    </Input.Root>
                  )}
                </p>
                {discountSelected.type == TypeDiscount.DEPOR && (
                  <span>por</span>
                )}
                {!discountEditable ? (
                  <p className="text-2xl font-medium text-grey-secondary">
                    {discountSelected.priceWithDiscount}
                  </p>
                ) : (
                  <Input.Root className="mb-2">
                    <Input.Control
                      name="discountText"
                      id="discountText"
                      placeholder="Preço com desconto"
                      type="text"
                      defaultValue={discountSelected.priceWithDiscount}
                    />
                  </Input.Root>
                )}
              </div>
            ) : !discountEditable ? (
              <p className="text-2xl font-medium text-grey-secondary">
                {discountSelected.price}
              </p>
            ) : (
              <Input.Root className="mb-2">
                <Input.Control
                  name="discountText"
                  id="discountText"
                  type="text"
                  defaultValue={discountSelected.price}
                />
              </Input.Root>
            )}
          </div>
        </Dialog.Description>

        <div className="mt-[25px] flex justify-end">
          <div className="flex w-full justify-between gap-2">
            <Button
              className="w-full"
              variant="outline"
              onClick={() => setDiscountEditable(!discountEditable)}
            >
              {discountEditable ? 'Cancelar edição' : 'Editar'}
            </Button>
            {!discountEditable ? (
              <Dialog.Close asChild>
                <Button className="w-full">Fechar</Button>
              </Dialog.Close>
            ) : (
              <Button className="w-full">Salvar</Button>
            )}
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  )
}

export default Modal

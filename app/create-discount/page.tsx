'use client'
import { Button } from 'components/Button'
import { Mail } from 'lucide-react'
import * as Input from '../../components/Form/Input'
import * as Select from '../../components/Form/Select'
import React, { useState } from 'react'
import Switch from 'components/Switch'
import { UploadDropzone } from 'utils/uploadthing'
import { TypeDiscount } from 'utils/types.enum'

// import { Container } from './styles';

const CreateDiscount: React.FC = () => {
  const [imageUploaded, setImageUploaded] = useState()
  const [discountTypeSelected, setDiscountTypeSelected] = useState()

  return (
    <>
      <div className="pb-6">
        <h1 className="text-3xl font-medium text-grey-secondary">
          Cadastrar Desconto
        </h1>
        <p className="text-sm text-grey-primary">
          Loja: Super João - Nova loja online
        </p>
      </div>

      <div className="rounded-md bg-white px-6 py-4">
        <div className="flex flex-col">
          <div className="flex items-center justify-between  lg:flex-row  ">
            <h2 className="text-xl font-thin text-grey-primary">
              Formulário cadastro desconto
            </h2>

            <div className="flex items-center gap-2">
              <p className="text-sm text-grey-primary">Ativo</p>
              <Switch checked={true} />
            </div>
          </div>
        </div>

        <form
          id="settings"
          className="mt-6 flex w-full flex-col gap-5 divide-y divide-zinc-200 dark:divide-zinc-800"
        >
          <div className="lg:grid-cols-form grid gap-3">
            <label
              htmlFor="firstName"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-100"
            >
              Nome do desconto
            </label>
            <div className="grid gap-6 ">
              <Input.Root>
                <Input.Control
                  name="firstName"
                  id="firstName"
                  type="text"
                  defaultValue=""
                  placeholder="Informe o Nome do desconto"
                />
              </Input.Root>
            </div>
          </div>
          <div className="grid gap-3 pt-5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-100"
            >
              Descrição
            </label>
            <div className="flex gap-3">
              <Input.Root>
                <Input.Control
                  id="description"
                  type="description"
                  name="description"
                  defaultValue=""
                  placeholder="Informe a descrição"
                />
              </Input.Root>
            </div>
          </div>
          <div className="grid gap-3 pt-5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-100"
            >
              Tipo de desconto
            </label>
            <Select.Root
              name="typeDiscount"
              onValueChange={(e) => setDiscountTypeSelected(e)}
            >
              <Select.Trigger>
                <Select.Value placeholder="Selecione o tipo de desconto" />
              </Select.Trigger>

              <Select.Content>
                <Select.Item value={TypeDiscount.DEPOR}>
                  <Select.ItemText>De / Por</Select.ItemText>
                </Select.Item>

                <Select.Item value={TypeDiscount.LEVEMAISPAGUEMENOS}>
                  <Select.ItemText>Leve + Pague -</Select.ItemText>
                </Select.Item>
                <Select.Item value={TypeDiscount.PERCENTUAL}>
                  <Select.ItemText>Percentual</Select.ItemText>
                </Select.Item>
              </Select.Content>
            </Select.Root>
          </div>
          {discountTypeSelected == TypeDiscount.DEPOR && (
            <div className="w-100 flex flex-col items-center gap-2 pb-6 lg:flex-row lg:justify-between">
              <div className="w-full pt-5">
                <label
                  htmlFor="email"
                  className="text-sm  text-grey-secondary dark:text-zinc-100"
                >
                  Preço "DE"
                </label>
                <Input.Root>
                  <Input.Control
                    name="nameDiscount"
                    id="nameDiscount"
                    type="text"
                    defaultValue=""
                    placeholder="00,00R$"
                  />
                </Input.Root>
              </div>

              <div className="w-full pt-5">
                <p className="text-sm text-grey-secondary">Preço "POR"</p>
                <Input.Root>
                  <Input.Control
                    name="firstName"
                    id="firstName"
                    type="text"
                    defaultValue=""
                    placeholder="00,00R$"
                  />
                </Input.Root>
              </div>
            </div>
          )}

          {discountTypeSelected == TypeDiscount.LEVEMAISPAGUEMENOS && (
            <div className="w-100 flex flex-col items-center gap-2 pb-6 lg:flex-row lg:justify-between">
              <div className="w-full pt-5">
                <label
                  htmlFor="email"
                  className="text-sm  text-grey-secondary dark:text-zinc-100"
                >
                  Preço
                </label>
                <Input.Root>
                  <Input.Control
                    name="nameDiscount"
                    id="nameDiscount"
                    type="text"
                    defaultValue=""
                    placeholder="00,00R$"
                  />
                </Input.Root>
              </div>

              <div className="w-full pt-5">
                <p className="text-sm text-grey-secondary">Leve</p>
                <Input.Root>
                  <Input.Control
                    name="firstName"
                    id="firstName"
                    type="text"
                    defaultValue=""
                    placeholder='Valor de "Leve"'
                  />
                </Input.Root>
              </div>

              <div className="w-full pt-5">
                <p className="text-sm text-grey-secondary">Pague</p>
                <Input.Root>
                  <Input.Control
                    name="firstName"
                    id="firstName"
                    type="text"
                    defaultValue=""
                    placeholder='Valor de "Pague"'
                  />
                </Input.Root>
              </div>
            </div>
          )}

          <div className="w-100 flex flex-col items-center gap-2 pb-6 lg:flex-row lg:justify-between">
            <div className="w-full pt-5">
              <label
                htmlFor="email"
                className="text-sm  text-grey-secondary dark:text-zinc-100"
              >
                Data ativação
              </label>
              <Select.Root name="timezone">
                <Select.Trigger>
                  <Select.Value placeholder="Selecione a data de ativação" />
                </Select.Trigger>

                <Select.Content>
                  <Select.Item value="utc-3">
                    <Select.ItemText>Ativado</Select.ItemText>
                  </Select.Item>

                  <Select.Item value="utc-1">
                    <Select.ItemText>Desativado</Select.ItemText>
                  </Select.Item>
                </Select.Content>
              </Select.Root>
            </div>

            <div className="w-full pt-5">
              <p className="text-sm text-grey-secondary">Data de inativação</p>
              <Select.Root name="timezone">
                <Select.Trigger>
                  <Select.Value placeholder="Selecione a data de inativação" />
                </Select.Trigger>

                <Select.Content>
                  <Select.Item value="1">
                    <Select.ItemText>De/Por</Select.ItemText>
                  </Select.Item>
                  <Select.Item value="2">
                    <Select.ItemText>Percentual</Select.ItemText>
                  </Select.Item>
                  <Select.Item value="3">
                    <Select.ItemText>Leve + Pague -</Select.ItemText>
                  </Select.Item>
                </Select.Content>
              </Select.Root>
            </div>
          </div>
          <div>
            {imageUploaded ? (
              <div className="tems-center flex justify-center">
                <img src={imageUploaded} width={500} />
              </div>
            ) : (
              <UploadDropzone
                endpoint="imageUploader"
                onClientUploadComplete={(res: any) => {
                  // Do something with the response
                  setImageUploaded(res[0].url)

                  console.log('Files: ', res)
                }}
                onUploadError={(error: Error) => {
                  // Do something with the error.
                  // alert(`ERROR! ${error.message}`)
                }}
              />
            )}
          </div>

          <div className="flex items-center justify-end gap-2 pt-5">
            <Button type="button" variant="outline">
              Cancelar
            </Button>
            {imageUploaded && (
              <Button onClick={() => setImageUploaded('')}>
                Editar imagem
              </Button>
            )}
            <Button type="submit" form="settings" variant="primary">
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default CreateDiscount

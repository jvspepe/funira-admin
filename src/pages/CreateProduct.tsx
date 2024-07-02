import { useState } from "react";
import { DefaultValues, SubmitHandler, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { nanoid } from "nanoid";
import { TCategory } from "@/types/category";
import { TProduct } from "@/types/product";
import { createProduct } from "@/libs/firebase/firestore/products";
import { getImageURL, uploadImage } from "@/libs/firebase/storage/upload-image";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import Select from "@/components/Select";
import Button from "@/components/Button";

type CreateProductValues = Omit<
  TProduct,
  "uid" | "images" | "rating" | "sales" | "createdAt"
> & {
  images: FileList | null;
};

const categories: TCategory[] = [
  { uid: "1", label: "Cadeiras", value: "cadeiras" },
  { uid: "2", label: "Armários", value: "armarios" },
  { uid: "3", label: "Camas", value: "beds" },
];

const defaultValues: DefaultValues<CreateProductValues> = {
  name: "",
  description: "",
  price: 0,
  dimensions: {
    depth: "",
    height: "",
    width: "",
  },
  category: "",
  images: null,
};

const CreateProduct = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [imagesPreview, setImagesPreview] = useState<string[]>();

  const { register, reset, control, handleSubmit } =
    useForm<CreateProductValues>({ defaultValues });

  const onSubmit: SubmitHandler<CreateProductValues> = async (data) => {
    setLoading(true);
    const uid = nanoid(21);

    try {
      if (!data.images) {
        return;
      }

      const uploadURLS = await Promise.all(
        Array.from(data.images).map((image, index) =>
          uploadImage(`products/${uid}-${index + 1}`, image),
        ),
      );

      const downloadURLS = await Promise.all(
        uploadURLS.map((url) => getImageURL(url.ref)),
      );

      await createProduct({
        uid,
        ...data,
        images: downloadURLS,
      });
    } catch (error) {
      throw error;
    }

    reset(defaultValues);
    setLoading(false);
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto flex flex-col gap-2 rounded bg-gray-50 p-4 shadow"
        >
          <Input
            id="name"
            label="Nome"
            {...register("name", { required: true })}
            placeholder="Nome do produto"
          />
          <Input
            id="price"
            label="Preço"
            type="number"
            {...register("price", { required: true })}
            placeholder="Preço"
          />
          <Textarea
            id="description"
            label="Descrição"
            {...register("description")}
            placeholder="Descrição do produto"
          />
          <Select
            id="category"
            label="Categoria"
            {...register("category", { required: true })}
            defaultValue=""
          >
            <option value="" disabled>
              Escolha a categoria do produto
            </option>
            {categories.map((category) => (
              <option key={category.uid} value={category.value}>
                {category.label}
              </option>
            ))}
          </Select>
          <div className="flex gap-2">
            <Input
              type="number"
              {...register("dimensions.height", { required: true })}
              id="height"
              label="Altura"
              placeholder="Em centímetros (cm)"
            />
            <Input
              type="number"
              {...register("dimensions.width", { required: true })}
              id="width"
              label="Largura"
              placeholder="Em centímetros (cm)"
            />
            <Input
              type="number"
              {...register("dimensions.depth", { required: true })}
              id="depth"
              label="Comprimento"
              placeholder="Em centímetros (cm)"
            />
          </div>
          <div className="flex gap-2">
            {imagesPreview &&
              imagesPreview.map((image) => (
                <img key={image} src={image} height={160} width={160} />
              ))}
          </div>
          <input
            type="file"
            {...register("images", { required: true })}
            onChange={(event) => {
              const { files } = event.target;
              if (files && files.length > 0) {
                const images = Array.from(files).map((file) =>
                  URL.createObjectURL(file),
                );
                setImagesPreview(images);
              }
            }}
            id="images"
            multiple
          />
          <Button type="submit" disabled={loading}>
            Adicionar produto
          </Button>
        </form>
      </div>
      <DevTool control={control} />
    </>
  );
};

export default CreateProduct;

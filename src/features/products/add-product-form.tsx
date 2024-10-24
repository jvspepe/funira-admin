import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DefaultValues, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { nanoid } from "nanoid";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createProduct } from "@/lib/firebase/firestore/products";
import { getImageURL, uploadImage } from "@/lib/firebase/storage/upload-image";
import { getAllCategories } from "@/lib/firebase/firestore/categories";
import { TCategory } from "@/@types/category";

const formSchema = z.object({
  name: z.string(),
  price: z.number().min(0),
  description: z.string(),
  dimensions: z.object({
    depth: z.string(),
    height: z.string(),
    width: z.string(),
  }),
  category: z.string(),
  images: z.instanceof(FileList).nullable(),
});

const defaultValues: DefaultValues<z.infer<typeof formSchema>> = {
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

type Props = {
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
};

const AddProductForm = ({ setOpenDialog }: Props) => {
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [imagesPreview, setImagesPreview] = useState<string[]>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const fileRef = form.register("images");

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
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

    form.reset(defaultValues);
    setLoading(false);
    setOpenDialog(false);
  };

  useEffect(() => {
    getAllCategories()
      .then((data) => setCategories(data))
      .catch((error) => {
        throw error;
      });
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Nome do produto" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Preço</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Preço" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Categoria</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleciona uma categoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.uid} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="dimensions.height"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>Altura</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Em cm" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dimensions.width"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>Largura</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Em cm" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dimensions.depth"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>Comprimento</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Em cm" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Descrição do produto..."
                  className="resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          {imagesPreview &&
            imagesPreview.map((image) => (
              <img key={image} src={image} height={160} width={160} />
            ))}
        </div>
        <FormField
          control={form.control}
          name="images"
          render={() => (
            <FormItem>
              <FormLabel>Imagens</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  multiple
                  placeholder="Nome do produto"
                  {...fileRef}
                  onChange={(event) => {
                    const { files } = event.target;
                    if (files && files.length > 0) {
                      const images = Array.from(files).map((file) =>
                        URL.createObjectURL(file),
                      );
                      setImagesPreview(images);
                    }
                    return fileRef.onChange(event);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={loading} className="w-fit self-end">
          Adicionar produto
        </Button>
      </form>
    </Form>
  );
};

export default AddProductForm;

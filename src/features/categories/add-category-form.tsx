import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction } from "react";
import { createCategory } from "@/lib/firebase/firestore/categories";
import { nanoid } from "nanoid";

const formSchema = z.object({
  label: z.string(),
  value: z.string(),
});

type Props = {
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
};

export default function AddCategoryForm({ setOpenDialog }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: "",
      value: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    try {
      await createCategory({
        uid: nanoid(21),
        ...data,
      });
    } catch (error) {
      throw error;
    }
    form.reset();
    setOpenDialog(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Nome da categoria" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Referência</FormLabel>
              <FormControl>
                <Input placeholder="Referência da categoria" {...field} />
              </FormControl>
              <FormDescription>
                Não pode conter caractéres especiais
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="self-end">
          Confirmar
        </Button>
      </form>
    </Form>
  );
}

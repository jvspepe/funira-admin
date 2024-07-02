import Button from "@/components/Button";
import Input from "@/components/Input";
import { createCategory } from "@/libs/firebase/firestore/categories";
import { TCategory } from "@/types/category";
import { SubmitHandler, useForm } from "react-hook-form";

type CreateCategoryValues = Omit<TCategory, "uid">;

const defaultValues: CreateCategoryValues = {
  label: "",
  value: "",
};

const CreateCategory = () => {
  const { register, reset, handleSubmit } = useForm<CreateCategoryValues>({
    defaultValues,
  });
  const onSubmit: SubmitHandler<CreateCategoryValues> = async (data) => {
    const { value, label } = data;
    try {
      createCategory({ label, value });
    } catch (error) {
      throw error;
    }
    reset(defaultValues);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 rounded bg-gray-50 p-4 shadow"
      >
        <Input
          id="value"
          label="Identificador"
          type="text"
          {...register("value", { required: true })}
          placeholder="Identificador"
        />
        <Input
          id="label"
          label="Nome"
          type="text"
          {...register("label", { required: true })}
          placeholder="Nome"
        />
        <Button type="submit">Confirmar</Button>
      </form>
    </div>
  );
};

export default CreateCategory;

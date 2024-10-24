import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChevronLeftIcon, ReloadIcon } from "@radix-ui/react-icons";
import { loginUser } from "@/lib/firebase/auth/login-user";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid e-mail" }),
  password: z.string().min(8, { message: "Minimum 8 characters" }),
});

const AccountLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    const { email, password } = data;
    setLoading(true);
    try {
      await loginUser(email, password);
      navigate("/dashboard");
    } catch (error) {
      throw error;
    }
    form.reset();
    setLoading(false);
  };

  return (
    <div className="container mx-auto flex h-screen items-center justify-center">
      <Card className="relative min-w-[20rem]">
        <Button asChild className="absolute bottom-[calc(100%_+_0.5rem)]">
          <Link to="/">
            <ChevronLeftIcon />
            Voltar
          </Link>
        </Button>
        <CardHeader>
          <CardTitle>Conectar em sua conta</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="usuario@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Mínimo 8 caractéres"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Carregando
                  </>
                ) : (
                  "Confirmar"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountLogin;

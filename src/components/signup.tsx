import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { signUp } from "@/services/signup";
import { toast } from "sonner";

const schema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirm: z.string().min(1, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Password do not match",
    path: ["confirm"],
  });

type FormValues = z.infer<typeof schema>;

export default function SignUp() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const result = await signUp({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      console.log("result", result);
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-3"
      >
        <div>
          <label>Name</label>
          <Input
            {...register("name", {
              required: "Name is required",
            })}
            type="text"
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label>Email</label>
          <Input {...register("email")} type="email" />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label>Password</label>
          <Input {...register("password")} type="password" />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div>
          <label>Confirm password</label>
          <Input {...register("confirm")} type="password" />
          {errors.confirm && (
            <p className="text-sm text-red-500">{errors.confirm.message}</p>
          )}
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

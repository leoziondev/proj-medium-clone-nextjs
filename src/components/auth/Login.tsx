'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { TabsContent } from "../ui/tabs";
import FormErrorMessage from '../common/FormErrorMessage';

const signInForm = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

type signInForm = z.infer<typeof signInForm>

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<signInForm>({
        resolver: zodResolver(signInForm)
    })

    const handleSignin = async (data: signInForm) => {

        await new Promise((resolve) => setTimeout(resolve, 2000))

        console.log(data);
        
    }
  return (
    <TabsContent value="login">
        <Card className="border-none shadow-none">
            <CardHeader className="px-0">
                <CardTitle>Login</CardTitle>
                <CardDescription>
                    Welcome back to Medium
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(handleSignin)}>
                <CardContent className="space-y-2 px-0">
                    <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            {...register('email')}
                        />
                        {errors?.email && <FormErrorMessage message={errors?.email.message} />}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            {...register('password')}
                        />
                        {errors?.password && <FormErrorMessage message={errors?.password.message} />}
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end mt-4">
                    <Button disabled={isSubmitting} type="submit">Submit</Button>
                </CardFooter>
            </form>
        </Card>
    </TabsContent>
  )
}

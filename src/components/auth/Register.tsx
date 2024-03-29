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
import axios from 'axios';
import { REGISTER_URL } from '@/lib/ApiEndpoints';
import { Loader2 } from 'lucide-react';
import { toast } from "sonner"

const signUpForm = z.object({
    name: z.string().min(6),
    email: z.string().email(),
    password: z.string().min(6),
    password_confirmation: z.string(),
}).refine((data) => {
    return data.password === data.password_confirmation
}, {
    message: "Passwords do not match",
    path: ["password"]
})

type signUpForm = z.infer<typeof signUpForm>

export default function Register() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<signUpForm>({
        resolver: zodResolver(signUpForm)
    })

    const handleSignup = async (data: signUpForm) => {

        await axios.post(REGISTER_URL, data, {
            headers: {
                Accept: 'application/json'
            }
        })
        .then((res) => {
            const response = res.data

            if (response?.status === 200) {
                toast.success("Account created successfully!")
            }
        })
        .catch((err) => {
            if (err?.response?.data?.errors?.email) {
                setError('email', { type: 'custom', message: err?.response?.data?.errors?.email[0] });
            }
        })
        
    }

  return (
    <TabsContent value="register">
        <Card className="border-none shadow-none">
            <CardHeader className="px-0">
                <CardTitle>Register</CardTitle>
                <CardDescription>
                    Tank you for your registration
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(handleSignup)}>
                <CardContent className="space-y-2 px-0">
                    <div className="space-y-1">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            {...register('name')}
                            placeholder="Enter your name"
                        />
                        {errors?.name && <FormErrorMessage message={errors?.name.message} />}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            {...register('email')}
                            placeholder="Enter yout email"
                        />
                        {errors?.email && <FormErrorMessage message={errors?.email.message} />}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            {...register('password')}
                        />
                        {errors?.password && <FormErrorMessage message={errors?.password.message} />}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="password_confirmation">Confirm Password</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            {...register('password_confirmation')}
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end mt-4">
                    <Button disabled={isSubmitting} type="submit">
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Create Account
                    </Button>
                </CardFooter>
            </form>
        </Card>
    </TabsContent>
  )
}

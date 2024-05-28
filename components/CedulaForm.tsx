"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

const formSchema = z.object({
    cedula: z.string().min(10, {
        message: "Cedula necesita al menos 10 caracteres",
    }),
})

type ContribuyenteResponseValue = {
    value: boolean;
}

type LicenciaResponseValue = {
    value: number;
}

export function CedulaForm() {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cedula: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        let contribuyenteData, licenciaData;

        try {
            const response = await fetch(`http://localhost:8081/contribuyente?cedula=${values.cedula}001`);
            contribuyenteData = await response.json() as ContribuyenteResponseValue;
        } catch (e) {
            console.error(e);
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/licencia?cedula=${values.cedula}`);
            licenciaData = await response.json() as LicenciaResponseValue;
        } catch (e) {
            console.error(e);
            router.push(`/results?contribuyente=${contribuyenteData.value}`);
            return;
        }

        router.push(`/results?contribuyente=${contribuyenteData.value}&puntos=${licenciaData.value}`);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="cedula"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Cedula</FormLabel>
                            <FormControl>
                                <Input placeholder="1701010101" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button type="submit">Consultar</Button>
            </form>
        </Form>
    )
}

import AuthLayout from '@/Layouts/AuthLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import ButtonColores from '@/Components/ButtonColores';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <AuthLayout>
            <Head title="Forgot Password" />

            <div className="mb-4 text-sm text-white">
            ¿Olvidaste tu contraseña? Ningún problema. Simplemente háganos saber su dirección de correo electrónico y
            le enviaremos una contraseña por correo electrónico.
            </div>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="flex items-center justify-end mt-4">
                    <ButtonColores color="green" disabled={processing}>
                        Enviar página de reseteo de contraseña
                    </ButtonColores>
                </div>
            </form>
        </AuthLayout>
    );
}

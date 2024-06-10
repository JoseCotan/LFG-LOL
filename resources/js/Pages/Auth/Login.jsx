import React, { useEffect, useState } from 'react';
import Checkbox from '@/Components/Checkbox';
import AuthLayout from '@/Layouts/AuthLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import BotonLogueoGoogle from '@/Components/BotonLogueoGoogle';
import 'tailwindcss/tailwind.css';
import ButtonColores from '@/Components/ButtonColores';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <AuthLayout>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" className='text-white' value="Correo electrónico" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" className='text-white' value="Contraseña" />

                    <div className="relative">
                        <TextInput
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full pr-10"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />

                        <ButtonColores
                            type='button'
                            className="absolute inset-y-0 right-0 pr-3"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <img
                                    src='/images/eye-regular.svg'
                                    alt="Icono de ojo abierto"
                                    className="h-5 w-6"
                                />
                            ) : (
                                <img
                                    src='/images/eye-slash-regular.svg'
                                    alt="Icono de ojo cerrado"
                                    className="h-5 w-6"
                                />
                            )}
                        </ButtonColores>
                    </div>

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4 flex justify-between items-center">
                    <label className="flex items-center">
                    </label>
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline text-sm text-white hover:text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            ¿Olvidaste la contraseña?
                        </Link>
                    )}
                </div>

                <div className="flex justify-end mt-4">
                    <PrimaryButton className="w-full ml-auto" disabled={processing}>
                        Iniciar sesión
                    </PrimaryButton>
                </div>
            </form>

            <div className="flex justify-center mt-6 mb-6">
                <p className="text-white">Iniciar sesión con Google</p>
            </div>

            {/* Botón de inicio de sesión con Google */}
            <BotonLogueoGoogle />
        </AuthLayout>
    );
}

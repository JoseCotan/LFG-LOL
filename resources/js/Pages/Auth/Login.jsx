import React, { useEffect, useState } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import BotonLogueoGoogle from '@/Components/BotonLogueoGoogle';
import 'tailwindcss/tailwind.css';

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
        <GuestLayout>
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

                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <img
                                    src="/storage/imagenes/eye-regular.png"
                                    alt="Icono de ojo abierto"
                                    className="h-5 w-6"
                                />
                            ) : (
                                <img
                                    src="/storage/imagenes/eye-slash-regular.png"
                                    alt="Icono de ojo cerrado"
                                    className="h-5 w-6"
                                />
                            )}
                        </button>
                    </div>

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4 flex justify-between items-center">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ms-2 text-sm text-white">Recuérdame</span>
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
        </GuestLayout>
    );
}

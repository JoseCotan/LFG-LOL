import { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword] = useState(false); // Estado para controlar si se muestra la contraseña
    const [showConfirmationPassword, setShowConfirmationPassword] = useState(false); // Estado para controlar si se muestra la confirmación de la contraseña

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Nombre de usuario" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Correo electrónico" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Contraseña" />

                    <div className="relative">
                        <TextInput
                            id="password"
                            type={showPassword ? 'text' : 'password'} // Cambia el tipo del input según el estado
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full pr-10"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />

                        { /* Añadido botón para mostrar/ocultar la contraseña */}
                        <button
                            type="button"
                            /* Añadido botón para mostrar/ocultar la contraseña */
                            className="absolute inset-y-0 right-0 pr-3" // Coloca correctamente el icono a la derecha del input, dejando un pequeño margen
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <img
                                    src="/storage/imagenes/eye-solid.svg"
                                    alt="Icono de ojo abierto"
                                    className="h-6 w-6"
                                />
                            ) : (
                                <img
                                    src="/storage/imagenes/eye-slash-solid.svg"
                                    alt="Icono de ojo cerrado"
                                    className="h-6 w-6"
                                />
                            )}
                        </button>
                    </div>

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirmar contraseña" />

                    <div className="relative">
                        <TextInput
                            id="password_confirmation"
                            type={showConfirmationPassword ? 'text' : 'password'} // Cambia el tipo del input según el estado
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full pr-10"
                            autoComplete="new-password"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                        />

                        { /* Añadido botón para mostrar/ocultar la confirmación de la contraseña */}
                        <button
                            type="button"
                            /* Añadido botón para mostrar/ocultar la confirmación de la contraseña */
                            className="absolute inset-y-0 right-0 pr-3" // Coloca correctamente el icono a la derecha del input, dejando un pequeño margen
                            onClick={() => setShowConfirmationPassword(!showConfirmationPassword)}
                        >
                            {showConfirmationPassword ? (
                                <img
                                    src="/storage/imagenes/eye-solid.svg"
                                    alt="Icono de ojo abierto"
                                    className="h-6 w-6"
                                />
                            ) : (
                                <img
                                    src="/storage/imagenes/eye-slash-solid.svg"
                                    alt="Icono de ojo cerrado"
                                    className="h-6 w-6"
                                />
                            )}
                        </button>
                    </div>

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center justify-between mt-4 flex-col md:flex-row">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        ¿Actualmente registrado?
                    </Link>

                    <PrimaryButton className="w-full md:w-auto mt-4 md:mt-0" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}

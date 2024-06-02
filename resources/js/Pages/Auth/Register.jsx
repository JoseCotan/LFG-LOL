import { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import BotonLogueoGoogle from '@/Components/BotonLogueoGoogle';
import 'tailwindcss/tailwind.css';

export default function Register() {
    const { data, setData, post, processing, errors, reset, setError } = useForm({
        name: '',
        email: '',
        password: '',
        nac: '',
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
            <Head title='Register' />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor='name' className='text-white' value='Nombre de usuario' />

                    <TextInput
                        id='name'
                        name='name'
                        value={data.name}
                        className='mt-1 block w-full'
                        autoComplete='name'
                        isFocused={true}
                        pattern='[A-Za-z0-9]+'
                        title='El nombre de usuario solo puede contener letras y números'
                        onBlur={(e) => {
                            const input = e.target;
                            // Verifica si el valor contiene espacios
                            const tieneEspacios = /\s/.test(input.value);
                            // Verifica si el valor contiene caracteres no permitidos
                            const tieneCaracteresNoPermitidos = !/^[A-Za-z0-9]+$/.test(input.value);
                            if (tieneEspacios) {
                                setError('name', 'El nombre de usuario no puede contener espacios');
                            } else if (tieneCaracteresNoPermitidos) {
                                setError('name', 'El nombre de usuario solo puede contener letras y números');
                            } else {
                                setError('name', '');
                            }
                        }}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />


                    <InputError message={errors.name} className='mt-2' />
                </div>

                <div className='mt-4'>
                    <InputLabel htmlFor='email' className='text-white' value='Correo electrónico' />

                    <TextInput
                        id='email'
                        type='email'
                        name='email'
                        value={data.email}
                        className='mt-1 block w-full'
                        autoComplete='username'
                        onBlur={(e) => {
                            const input = e.target;
                            const isValid = /^[a-zA-Z_.0-9]{3,30}@[a-z]{3,30}\.[a-z]{2,6}$/.test(input.value); // Verifica si el valor del input cumple con la expresión regular
                            if (!isValid) {
                                setError('email', 'Por favor ingresa un correo electrónico válido');
                            } else {
                                setError('email', '');
                            }
                        }}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className='mt-2' />
                </div>

                <div className='mt-4'>
                    <InputLabel htmlFor='nac' className='text-white' value='Fecha de nacimiento' />
                    <TextInput
                        id="nac"
                        name="nac"
                        value={data.nac}
                        className="mt-1 block w-full"
                        autoComplete="nac"
                        onBlur={(e) => {
                            const input = e.target;
                            const dateValue = new Date(input.value); // Convertimos el valor del input a un objeto Date
                            const currentDate = new Date(); // Obtenemos la fecha actual

                            // Verificamos si el valor del input es una fecha válida y está dentro del rango deseado
                            if (isNaN(dateValue.getTime()) || dateValue.getFullYear() < 1900 || dateValue >= currentDate) {
                                setError('nac', 'Por favor ingresa una fecha de nacimiento válida anterior a la fecha actual');
                            } else {
                                setError('nac', '');
                            }
                        }}
                        onChange={(e) => setData('nac', e.target.value)}
                        placeholder="dd/mm/yyyy"
                        type="date"
                        required
                    />

                    <InputError message={errors.nac} className='mt-2' />
                </div>

                <div className='mt-4'>
                    <InputLabel htmlFor='password' className='text-white' value='Contraseña' />

                    <div className='relative'>
                        <TextInput
                            id='password'
                            type={showPassword ? 'text' : 'password'}
                            name='password'
                            value={data.password}
                            className='mt-1 block w-full pr-10'
                            autoComplete='new-password'
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />

                        { /* Añadido botón para mostrar/ocultar la contraseña */}
                        <button
                            type='button'
                            /* Añadido botón para mostrar/ocultar la contraseña */
                            className='absolute inset-y-0 right-0 pr-3'
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <img
                                    src='/storage/imagenes/eye-regular.png'
                                    alt='Icono de ojo abierto'
                                    className='h-5 w-6'
                                />
                            ) : (
                                <img
                                    src='/storage/imagenes/eye-slash-regular.png'
                                    alt='Icono de ojo cerrado'
                                    className='h-5 w-6'
                                />
                            )}
                        </button>
                    </div>

                    <InputError message={errors.password} className='mt-2' />
                </div>

                <div className='mt-4'>
                    <InputLabel htmlFor='password_confirmation' className='text-white' value='Confirmar contraseña' />

                    <div className='relative'>
                        <TextInput
                            id='password_confirmation'
                            type={showConfirmationPassword ? 'text' : 'password'} // Cambia el tipo del input según el estado
                            name='password_confirmation'
                            value={data.password_confirmation}
                            className='mt-1 block w-full pr-10'
                            autoComplete='new-password'
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                        />

                        { /* Añadido botón para mostrar/ocultar la confirmación de la contraseña */}
                        <button
                            type='button'
                            /* Añadido botón para mostrar/ocultar la confirmación de la contraseña */
                            className='absolute inset-y-0 right-0 pr-3' // Coloca correctamente el icono a la derecha del input, dejando un pequeño margen
                            onClick={() => setShowConfirmationPassword(!showConfirmationPassword)}
                        >
                            {showConfirmationPassword ? (
                                <img
                                    src='/storage/imagenes/eye-regular.png'
                                    alt='Icono de ojo abierto'
                                    className='h-5 w-6'
                                />
                            ) : (
                                <img
                                    src='/storage/imagenes/eye-slash-regular.png'
                                    alt='Icono de ojo cerrado'
                                    className='h-5 w-6'
                                />
                            )}
                        </button>
                    </div>

                    <InputError message={errors.password_confirmation} className='mt-2' />
                </div>

                <div className='flex items-center justify-between mt-4 flex-col md:flex-row'>
                    <PrimaryButton className='w-full ml-auto' disabled={processing}>
                        REGISTRARSE
                    </PrimaryButton>
                </div>
            </form>

            <div className='flex justify-center mt-6 mb-6'>
                <p className='text-white'>Registrarse con Google</p>
            </div>

            {/* Botón de inicio de sesión con Google */}
            <BotonLogueoGoogle />
        </GuestLayout>
    );
}

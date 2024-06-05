import { useEffect, useState } from 'react';
import AuthLayout from '@/Layouts/AuthLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import BotonLogueoGoogle from '@/Components/BotonLogueoGoogle';
import 'tailwindcss/tailwind.css';

export default function Register() {
    const { data, setData, post, processing, errors, reset, setError, clearErrors } = useForm({
        name: '',
        email: '',
        password: '',
        nac: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword] = useState(false); // Estado para controlar si se muestra la contraseña
    const [showConfirmationPassword, setShowConfirmationPassword] = useState(false); // Estado para controlar si se muestra la confirmación de la contraseña

    useEffect(() => {
        // Restablece los campos de contraseña
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const validateName = () => {
        const namePattern = /^[A-Za-z0-9]+$/;
        // Valida si el campo de nombre está vacío
        if (!data.name) {
            setError('name', 'El nombre de usuario es obligatorio.');
        } else if (data.name.length > 16) { // Valida la longitud del nombre de usuario
            setError('name', 'El nombre de usuario no puede exceder los 16 caracteres.');
        } else if (!namePattern.test(data.name)) { // Valida el formato del nombre de usuario
            setError('name', 'El nombre de usuario solo puede contener letras y números.');
        } else {
            clearErrors('name');
        }
    };

    const validateEmail = () => {
        const emailPattern = /^[a-zA-Z_.0-9]{3,30}@[a-z]{3,30}\.[a-z]{2,6}$/;
        // Valida si el campo de correo electrónico está vacío
        if (!data.email) {
            setError('email', 'El correo electrónico es obligatorio.');
        } else if (!emailPattern.test(data.email)) { // Valida el formato del correo electrónico
            setError('email', 'Por favor ingresa un correo electrónico válido.');
        } else {
            clearErrors('email');
        }
    };

    const validateNac = () => {
        const dateValue = new Date(data.nac);
        const currentDate = new Date();
        // Valida si el campo de fecha de nacimiento está vacío
        if (!data.nac) {
            setError('nac', 'La fecha de nacimiento es obligatoria.');
        } else if (isNaN(dateValue.getTime()) || dateValue.getFullYear() < 1900 || dateValue >= currentDate) {
            // Valida si la fecha de nacimiento es válida y anterior a la fecha actual
            setError('nac', 'Por favor ingresa una fecha de nacimiento válida anterior a la fecha actual.');
        } else {
            clearErrors('nac'); // Elimina cualquier error previo del campo de fecha de nacimiento
        }
    };

    const validatePasswords = () => {
        // Valida si la contraseña tiene al menos 8 caracteres
        if (data.password.length < 8) {
            setError('password', 'La contraseña debe tener al menos 8 caracteres.');
        } else {
            clearErrors('password');
        }

        // Valida si la confirmación de la contraseña tiene al menos 8 caracteres
        if (data.password_confirmation.length < 8) {
            setError('password_confirmation', 'La confirmación de la contraseña debe tener al menos 8 caracteres.');
        } else if (data.password !== data.password_confirmation) { // Valida si las contraseñas coinciden
            setError('password_confirmation', 'Las contraseñas no coinciden.');
        } else {
            clearErrors('password_confirmation');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        validateName();
        validateEmail();
        validateNac();
        validatePasswords();

        // Verifica que no haya errores en los campos antes de enviar el formulario
        if (!errors.name && !errors.email && !errors.nac && !errors.password && !errors.password_confirmation) {
            // Envía el formulario si no hay errores y restablece los campos
            post(route('register'), {
                onSuccess: () => reset()
            });
        }
    };


    return (
        <AuthLayout>
            <Head title='Register' />

            <form onSubmit={handleSubmit}>
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
                        maxLength={16}
                        onBlur={validateName}
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
                        onBlur={validateEmail}
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
                        onBlur={validateNac}
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

                        <button
                            type='button'
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
                            type={showConfirmationPassword ? 'text' : 'password'}
                            name='password_confirmation'
                            value={data.password_confirmation}
                            className='mt-1 block w-full pr-10'
                            autoComplete='new-password'
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                        />

                        <button
                            type='button'
                            className='absolute inset-y-0 right-0 pr-3'
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

            <BotonLogueoGoogle />
        </AuthLayout>
    );
}

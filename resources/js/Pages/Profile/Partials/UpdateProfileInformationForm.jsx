import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import ButtonColores from '@/Components/ButtonColores';
import { useEffect } from 'react';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, setError, clearErrors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    });

    const validateName = () => {
        const namePattern = /^[A-Za-z0-9]+$/;
        // Valida si el campo de nombre está vacío
        if (!data.name) {
            setError('name', 'El nombre de usuario es obligatorio.');
        } else if (data.name.length > 20) { // Valida la longitud del nombre de usuario
            setError('name', 'El nombre de usuario no puede exceder los 20 caracteres.');
        } else if (!namePattern.test(data.name)) { // Valida el formato del nombre de usuario
            setError('name', 'El nombre de usuario solo puede contener letras y números.');
        } else {
            clearErrors('name');
        }
    };

    useEffect(() => {
        validateName();
    }, [data.name]);

    const submit = (e) => {
        e.preventDefault();
        validateName();
        if (!errors.name) {
            patch(route('profile.update'));
        }
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-white">Información del perfil</h2>

                <p className="mt-1 text-sm text-white">
                    Actualice la información del perfil y la dirección de correo electrónico de su cuenta.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6 text-white">
                <div>
                    <InputLabel htmlFor="name" value="Nombre" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Correo electrónico" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full bg-gray-100 border-0"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                        readOnly
                        style={{ color: 'gray' }}
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900
                                rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <ButtonColores color="green" disabled={processing}>Guardar</ButtonColores>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}

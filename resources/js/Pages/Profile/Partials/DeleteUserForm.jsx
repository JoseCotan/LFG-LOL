import { useRef, useState } from 'react';
import { usePage, useForm } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import ButtonColores from '@/Components/ButtonColores';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();
    const { auth } = usePage().props;

    const { data, setData, delete: destroy, processing, reset, errors } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        if (auth.user.google_id) {
            Inertia.delete(route('usuarios.destroy', auth.user.id), {
                onSuccess: () => closeModal(),
            });
        } else {
            destroy(route('profile.destroy'), {
                preserveScroll: true,
                onSuccess: () => closeModal(),
                onError: () => passwordInput.current.focus(),
                onFinish: () => reset(),
            });
        }
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-white">Eliminar cuenta</h2>
                <p className="mt-1 text-sm text-white">
                    Una vez que se elimine su cuenta, todos sus recursos y datos se eliminarán permanentemente.
                    Antes de eliminar su cuenta, descargue cualquier dato o información que desee conservar.
                </p>
            </header>
            <DangerButton onClick={confirmUserDeletion}>Eliminar cuenta</DangerButton>
            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        ¿Estás seguro de que quieres eliminar tu cuenta?
                    </h2>
                    {!auth.user.google_id && (
                        <p className="mt-1 text-sm text-gray-600">
                            Por favor, ingrese su contraseña para confirmar
                            que desea eliminar permanentemente su cuenta.
                        </p>
                    )}
                    {!auth.user.google_id && (
                        <div className="mt-6">
                            <InputLabel htmlFor="password" value="Password" className="sr-only" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="mt-1 block w-3/4"
                                isFocused
                                placeholder="Contraseña"
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>
                    )}
                    <div className="mt-6 flex justify-end">
                        <ButtonColores type="submit" color="red" disabled={processing}>Eliminar cuenta</ButtonColores>
                    </div>
                </form>
                <div className="mb-6 mr-6 flex justify-end">
                    <ButtonColores color="blue" onClick={closeModal}>Cancelar</ButtonColores>
                </div>
            </Modal>
        </section>
    );
}

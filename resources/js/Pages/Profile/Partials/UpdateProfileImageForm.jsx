import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import ImagenResponsive from '@/Components/ImagenResponsive';

export default function UpdateProfilePhotoForm() {
    const { user } = usePage().props.auth;

    const { data, setData, post, processing, errors } = useForm({
        foto_perfil: null,
    });

    const handleFileChange = (event) => {
        setData('foto_perfil', event.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('profile.photo'));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="flex-grow flex flex-col">
                    <input
                        type="file"
                        id="foto_perfil"
                        onChange={handleFileChange}
                        className="block w-full cursor-pointer"
                        disabled={processing}
                    />
                    <InputError message={errors.foto_perfil} />
                    <div className="flex mt-6 gap-4">
                        <PrimaryButton disabled={processing || !data.foto_perfil}>
                            Guardar foto
                        </PrimaryButton>
                    </div>
                </div>
                <ImagenResponsive
                    srcPC={user.foto_perfil_PC || '/images/user-regular.svg'}
                    srcTablet={user.foto_perfil_Tablet || '/images/user-regular.svg'}
                    srcMobile={user.foto_perfil_Movil || '/images/user-regular.svg'}
                    alt="Foto de perfil"
                    className="ml-6 h-16 w-16"
                />
            </div>
        </form>
    );
}

import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import ImagenResponsive from '@/Components/ImagenResponsive';
import ButtonColores from '@/Components/ButtonColores';

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
        <form onSubmit={handleSubmit} className="space-y-6 text-white">
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
                        <ButtonColores color="green" disabled={processing || !data.foto_perfil}>
                            Guardar foto
                        </ButtonColores>
                    </div>
                </div>
                <ImagenResponsive
                    srcPC={user.foto_perfil_Tablet}
                    srcTablet={user.foto_perfil_Tablet}
                    srcMobile={user.foto_perfil_Movil}
                    alt="Foto de perfil"
                    className="h-10 w-10"
                />
            </div>
        </form>
    );
}

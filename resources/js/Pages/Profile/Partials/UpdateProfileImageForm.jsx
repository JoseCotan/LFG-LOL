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
                    <label htmlFor="foto_perfil" className="block w-full mb-4 cursor-pointer relative">
                        <label className="inline-block">
                            <input
                                type="file"
                                id="foto_perfil"
                                onChange={handleFileChange}
                                className="hidden"
                                disabled={processing}
                            />
                            <ButtonColores onClick={() => document.getElementById('foto_perfil').click()}>
                                <img src="/images/upload-solid-white.svg" alt="Subir imagen"
                                className="h-6 w-6 mr-2" />
                                <span>Seleccionar foto</span>
                            </ButtonColores>
                        </label>
                    </label>
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
                    className="h-24 w-24"
                />
            </div>
        </form>
    );
}

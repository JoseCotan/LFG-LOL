import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import ImagenResponsive from '@/Components/ImagenResponsive';

export default function UpdateProfilePhotoForm() {
    const { auth } = usePage().props;
    const { user } = auth;

    const { data, setData, post, processing, errors } = useForm({
        foto_perfil: null,
    });

    const onHandleChange = (event) => {
        setData('foto_perfil', event.target.files[0]);
    };

    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('foto_perfil', data.foto_perfil);

        post(route('profile.photo.update'), formData, {
            forceFormData: true,
        });
    };

    return (
        <form onSubmit={submit} className="space-y-6">
    <div className="flex justify-between items-center">
        <div className="flex-grow flex flex-col">
            <input
                type="file"
                id="foto_perfil"
                onChange={onHandleChange}
                className="block w-full cursor-pointer"
                disabled={processing}
            />
            <InputError message={errors.foto_perfil} />
            <div className="flex mt-6 gap-4">
                <PrimaryButton disabled={processing}>
                    Save
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

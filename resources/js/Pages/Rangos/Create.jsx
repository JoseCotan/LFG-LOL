import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import ButtonColores from '@/Components/ButtonColores';



const RangosCreate = () => {
    const { auth } = usePage().props;
    const [nombre, setNombre] = useState('');
    const [imagen, setImagen] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nombre', nombre);
        if (imagen) {
            formData.append('imagen', imagen);
        }

        Inertia.post(route('rangos.store'), formData, {
            onSuccess: () => {
                setNombre('');
                setImagen(null);
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <div className="max-w-4xl mx-auto p-8">
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <InputLabel value="Nombre del rango" />
                        <TextInput type="text" id="nombre"
                            value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    </div>
                    <div className="mb-6">
                        <InputLabel value="Imagen del rango" />
                        <TextInput type="file" id="imagen" required onChange={(e) => setImagen(e.target.files[0])} />
                    </div>
                    <ButtonColores color="green" type="submit">
                        Crear Rango
                    </ButtonColores>
                    <ButtonColores color="red">
                        <Link href={route('rangos.index')}>
                            Cancelar
                        </Link>
                    </ButtonColores>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default RangosCreate;

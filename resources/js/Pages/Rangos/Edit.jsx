import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage, Link } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import TextInput from '@/Components/TextInput';


const RangosEdit = () => {
    const { rango, auth } = usePage().props;
    const [nombre, setNombre] = useState(rango.nombre);
    const [imagen, setImagen] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nombre', nombre);
        if (imagen) {
            formData.append('imagen_nueva', imagen, imagen.name);
        }
        formData.append('_method', 'PUT');

        Inertia.post(route('rangos.update', rango.id), formData);
    };


    return (
        <AuthenticatedLayout
            user={auth.user}
        >
        <div className="max-w-4xl mx-auto p-8">
            <form onSubmit={handleSubmit}>
                <InputLabel value="Nombre del Rango" />
                <TextInput id="nombre" value={nombre} onChange={e => setNombre(e.target.value)} required />

                <InputLabel value="Cambiar Imagen" />
                <TextInput type="file" id="imagen_nueva" onChange={e => setImagen(e.target.files[0])} /><br></br>

                <Button type="submit">Actualizar Rango</Button>
                <Link href={route('rangos.index')} className="text-white bg-gray-500 hover:bg-gray-600 ml-4 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Cancelar</Link>
            </form>
        </div>
        </AuthenticatedLayout>
    );
};

export default RangosEdit;

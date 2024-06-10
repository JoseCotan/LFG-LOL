import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage, Link } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import TextInput from '@/Components/TextInput';
import ButtonColores from '@/Components/ButtonColores';


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

                    <ButtonColores color="green" type="submit">
                        Actualizar Rango
                    </ButtonColores>
                    <ButtonColores color="red">
                        <Link href={route('rangos.index')}>Cancelar</Link>
                    </ButtonColores>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default RangosEdit;

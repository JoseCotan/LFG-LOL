import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';


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
                    <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nombre del Rango</label>
                    <input type="text" id="nombre" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </div>
                <div className="mb-6">
                    <label htmlFor="imagen" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Imagen del Rango</label>
                    <input type="file" id="imagen" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={(e) => setImagen(e.target.files[0])} />
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Crear Rango</button>
                <Link href={route('rangos.index')} className="text-white bg-gray-500 hover:bg-gray-600 ml-4 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Cancelar</Link>
            </form>
        </div>
        </AuthenticatedLayout>
    );
};

export default RangosCreate;

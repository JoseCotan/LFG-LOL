import React, { useState, useEffect } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AdminIndex from './Index';
import ButtonColores from '@/Components/ButtonColores';
import Paginacion from '@/Components/Paginacion';
import InputAdmin from '@/Components/InputAdmin';

const Publicaciones = ({ publicaciones, panelAdmin = true }) => {
    const [buscarTitulo, setBuscarTitulo] = useState('');
    const { data, setData, get } = useForm({
        buscarTitulo: ''
    });

    const handleBusqueda = (e) => {
        setBuscarTitulo(e.target.value);
        setData('buscarTitulo', e.target.value);
    };

    const handleDelete = (id, publicacionTitulo) => {
        if (confirm(`¿Estás seguro de que deseas eliminar la publicación "${publicacionTitulo}"? Esta acción no se puede deshacer.`)) {
            Inertia.delete(route('publicaciones.destroy', id), {
                data: { panelAdmin }
            });
        }
    };

    const handleFiltrar = () => {
        get(route('admin.publicaciones.index'), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    useEffect(() => {
        if (data.buscarTitulo !== buscarTitulo) {
            handleFiltrar();
        }
    }, [data.buscarTitulo]);

    return (
        <AdminIndex>
            <h2 className="text-2xl mb-4">Publicaciones</h2>
            <div className="mb-4">
                <InputAdmin
                    value={buscarTitulo}
                    onChange={handleBusqueda}
                    placeholder="Buscar publicaciones"
                />
                <ButtonColores color="green" onClick={handleFiltrar}>
                    Filtrar
                </ButtonColores>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full table-auto divide-y divide-gray-600">
                    <thead className="bg-gray-900 text-white">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-white">TITULO</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-white">USUARIO</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-white">ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-800 text-white divide-y divide-gray-700">
                        {publicaciones.data.map((publicacion) => (
                            <tr key={publicacion.id}>
                                <td className="px-4 py-2 whitespace-wrap max-w-24 break-words">{publicacion.titulo}</td>
                                <td className="px-4 py-2 whitespace-wrap break-words">{publicacion.usuario.name}</td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <div>
                                        <Link href={route('publicaciones.edit', publicacion.id)}>
                                            <ButtonColores color="green">
                                                Editar
                                            </ButtonColores>
                                        </Link>
                                        <ButtonColores color="red" onClick={() => handleDelete(publicacion.id, publicacion.titulo)}>
                                            Eliminar
                                        </ButtonColores>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Paginacion links={publicaciones.links} />
            </div>
        </AdminIndex>
    );
};

export default Publicaciones;

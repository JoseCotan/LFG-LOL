import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AdminIndex from './Index';
import ButtonColores from '@/Components/ButtonColores';
import Paginacion from '@/Components/Paginacion';
import InputAdmin from '@/Components/InputAdmin';

const Usuarios = ({ usuarios, panelAdmin = true }) => {
    const [buscarPalabra, setBusqueda] = useState('');
    const { data, setData, get } = useForm({
        buscarUsuario: ''
    });

    const handleBusqueda = (e) => {
        setBusqueda(e.target.value);
        setData('buscarPalabra', e.target.value);
    };

    const handleDelete = (id, usuarioNombre) => {
        if (confirm(`¿Estás seguro de que deseas eliminar el usuario "${usuarioNombre}"? Esta acción no se puede deshacer.`)) {
            Inertia.delete(route('usuarios.destroy', id), {
                data: { panelAdmin }
            });
        }
    };

    const handleFiltrar = () => {
        get(route('admin.usuarios.index'), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    useEffect(() => {
        if (data.buscarPalabra !== buscarPalabra) {
            handleFiltrar();
        }
    }, [data.buscarPalabra]);

    return (
        <AdminIndex>
            <h2 className="text-2xl mb-4">Usuarios</h2>
            <div className="mb-4">
                <InputAdmin
                    value={buscarPalabra}
                    onChange={handleBusqueda}
                    placeholder="Buscar nombre/correo"
                />
                <ButtonColores color="green" onClick={handleFiltrar}>
                    Filtrar
                </ButtonColores>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full table-auto divide-y divide-gray-600">
                    <thead className="bg-gray-900 text-white">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-white">NOMBRE DEL USUARIO</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-white">CORREO ELECTRONICO</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-white">ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-800 text-white divide-y divide-gray-700">
                        {usuarios.data.map((usuario) => (
                            <tr key={usuario.id}>
                                <td className="px-4 py-2 whitespace-wrap max-w-24 break-words">{usuario.name}</td>
                                <td className="px-4 py-2 whitespace-wrap break-words">{usuario.email}</td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <ButtonColores color="red" onClick={() => handleDelete(usuario.id, usuario.name)}>
                                        Eliminar
                                    </ButtonColores>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Paginacion links={usuarios.links} />
            </div>
        </AdminIndex>
    );
};

export default Usuarios;

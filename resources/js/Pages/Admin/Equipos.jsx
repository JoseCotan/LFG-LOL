import React, { useState, useEffect } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AdminIndex from './Index';
import ButtonColores from '@/Components/ButtonColores';
import Paginacion from '@/Components/Paginacion';
import InputAdmin from '@/Components/InputAdmin';


const Equipos = ({ equipos, panelAdmin = true }) => {
    const [buscarPalabra, setBusqueda] = useState('');
    const { data, setData, get } = useForm({
        buscarEquipo: ''
    });

    const handleBusqueda = (e) => {
        setBusqueda(e.target.value);
        setData('buscarEquipo', e.target.value);
    };

    const handleDelete = (id, equipoNombre) => {
        if (confirm(`¿Estás seguro de que deseas eliminar el equipo "${equipoNombre}"? Esta acción no se puede deshacer.`)) {
            Inertia.delete(route('equipos.destroy', id), {
                data: { panelAdmin }
            });
        }
    };

    const handleFiltrar = () => {
        get(route('admin.equipos.index'), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    useEffect(() => {
        if (data.buscarEquipo !== buscarPalabra) {
            handleFiltrar();
        }
    }, [data.buscarEquipo]);

    return (
        <AdminIndex>
            <h2 className="text-2xl mb-4">Equipos</h2>
            <div className="mb-4">
                <InputAdmin
                    value={buscarPalabra}
                    onChange={handleBusqueda}
                    placeholder="Buscar equipos"
                />
                <ButtonColores color="green" onClick={handleFiltrar}>
                    Filtrar
                </ButtonColores>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full table-auto divide-y divide-gray-600">
                    <thead className="bg-gray-900 text-white">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-white">NOMBRE DEL EQUIPO</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-white">LIDER DEL EQUIPO</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-white">ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-800 text-white divide-y divide-gray-700">
                        {equipos.data.map((equipo) => (
                            <tr key={equipo.id}>
                                <td className="px-4 py-2 whitespace-wrap max-w-24 break-words">{equipo.nombre_equipo}</td>
                                <td className="px-4 py-2 whitespace-wrap break-words">{equipo.lider.name}</td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <div>
                                        <Link href={route('equipos.edit', equipo.id)}>
                                            <ButtonColores color="green">
                                                Editar
                                            </ButtonColores>
                                        </Link>
                                        <ButtonColores color="red" onClick={() => handleDelete(equipo.id, equipo.nombre_equipo)}>
                                            Eliminar
                                        </ButtonColores>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Paginacion links={equipos.links} />
            </div>
        </AdminIndex>
    );
};

export default Equipos;

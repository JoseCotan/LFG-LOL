import React, { useState, useEffect } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AdminIndex from './Index';
import ButtonColores from '@/Components/ButtonColores';
import Paginacion from '@/Components/Paginacion';
import InputAdmin from '@/Components/InputAdmin';

const Eventos = ({ eventos, panelAdmin = true }) => {
    const [buscarPalabra, setBusqueda] = useState('');
    const { data, setData, get } = useForm({
        buscarEvento: ''
    });

    const handleBusqueda = (e) => {
        setBusqueda(e.target.value);
        setData('buscarEvento', e.target.value);
    };

    const handleDelete = (id, eventoTitulo) => {
        if (confirm(`¿Estás seguro de que deseas eliminar el evento "${eventoTitulo}"? Esta acción no se puede deshacer.`)) {
            Inertia.delete(route('eventos.destroy', id), {
                data: { panelAdmin }
            });
        }
    };

    const handleFiltrar = () => {
        get(route('admin.eventos.index'), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    useEffect(() => {
        if (data.buscarEvento !== buscarPalabra) {
            handleFiltrar();
        }
    }, [data.buscarEvento]);

    return (
        <AdminIndex>
            <h2 className="text-2xl mb-4">Eventos</h2>
            <div className="mb-4">
                <InputAdmin
                    value={buscarPalabra}
                    onChange={handleBusqueda}
                    placeholder="Buscar eventos"
                />
                <ButtonColores color="green" onClick={handleFiltrar}>
                    Filtrar
                </ButtonColores>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full table-auto divide-y divide-gray-600">
                    <thead className="bg-gray-900 text-white">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-white">TITULO DEL EVENTO</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-white">CREADOR DEL EVENTO</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-white">ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-800 text-white divide-y divide-gray-700">
                        {eventos.data.map((evento) => (
                            <tr key={evento.id}>
                                <td className="px-4 py-2 whitespace-wrap break-words">{evento.titulo}</td>
                                <td className="px-4 py-2 whitespace-wrap max-w-24 break-words">{evento.creador.name}</td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <div>
                                        <Link href={route('eventos.edit', evento.id)}>
                                            <ButtonColores color="green">
                                                Editar
                                            </ButtonColores>
                                        </Link>
                                        <ButtonColores color="red" onClick={() => handleDelete(evento.id, evento.titulo)}>
                                            Eliminar
                                        </ButtonColores>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Paginacion links={eventos.links} />
            </div>
        </AdminIndex>
    );
};

export default Eventos;

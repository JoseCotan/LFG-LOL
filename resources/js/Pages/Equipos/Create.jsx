import React from 'react';
import { useForm, usePage, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Checkbox from '@/Components/Checkbox';

const EquiposCreate = () => {
    const { auth, modos } = usePage().props;
    const { data, setData, post, processing } = useForm({
        nombre_equipo: '',
        modo_juego_preferente: '',
        privado: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('equipos.store'), {
            data,
            onSuccess: () => {
                setData('nombre_equipo', '');
                setData('modo_juego_preferente', '');
                setData('privado', false);
            }
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="max-w-4xl mx-auto p-8">
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="nombre_equipo" className="block mb-2 text-sm font-medium text-white">Nombre del Equipo</label>
                        <TextInput
                            id="nombre_equipo"
                            type="text"
                            value={data.nombre_equipo}
                            onChange={(e) => setData('nombre_equipo', e.target.value)}
                            required
                            className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="modo_juego_preferente" className="block mb-2 text-sm font-medium text-white">Modo de Juego Preferente</label>
                        <select
                            id="modo_juego_preferente"
                            value={data.modo_juego_preferente}
                            onChange={(e) => setData('modo_juego_preferente', e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        >
                            {modos && modos.map((modo) => (
                                <option key={modo.id} value={modo.id}>{modo.nombre}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="privado" className="flex items-center space-x-2 text-sm font-medium text-white">
                            <Checkbox
                                id="privado"
                                checked={data.privado}
                                onChange={(e) => setData('privado', e.target.checked)}
                            />
                            <span>Equipo Privado</span>
                        </label>
                    </div>
                    <div className="flex items-center justify-between">
                        <PrimaryButton disabled={processing}>Crear Equipo</PrimaryButton>
                        <Link href={route('equipos.index')} className="text-blue-600 hover:text-blue-800">Cancelar</Link>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default EquiposCreate;
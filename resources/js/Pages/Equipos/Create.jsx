import React from 'react';
import { useForm, usePage, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Checkbox from '@/Components/Checkbox';
import InputLabel from '@/Components/InputLabel';
import Select from '@/Components/Select';


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
                    <InputLabel value="Nombre del Equipo" />
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
                    <InputLabel value="Modo de juego preferente" />
                        <Select
                            id="modo_juego_preferente"
                            value={data.modo_juego_preferente}
                            onChange={(e) => setData('modo_juego_preferente', e.target.value)}
                            options={modos.map((modo) => ({ value: modo.id, label: modo.nombre }))}
                        />
                    </div>
                    <div className="mb-6">
                    <InputLabel value="Equipo privado" />
                            <Checkbox
                                id="privado"
                                checked={data.privado}
                                onChange={(e) => setData('privado', e.target.checked)}
                            />
                            <span>Equipo Privado</span>
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
